const router = require('express').Router();
const auth= require('../../services/authentication');
const User = require('./model')

//Registration

    //user
    router.post('/new', async (req, res) => {
      req=req.body

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
        }).save();
        console.log('user saved, website okay ready')
        return res.status(201).json({
          message: `Success!`,
          success: success
        });
      }catch(err){
        console.log(req)
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
