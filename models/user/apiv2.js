const router = require('express').Router();
const auth= require('../../services/authentication');
const socket= require('../../services/socket');
// const system= require('../../services/system');
const notify= require('../../services/notify');
const User = require('./model')
const Material = require('../material/model')
const Comment = require('../comment/model')
const Booking = require('../booking/model')
const Course = require('../course/model')
const Enrolled = require('../enrolled/model')
const Site_Event = require('../site_event/model')

const request = require('request')
const cron = require('node-cron')
const moment = require ('moment')
const encrypt = require('crypto-js/md5')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const email = require('../../services/email')

// const io = new Server({ /* options */ });

//Registration

    router.post('/reset',async(req,res)=>{
      req=req.body
      let taken = await(exists(req.email));
      if (taken){
        new Site_Event({
          user:taken._id,
          event_type:'pw_reset'
        }).save()
        .then((site_event)=>{
          email.sendDefault('CHATSHACK: Password Reset Code',site_event._id.toString(),taken.email)
          return res.status(200).json({
            message:'Resetting...',
            success: true
          });
        })
        .catch((err)=>{console.log(err)})
      }else
      {return res.status(400).json({
        message:'Email not in use',
        success: false
      });}
    })
    // router.post('/new-v2', async (req, res) => {
    //   console.log('trial converted',req.body)
    //   Comment.insertMany({
    //       student: user,
    //       author: req.teacher,
    //       end:new Date()
    //   }).then(()=>{
    //     return res.status(200).json({
    //       message:'Resetting...',
    //       success: true
    //     });
    //   })
    // });
    //user
    router.post('/new', async (req, res) => {
      req=req.body

      let taken = await(exists(req.email));
      if (taken){
        return res.status(400).json({
          message:'Email already in use',
          success: false
        });
      }

      //encrypt password
      const password = await auth.newPass(req.password)

      try{
        Material.find().select('_id').then((materials)=>{
            // console.log('materials',materials)
            let upload=[]
            materials.forEach((material, i) => {
              upload.push({ref:material})
            });
            new User({
              ...req,
              progress:upload,
              password: password,
              role: 'user'
            }).save()
               .then((user)=>{
                 Comment.insertMany({
                   student: user,
                   author: req.teacher,
                   end:new Date(),
                   trial:true
                 }).then(()=>{
                   Booking.findOneAndUpdate(req.trial._id,{status:'delivered'}).then(()=>{
                     let result = auth.createToken(user)
                     // console.log(result)
                     //--MAILCHIMP
                     let tags =['inactive']
                     tags.push(req.segment)
                     console.log('starting mail service',req.segment,tags)
                     request({
                       url: 'https://us9.api.mailchimp.com/3.0/lists/cb86e9b6f5/members',
                       json: {
                           'email_address': req.email,
                           'user': `anystring: ${process.env.MAILCHIMP_AUTH}`,
                           'status': 'subscribed',
                           'tags':tags,
                           'merge_fields': {
                               'FNAME': req.first,
                               'LNAME': req.last
                           }
                       },
                       method: 'POST',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': `apikey ${process.env.MAILCHIMP_AUTH}`
                       }
                   }, function(error, response, body){
                     console.log('mail service complete')
                         if (error) {
                           console.log('user saved, not loaded to mailchimp: '+req.email)
                           return res.status(500).json({
                             result,
                             message: `user saved but mailchimp failed: ${err}`,
                             success: false
                           });
                           } else {
                             return res.status(201).json({
                                   result,
                                   message: `Success!`,
                                   success: true
                                 });
                           }
                       });
                       // ==mialchimp finished
                   })
                 })
               });
           })
        }catch(err){
             console.log('there was a problem',err)
             return res.status(500).json({
               message: `user creation unsuccessful: ${err}`,
               success: false
             });
           }

 });

    const exists = async(email) => {
      let user = await User.findOne({email});
      return user ? user:false;
    };
