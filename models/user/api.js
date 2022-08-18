const router = require('express').Router();
const auth= require('../../services/authentication');
const notify= require('../../services/notify');
const User = require('./model')
const request = require('request')
const cron = require('node-cron')
const moment = require ('moment')
const encrypt = require('crypto-js/md5')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const email = require('../../services/email')

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
        await new User({
          ...req,
          password: password,
          role: 'user'
        }).save()
           .then((user)=>{
                 let result = auth.createToken(user)
                 console.log(result)
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
           }catch(err){
             console.log('there was a problem')
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
      await User.findOneAndUpdate(req.body.filter,req.body.data)
          .then(()=>{
            return res.status(201).json({
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
        console.log('considered false: '+req.data)
        await User.findById(req.filter)
          .then((user)=>{
            user.statistics.reverse()[0].end=new Date()
            User.findByIdAndUpdate(req.filter,{'$set':{statistics:user.statistics,inClass:false}},{new:true})
                  .then((result)=>{
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
      console.log(req.query)
      let data = await User.find(JSON.parse(req.query.filter)).select(req.body.fields?req.body.fields:req.query.fields)
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

    cron.schedule('10 02 * * *',()=>{ //server time is 9 hours ahead
      User.find().then((users)=>{
        console.log('cron running...',users.length)
        let delay=[]
        let mada=[]
        let mail_tag = ''
        users.forEach((user, i) => {
          if(user.role=='user'){
            let last = ''
            let visited = user.statistics && user.statistics.length>0
            if(visited){
              let absent = moment(new Date()).diff(moment(user.statistics[0].end),'days')
                if(absent>=30 && absent<35){
                  mail_tag='1_month_absent'
                  delay.push({
                      name:user.first+" "+user.last,
                      duration: absent
                  })
                }
                if(absent>=60 && absent<65){
                  mail_tag='2_month_absent'
                  delay.push({
                      name:user.first+" "+user.last,
                      duration: absent
                  })
                }
                console.log(user.first,user.last,'has not visited for',absent)

                if(user.first=='Matthew'){
                  console.log('sending email to',user.first,user.last)
                  mailchimp_email(mailchimp_hash,mail_tag?mail_tag:'1_month_absent',user)
                }
            }else{
              //user has not visited EVER
              let duration = moment(new Date()).diff(moment(user.createdAt),'days')
              //1 week email
              if(duration>=7 && duration<14){
                mail_tag='1_week_no_exp'
                mada.push({
                    name:user.first+" "+user.last,
                    duration: duration
                })
              }
              //2 week email
              if(duration>=14 && duration<21){
                mail_tag='2_week_no_exp'
                mada.push({
                    name:user.first+" "+user.last,
                    duration: duration
                })
              }
              //1 month
              if(duration>=30 && duration<60){
                mail_tag='1_month_no_exp'
                mada.push({
                    name:user.first+" "+user.last,
                    duration: duration
                })
              }
              //2 month
              if(duration>=60){
                mail_tag='2_month_no_exp'
                mada.push({
                    name:user.first+" "+user.last,
                    duration: duration
                })
              }
              if(user.first=='Matthew'){
                console.log('sending email to',user.first,user.last)
                mailchimp_email(mail_tag?mail_tag:'1_week_no_exp',user)
              }
              console.log(user.first,user.last,'has not visited yet.',duration,'days since registration.',mail_tag)

            }
          }
        });
        console.log('Delayed:',delay.length,' | Not Yet:',mada.length)
        email.reportEngagement(mada,delay)
      })
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
