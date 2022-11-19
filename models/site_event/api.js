const router = require('express').Router();
const auth= require('../../services/authentication');
const Site_Event = require('./model')
const User = require('../user/model')
const bcrypt = require('bcrypt')
const moment = require ('moment')

const request = require('request')
const email = require('../../services/email')


    //Get
    router.post('/reset', async (req, res) => {
      console.log('final pw reset...',req.body)
      req=req.body
      let new_pw= await auth.newPass(req.password)
      await Site_Event.find({_id:req.security_code}).then((site_event)=>{
        let start =moment(site_event.createdAt)
        let end = moment(new Date())
        const time = end.diff(start, 'minutes')
        console.log('resetting, testing expiry',time)
        if(time<120){
          try{
            console.log('new pw',new_pw)
            User.findByIdAndUpdate({_id:req.security_code},{password:new_pw},{new:true})
            .then((result)=>{
              console.log('user with new pw',result)
              Site_Event.findByIdAndDelete({_id:req.security_code}).then(()=>{
                console.log('pw reset done')
                return res.status(201).json({
                  message: 'password updated',
                  success: true
                });
              }).catch((err)=>{
                console.log('site_event delete failure',err)
              })
            }).catch((err)=>{
              console.log('update failure',err)
              return res.status(400).json({
                message: 'password update failed',
                success: false
              });
            })
          }catch(err){
            console.log('update failure',err)
            return res.status(400).json({
              message: 'password update failed',
              success: false
            });
          }
        }else{
          return res.status(400).json({
            message: 'password reset link expired',
            success: false
          });
        }
      })
    });

module.exports = router;
