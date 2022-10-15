const router = require('express').Router();
const auth= require('../../services/authentication');
const notify= require('../../services/notify');
const User = require('./model')
const Material = require('../material/model')

const request = require('request')
const cron = require('node-cron')
const moment = require ('moment')
const encrypt = require('crypto-js/md5')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const email = require('../../services/email')
const { Server } = require("socket.io");

// const io = new Server({ /* options */ });

//Registration

    //user
    router.post('/new', async (req, res) => {
      req=req.body
      console.log(req)
      //check if exists
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
            console.log('materials',materials)
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
                     let result = auth.createToken(user)
                     // console.log(result)
                     //--MAILCHIMP
                     console.log('starting mail service')
                     request({
                       url: 'https://us9.api.mailchimp.com/3.0/lists/cb86e9b6f5/members',
                       json: {
                           'email_address': req.email,
                           'user': `anystring: ${process.env.MAILCHIMP_AUTH}`,
                           'status': 'subscribed',
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
                             console.log('user saved, website okay ready')
                             return res.status(201).json({
                               result,
                               message: `Success!`,
                               success: true
                             });
                           }
                       });
                       // ==mialchimp finished
                   }
                 );
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
      return user ? true:false;
    };
//Login

    //user
    router.post('/login', //auth.auth(),auth.permission(),
          async (req, res) => {
            // req=req.body
            let {email, password} = req.body;
            console.log('recieved '+ email)
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
      // console.log('filter recieved',req.body.filter)
      // console.log('data recieved',req.body.data)
      // console.log(req)
      await User.findOneAndUpdate(req.body.filter,req.body.data,{new:true})
          .then((result)=>{
            return res.status(201).json({
              data:result,
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
    //Start and End session
    router.get('/clock', auth.auth, auth.permission(['admin','manager']), async (req, res) => {
      req=req.query
      let session = {}
      // console.log(typeof req.data)
      // console.log(req.data==true)
      // console.log(req.data===true)
      // console.log(req.filter)

      //1. If session started
      if (req.data=='true'){
        // notify.emit(['62bec286e4a871a163c6eaaf_students'],'NEW','Please welcome Shunsuke','')
        console.log('creating new session')
        session['start'] = new Date()
        await User.findById(req.filter)
          .then((user)=>{
            console.log('found '+user.first)
            user.statistics.push(session)
            User.findByIdAndUpdate(req.filter,{'$set':{statistics:user.statistics,inClass:true}},{new:true})
                  .then((result)=>{
                    console.log('updated '+JSON.stringify(result))
                    return res.status(201).json({
                      data:result,
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
      }
      else{
        //2. if session ended
        // console.log('considered false: '+req.data)
        await User.findById(req.filter)
          .then((user)=>{
            user.statistics.reverse()[0].end=new Date()
            User.findByIdAndUpdate(req.filter,{'$set':{statistics:user.statistics,inClass:false}},{new:true})
                  .then((result)=>{
                    //calculate billable time in units
                    let start =moment(result.statistics[0].start)
                    let end = moment(result.statistics[0].end)
                    const time = end.diff(start, 'minutes')
                    let billable = 0
                    if(time-40>0){billable=time-40}
                    billable = (Math.round(billable/30))+1
                    let unpaid=0
                    for(let i =0;i<billable;i++){
                      console.log('length',result.points.length)
                      if(result.points.length>=1){
                        result.points.splice(0,1)
                      }
                      else{unpaid++}
                    }
                    // billable = (Math.round(billable/30)*1000)+1000
                    console.log('Billable time is',billable,start,end)
                    console.log('available',result.points, unpaid)
                    result.points = result.points
                    result['unpaid']= unpaid
                    result['billable']=billable
                    console.log(result)
                    return res.status(201).json({
                      data:result,
                      message: 'User update',
                      success: true
                    });
                  })
                  .catch((err)=>{
                    return res.status(500).json({
                      message: `Could not find user: ${err}`,
                      success: false
                    });
                  })
          })
      }
    });

    //Get
    router.get('/all', auth.auth, async (req, res) => {
      // console.log('running user/all',req.query)
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
      console.log('running user/progress',req.query)
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields).populate('progress.ref').populate('goals._id')
      console.log('data retrieved:',data)
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });
    router.post('/goals', auth.auth, async (req, res) => {
      //get number of goals
      console.log('running goals',req.body.data, req.body.goals)
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
      console.log('running update_goals',typeof req.query.find)
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
      // console.log('running user/all',req.query)
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields).populate({path:'students',model:'User',populate:{path:'goals.ref',model:'Material'}})
      console.log('data retrieved:',data)
      return res.status(201).json({
        data: data,
        message: 'Job saved',
        success: true
      });
    });

    router.get('/dash',auth.auth,auth.permission(['user','teacher','manager']),async (req,res)=>{
      console.log('hi')
      // console.log(req)
      return res.status(200).json({
        message: 'Welcome back',
        success: true
      });
    })

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
    //automated engagement
    cron.schedule('0 22 * * *',()=>{ //server time is 9 hours ahead
      User.find().then((users)=>{
        console.log('cron running...',users.length)
        // email.sendDefault('Activating Engagement','Sent on '+new Date().toString())

        let delay=[]
        let mada=[]
        let mail_tag = ''
        users.forEach((user, i) => {
          mail_tag=''
          if(user.role=='user'){
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
        });
        console.log('Delayed:',delay.length,' | Not Yet:',mada.length)
        email.reportEngagement(mada,delay)
        console.log('cron complete at',moment(new Date()).format('MM DD'))
      })
      console.log('running')
    })

    const mailchimp_email = (mail_tag,user)=>{
      let mailchimp_hash = encrypt(user.email.toLowerCase()).toString()
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_AUTH,
        server: 'us9',
      });
      const response = mailchimp.lists.updateListMemberTags(
        "cb86e9b6f5",
        mailchimp_hash,
        { tags: [{ name: mail_tag, status: "active" }] }
      ).then(()=>{
        console.log('Email sent to',user.first,user.last)
      })
    }
module.exports = router;
