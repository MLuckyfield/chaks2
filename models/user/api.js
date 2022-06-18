const router = require('express').Router();
const auth= require('../../services/authentication');
const User = require('./model')
const request = require('request')

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
        }).save(()=>
          {
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
                    message: `user saved but mailchimp failed: ${err}`,
                    success: false
                  });
                  } else {
                    console.log('user saved, website okay ready')
                    return res.status(201).json({
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
            console.log('recieved '+ email+' and '+password)
            //check if exists
            const user = await User.findOne({email});
            if(!user){
              return res.status(401).json({
                message: 'Password incorrect',
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

    router.post('/update', async (req,res)=>{
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
    router.get('/clock', async (req, res) => {
      req=req.query.params
      let session = {}
      console.log(req.data)
      console.log(req.data==true)
      console.log(req.data===true)

      //1. If session started
      if (req.data){
        console.log('creating new session')
        session['start'] = new Date()
        await User.findById(req.filter._id)
          .then((user)=>{
            console.log('found '+user.first)
            user.statistics.push(session)
            User.findByIdAndUpdate(req.filter._id,{statistics:user.statistics,inClass:true})
                  .then((result)=>{
                    console.log('updated')
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
        await User.findById(req.filter._id)
          .then((user)=>{
            user.statistics.sort()[0].end=new Date()
            User.findByIdAndUpdate(req.filter._id,{statistics:user.statistics,inClass:false})
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
    router.get('/all', auth.auth, auth.permission(['teacher','manager']), async (req, res) => {
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


module.exports = router;