//Login

    //user
    router.post('/login', //auth.auth(),auth.permission(),
          async (req, res) => {
            // req=req.body
            let {email, password} = req.body;

            //check if exists
            const user = await User.findOne({email});
            if(!user){
              return res.status(401).json({
                message: 'Password incorrect',
                success: false
              });
            }
            //check if active (for former employees)
            if(user.active==false){
              return res.status(401).json({
                message: 'Account inactive. Please contact administrator.',
                success: false
              });
            }
            //check password
            if(await auth.validatePass(password, user.password)){

              let result = auth.createToken(user)
              return res.status(200).json({
                result,
                message: 'Welcome back',
                success: true
              });

            }else{console.log('password rejected')
              return res.status(403).json({
                message: 'Password incorrect',
                success: false
              });
            }
        })

    router.post('/update', auth.auth, auth.permission(['teacher','manager']), async (req,res)=>{
      console.log('filter recieved',req.body.filter)
      console.log('data recieved',req.body.data)
      // console.log(req)
      await User.findOneAndUpdate(req.body.filter,req.body.data,{new:true})
          .then((result)=>{
            console.log(result.first,result.last,'updated')
            return res.status(201).json({
              data:result,
              message: 'User update',
              success: true
            });
          })
          .catch((err)=>{
            console.log(result.first,result.last,'update failed')
            return res.status(500).json({
              message: `User failed to update: ${err}`,
              success: false
            });
          })
    })
    //Start and End session
    router.get('/startSession', auth.auth,auth.permission(['user','manager']), async (req, res) =>{
      req=req.query
      new Comment({
        student: req.student,
        author:req.teacher,
        status: 'pending',
      }).save()
      .then((comment)=>{
        socket.startSession(comment)
        return res.status(201).json({
          data:comment,
          message: 'User update',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `User failed to update: ${err}`,
          success: false
        });
      })
    })
    router.get('/endSession', auth.auth,auth.permission(['user','manager']), async (req, res) =>{
      req=req.query
      //1. update comment with end time
      await Comment.findOneAndUpdate({student:req.student,end:{'$exists':false}},{end:new Date()},{new:true})
        .then((session)=>{
      //2. find student points remaining
        User.findById(req.student)
              .then((result)=>{
          //2a. calculate owed time
                let start =moment(session.createdAt)
                let end = moment(session.end)
                console.log('time',start,end)
                const time = end.diff(start, 'minutes')
                let billable = time-10
                if(billable<=0){billable=30}
                billable = (Math.ceil(billable/30))//+1
                let unpaid=0
                let temp = result.points.sort((a,b)=>{a.createdAt-b.createdAt})
          //2b. remove owed time or increment unpaid time
                for(let i =0;i<billable;i++){
                  // console.log('length',result.points,temp)
                  if(temp.length>=1){
                    temp.splice(0,1)
                  }
                  else{unpaid++}
                }
      //3. update with new points and notify any unpaid amount
                User.findByIdAndUpdate(req.student,{'$set':{points:temp}},{new:true})
                  .then((user)=>{
                    socket.endSession(session)
                    return res.status(201).json({
                      display:{unpaid:unpaid,billable:billable,remaining:user.hasOwnProperty('points')?user.points.length:0},
                      message: 'User update',
                      success: true
                    });
                  })
              })
            //ERROR 1: cannot find user
              .catch((err)=>{
                return res.status(500).json({
                  message: `Could not find user: ${err}`,
                  success: false
                });
              })
        })
        //ERROR 2: no unended session
          .catch((err)=>{
            return res.status(500).json({
              message: `No open sessions: ${err}`,
              success: false
            });
          })
    })


    //Get
    router.get('/all', auth.auth, async (req, res) => {
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields)
      // console.log('data retrieved:',data)
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });
    //Get
    router.get('/progress', auth.auth, async (req, res) => {
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields).populate('progress.ref').populate('goals._id')
      // console.log('data retrieved:',data)
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });
    router.post('/goals', auth.auth, async (req, res) => {
      //get number of goals
      // if(req.body.goals.length<=3){
        User.findByIdAndUpdate(req.body.filter,req.body.data,{new:true,populate:{path:'goals'}})
              .then((result)=>{
                console.log(result.goals)
                return res.status(201).json({
                  data:result,
                  message: 'User update',
                  success: true
                });
              })
              .catch((err)=>{
                console.log(err)
                return res.status(500).json({
                  message: `Could not find user: ${err}`,
                  success: false
                });
              })
      // }
      // else{
      //   return res.status(500).json({
      //     message: `Max goals reached`,
      //     success: false
      //   });
      // }
    // })
    //   }
      //else save
      // User.findByIdAndUpdate(req.filter,{'$set':{goal:true}},{new:true})
      //       .then((result)=>{
      //         return res.status(201).json({
      //           data:result,
      //           message: 'User update',
      //           success: true
      //         });
      //       })
      //       .catch((err)=>{
      //         return res.status(500).json({
      //           message: `Could not find user: ${err}`,
      //           success: false
      //         });
      //       })
    });

    //Get
    router.get('/update_goals', auth.auth, async (req, res) => {
      let data = await User.findOneAndUpdate(JSON.parse(req.query.filter),JSON.parse(req.query.data),JSON.parse(req.query.find))
      // console.log('data retrieved:',data)
      data.progress.forEach((item, i) => {
        // console.log('check',item.success/item.fail,item.success+item.fail,item.success/(item.success+item.fail),(item.success/(item.success+item.fail))>=0.9)
        if((item.success/(item.success+item.fail))>=0.9){
          console.log('found',item)
          User.findOneAndUpdate(JSON.parse(req.query.filter),{'$set':{'progress.$[el].complete':true}},JSON.parse(req.query.find))
          .then((updated)=>{
            console.log('complete!',updated)
          })
        }
      });
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });
    //Get
    router.get('/session', auth.auth, async (req, res) => {
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields).populate({path:'students',model:'User',populate:{path:'goals.ref',model:'Material'}})
      // console.log('data retrieved:',data)
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });

    router.get('/dash',auth.auth,auth.permission(['user','teacher','manager']),async (req,res)=>{
      // console.log(req)
      return res.status(200).json({
        message: 'Welcome back',
        success: true
      });
    })
    //DB management cron
