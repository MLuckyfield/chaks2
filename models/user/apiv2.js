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
const mailchimp = require("../../services/mailchimp");
const email = require('../../services/email')
const constants = require('../../services/constants')
const log = require('../../services/log')

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
    router.post('/newTeacher', async (req, res) => {
      req=req.body

      let taken = await(exists(req.email));
      if (taken){
        return res.status(400).json({
          message:'Email already in use',
          success: false
        });
      }
      const password = await auth.newPass(req.password)
      try{
        new User({
          ...req,
          password: password,
          role: 'teacher',
          active:false
        }).save()
        .then(()=>{
          return res.status(201).json({
                message: `Success!`,
                success: true
              });
        })
      }catch(err){
        console.log('there was a problem',err)
        return res.status(500).json({
          message: `user creation unsuccessful: ${err}`,
          success: false
        });
      }
    })

    //user
    router.post('/new', async (req, res) => {
      req=req.body
      console.log('new account request')
      let taken = await(exists(req.email));
      if (taken){
        log.saveUserAction('registration','email in use',req.first,req.last,req.email)
        console.log('user exists')
        return res.status(400).json({
          message:'Email already in use',
          success: false
        });
      }

      //encrypt password
      const password = await auth.newPass(req.password)

      try{
        console.log('--starting')

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
                 console.log('user made')

                 Comment.insertMany({
                   student: user,
                   author: req.teacher,
                   end:new Date(),
                   trial:true
                 }).then(()=>{
                   console.log('comment made')
                   //add to mailchimp
                   //----------------------------------untested
                   let result = auth.createToken(user)
                   mailchimp.addTag(user.email,constants.TRIAL_COMPLETED,
                         ()=>{
                           console.log('trial to be updated',req.trial)
                           if(req.trial){//if there was a reservation
                             Booking.findByIdAndUpdate(req.trial._id,{status:'delivered'},{new:true}).then((trial)=>{
                               console.log('new',trial)
                             return res.status(201).json({
                                   result,
                                   message: `Success!`,
                                   success: true
                                 })
                            })
                          }else{
                            return res.status(201).json({
                                  result,
                                  message: `Success!`,
                                  success: true
                                })
                          }//otherwise there was no reservation
                        },
                         (e)=>{
                           log.saveUserAction('registration',e,user.first,user.last,user._id)
                           return res.status(501).json({
                               result,
                               message: `${e}!`,
                               success: false
                             });})
                             //----------------------------------untested end
                 })
               })
               .catch((err)=>{
                 log.saveUserAction('registration',err,req.first,req.last,req.email)
               })
           })
        }catch(err){
          log.saveUserAction('registration',err,req.first,req.last,req.email)
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
      //prepare a new comment
      new Comment({
        student: req.student,
        author:req.teacher,
        status: 'pending',
      }).save()
      .then((comment)=>{
        //update user lastvisit time
        console.log('UPDATING STUDENT WITH LAST TIME',req.student)
         User.findByIdAndUpdate(req.student,{lastVisit:moment.utc(moment())},{new:true})
         .then((newUser)=>{
           console.log('UPDATING STUDENT RESULT',newUser)
           socket.startSession(comment)
           return res.status(201).json({
             data:comment,
             message: 'User update',
             success: true
           });
         })
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
    //EMAIL AUTOMATIONS
    //automated engagement for completed trials that didnt sign up
    // cron.schedule('0 18 * * *',()=>{ //server time is 9 hours ahead
    //   let date = new Date();
    //   date.setDate(date.getDate() - 30);
    //   console.log('emailing all users who completed the trial but have not signed up since',date)
    // //get all users who made an account within  the last month
    //   User.find({createdAt:{$gte:date}}).then(users=>{
    //     console.log(users.length)
    //     let contact = 0
    //     users.forEach((user, i) => {
    //       //if they dont have a subcription
    //       if(user.subscriptions.length==0){
    //         contact++
    //         // check the last visit time
    //         let time = moment().diff(user.lastVisit,'days')//user.lastVisit doesnt exist
    //         let tag = ''
    //         switch (time) {
    //           case time>=14:
    //             tag = constants.TRIAL_COMPLETED_2_Week
    //             break;
    //           case time>=7:
    //             tag = constants.TRIAL_COMPLETED_1_Week
    //             break;
    //           case time>=3:
    //             tag = constants.TRIAL_COMPLETED_3_DAYS
    //             break;
    //           default:
    //         }
    //         console.log('send',user._id,time,tag,user.createdAt)//mailchimp.addTag(user.email,tag)
    //       }
    //     });
    //     console.log(users.length,'were processed, only',contact,'will be contacted')
    //   }).catch(err=>console.log(err))
    // })

    //automated engagement for no show trials - depends on update to delivered working on new account creation
    // cron.schedule('*/1 * * * *',()=>{ //server time is 9 hours ahead
    //     let date = new Date();
    //     date.setDate(date.getDate() - 30);
    //     console.log('running no show engagement')
    //     Bookings.find({trial:true,status:'reserved',date:{$gte:date,$lte:moment()}}).then(trials=>{
    //       trials.forEach((trial, i) => {
    //         let time = moment().diff(trial.date,'days')//user.lastVisit doesnt exist
    //         switch (time) {
    //           case time>=14:
    //             tag = constants.TRIAL_NO_SHOW_2_Week
    //             break;
    //           case time>=7:
    //             tag = constants.TRIAL_NO_SHOW_1_Week
    //             break;
    //           case time>=3:
    //             tag = constants.TRIAL_NO_SHOW_3_DAYS
    //             break;
    //           case time>=1:
    //             tag = constants.TRIAL_NO_SHOW
    //             break;
    //           default:
    //         }
    //         console.log('send',trial._id,time,tag,trial.date)//mailchimp.addTag(user.email,tag)
    //       });
    //       console.log(users.length,'were processed')
    //     }).catch(err=>console.log(err))
    // })
    const mailchimp_email = (mail_tag,user)=>{
      user.subscriptions.forEach((sub, i) => {
        if(sub.name=='prod_Mf0wgW4xwQ0Yyc' && sub.status=='active'){
          mailchimp.addTags(user.email,mail_tag)
        }
      });

    }
module.exports = router;
