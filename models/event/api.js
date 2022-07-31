const router = require('express').Router();
const auth= require('../../services/authentication');
const Event = require('./model')
const request = require('request')

//Registration

    //user
    router.post('/new',auth.auth, auth.permission(['manager']),async (req, res) => {
      req=req.body

      try{
        await new Event({
          ...req
        }).save()
          .then(()=>{
            return res.status(201).json({
              message: `Success!`,
              success: true
            });
          })
      }
     catch(err){
       console.log('event creation failed')
       return res.status(500).json({
         message: `user creation unsuccessful: ${err}`,
         success: false
       });
      }
    });

    router.post('/update',auth.auth, auth.permission(['manager']),async (req,res)=>{
      req=req.query
      Event.findByIdAndUpdate(req.filter,{'$set':{attendees:req.rsvp}},{new:true})
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
    router.post('/update',auth.auth, auth.permission(['manager']),async (req,res)=>{
      await Event.findOneAndUpdate(req.body.filter,req.body.data)
          .then(()=>{
            return res.status(201).json({
              message: 'Event updated',
              success: true
            });
          })
          .catch((err)=>{
            return res.status(500).json({
              message: `Event failed to update: ${err}`,
              success: false
            });
          })
    })

    //Get
    router.get('/all', async (req, res) => {
      // console.log('get all events...',req.query)
      let data = await Event.find(req.query?req.query.filter:{})
      return res.status(201).json({
        data: data,
        message: 'Events List',
        success: true
      });
    });

module.exports = router;
