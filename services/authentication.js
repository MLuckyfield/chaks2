const User = require('../models/user/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const ADMIN = 'admin';
const USER = 'user';

const validatePass=(actual,proposed)=>{
  return bcrypt.compare(actual, proposed);
}
const newPass = (password)=>{
  return bcrypt.hash(password, 12);
}
const createToken=(user)=>{
  //sign and issue token
  let token = jwt.sign({
      user_id: user._id,
      role: user.role,
      name: user.name,
      email: user.email
    },
    process.env.SECRET,
    {expiresIn: '7 days'}
  );

  let result = {
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
    expiresIn: 168
  };

  return result
}

const auth = (req,res,next)=>{
  console.log('auth check')
  console.log(req.headers)
  let proposal = ''
  if(req.headers.authorization){
    proposal = req.headers.authorization.split(' ')
  }else{reject(res)}
  console.log(proposal)
  if(proposal[0]=='Token'){
    let token = proposal[1]
    if(token){

        jwt.verify(token,process.env.SECRET, (err, decoded)=>{
          if (err){
            console.log(err)
            reject(res)
          }else{
            req.user=decoded
            // console.log('decoded '+decoded)
            next()
          }
        })
    }
    else{
      reject(res)
    }
  }else if(proposal[0]=='api'){
    let token = proposal[1]
    if(token && token==process.env.API_KEY){
        req.script=true
        next()
    }
    else{
      reject(res)
    }
  }
}
const permission = (access)=>{
  return (req,res,next)=>{
    console.log('permission check')
    if(req.user){
      // console.log('user agent')
      if(req.user.role == access){
        // console.log('access granted')
        next()
      }else{
        reject(res)
      }
    }else if(req.script && req.script==true){
      // console.log('script agent')
      next()
    }
    else{reject(res)}
  }
}
const reject = (res)=>{
  return res.status(403).json({
    message: 'There was a problem with access',
    success: false
  });
}
module.exports = {
  createToken,
  newPass,
  validatePass,
  auth,
  permission
}
