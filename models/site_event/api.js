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
      await Site_Event.find({_id:req.security_code}).then((site_event)=>{
        let start =moment(site_event.createdAt)
        let end = moment(new Date())
        const time = end.diff(start, 'minutes')
        console.log('resetting, testing expiry',time)
        if(time<120){
          User.findByIdAndUpdate({_id:site_event},{password:auth.newPass(req.password)})
          .then(()=>{
            Site_Event.findByIdAndDelete({_id:site_event._id}).then(()=>{
              return res.status(201).json({
                message: 'password updated',
                success: true
              });
            })
          }).catch((err)=>{
            return res.status(400).json({
              message: 'password update failed',
              success: false
            });
          })
        }
        return res.status(400).json({
          message: 'password update failed',
          success: false
        });
      })
    });

module.exports = router;