// cron.schedule('*/5 * * * *',()=>{
//   // Course.find().then((courses)=>{
//   //   courses.forEach((course,i)=>{
//   //     let item = {
//   //       student:'6346840b683a491148a921d8',
//   //       course:course._id,
//   //       delivery:'online private',
//   //       status:'active'
//   //   }
//   //     new Enrolled(item).save()
//   //     .then(()=>{
//   //       console.log('created enroll',item)
//   //     })
//   //   })
//   // })
//   Comment.updateMany({},{status:'approved',end:new Date()}).then((console.log('comments approved')))
//   // Comment.updateMany({'$ne':{'$exists':{}}},{status:'approved'}).then((console.log('comments approved')))
// })
    //rewards status
    cron.schedule('1 1 1 * *',()=>{
      let gold = 0
      let platinum = 0
      let diamond = 0
      User.find().then((users)=>{
        users.forEach((user, i) => {
          if(user.role=='user'){
            let sessions = user.statistics
            let month = new Date().getMonth()-1
            let count = 0
            sessions.forEach((session, i) => {
              // console.log(moment(session.start).month(),month,moment(session.start).month()==month)
              if(moment(session.start).month()==month){count++}
            });
            let reward = ''
            if(count>=4 && count<8){reward='gold';gold++}
            if(count>=8 && count<12){reward='platinum';platinum++}
            if(count>=12){reward='diamond';diamond++}
            console.log(user.first,user.last,count,reward)
            if(reward){
              User.findOneAndUpdate({_id:user._id},{reward:reward})
              .then(()=>{
                console.log(user.first,user.last,'updated to',reward)
              })
            }
          }
        });
        email.sendDefault('BOT|Monthly Rewards','Gold: '+gold+', Platinum: '+platinum+', Diamond: '+diamond)
      })
    })
    //manual point insertion
      // cron.schedule('*/15 * * * *',()=>{
      //   console.log('running point update')
      //   let update=[{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30}]
      //   User.findOneAndUpdate({_id:'633e91c3945a79bacb934535'},{'$push':{points:update}}).then(()=>console.log('point intervention done'))
      // })
    // add minutes
    // cron.schedule('*/30 * * * *',()=>{
    //   console.log('running point update')
    //   User.find().then((users)=>{
    //     users.forEach((user, i) => {
    //       if(user._id=='6324095536b82285890835c2' || user._id=='632d75cbb8480b92ca0b7acc'){
    //         let units = []
    //         user.subscriptions.forEach((sub, i) => {
    //           if(sub.name=='prod_Mf0wgW4xwQ0Yyc' && sub.status=='active'){
    //             console.log(user.first,user.last,'must be updated with',user.monthly_hours,'hours:',moment(sub.start).format('DD'),new Date().getDate(),moment(sub.start).format('DD')==new Date().getDate())
    //             if(moment(sub.start).format('DD')<=new Date().getDate()){
    //               console.log('update activated')
    //               for(let i = 0;i<user.monthly_hours*2;i++){
    //                 units.push({value:30})
    //               }
    //             }
    //           }
    //         });
    //         User.findByIdAndUpdate(user._id,{'$push':{points:units}}).then(()=>{console.log('points added for',user.first,user.last)})
    //       }
    //     });
    //   })
      // console.log('updating keiko')
      // let update= {'$set':{
      //   points:[{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30},{value:30}],
      //   stripe:{
      //     customer_id:"cus_Mgk3uWbJps6Bhr"
      //   }
      // }}
    // })

    //expiry check for lessons
    cron.schedule('0 22 * * *',()=>{
      let expired = 0
      User.find().then((users)=>{
        users.forEach((user, i) => {
          let remove = user.points
          console.log(user.first,remove)
          user.points.forEach((lesson, i) => {
            console.log('expired?',moment(new Date()),moment(lesson.createdAt).add(180,'days'),moment(lesson.createdAt).add(180,'days').diff(moment(new Date()),'days'))
            if(moment(lesson.createdAt).add(180,'days').diff(moment(new Date()),'days')){
              remove.splice(i,1)
              expired++
            }
          });
          console.log('to update',remove)
          User.findByIdAndUpdate(user._id,{'$set':{points:remove}},{new:true})
        });
        email.sendDefault('BOT|Expired Lessons',expired)
      })
    })
    //automated engagement
    cron.schedule('0 23 * * *',()=>{ //server time is 9 hours ahead
      User.find().then((users)=>{
        // email.sendDefault('Activating Engagement','Sent on '+new Date().toString())

        let delay=[]
        let mada=[]
        let mail_tag = ''
        users.forEach((user, i) => {
          mail_tag=''
          if(user.role=='user' && user.subscriptions){
            if(user.subscriptions.some(u=>u.status=='active')){

            }
            else{
              let last = ''
              let visited = user.statistics && user.statistics.length>0
              if(visited){
                let absent = moment(new Date()).diff(moment(user.statistics[0].end),'days')
                  if(absent>=30 && absent<60){
                    mail_tag='1_month_absent'
                    delay.push({
                        name:user.first+" "+user.last,
                        duration: absent
                    })
                    // mailchimp_email(mailchimp_hash,mail_tag,user)
                  }
                  if(absent>=60){
                    mail_tag='2_month_absent'
                    delay.push({
                        name:user.first+" "+user.last,
                        duration: absent
                    })
                    // mailchimp_email(mailchimp_hash,mail_tag,user)
                  }
                  console.log(user.first,user.last,'has not visited for',absent,mail_tag)

                  if(mail_tag!=''){
                    console.log('sending email to',user.first,user.last)
                    mailchimp_email(mail_tag,user)
                  }
              }else{
                //user has not visited EVER
                let duration = moment(new Date()).diff(moment(user.createdAt),'days')
                //1 week email
                if(duration>=7 && duration<14){
                  mail_tag='1_week_no_exp'
                }
                //2 week email
                if(duration>=14 && duration<21){
                  mail_tag='2_week_no_exp'
                }
                //1 month
                if(duration>=30 && duration<60){
                  mail_tag='1_month_no_exp'
                }
                //2 month
                if(duration>=60){
                  mail_tag='2_month_no_exp'
                }
                mada.push({
                    name:user.first+" "+user.last,
                    duration: duration
                })
                if(mail_tag!=''){
                  console.log('sending email to',user.first,user.last)
                  mailchimp_email(mail_tag,user)
                }
                console.log(user.first,user.last,'has not visited yet.',duration,'days since registration.',mail_tag)

              }
            }
          }
        });
        console.log('Delayed:',delay.length,' | Not Yet:',mada.length)
        email.reportEngagement(mada,delay)
        console.log('cron complete at',moment(new Date()).format('MM DD'))
      })
      console.log('running')
    })

    const mailchimp_email = (mail_tag,user)=>{
      user.subscriptions.forEach((sub, i) => {
        if(sub.name=='prod_Mf0wgW4xwQ0Yyc' && sub.status=='active'){
          let mailchimp_hash = encrypt(user.email.toLowerCase()).toString()
          mailchimp.setConfig({
            apiKey:process.env.MAILCHIMP_AUTH,
            server:'us9'
          })
          const response = mailchimp.lists.updateListMemberTags(
            'cb86e9b6f5',
            mailchimp_hash,
            {tags:[{name:mail_tag,status:'active'}]}
          ).then(()=>{console.log('Email sent to',user.first,user.last)})
        }
      });

    }
module.exports = router;
