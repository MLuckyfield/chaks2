const router = require('express').Router();
const Booking = require('../booking/model')
const Group = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const email = require('../../services/email')
const cron = require('node-cron')
const moment = require ('moment-timezone')

const reply =(res,status,msg,data)=>{
  return res.status(status).json({
    data: data,
    message: msg,
  });
}
//Create
router.post('/addToGroup', async (req, res) => {
  //params: group_id, user_id
  await Group.findById(group_id).then(group=>{
    //check if group as space
    //1. has space -> check if user has points
    if(group.bookings.length<4){
      User.findById(user_id).then(user)=>{
        //a) has points ->
        if(user.points>0){
          //create booking
          new Booking().save().then(booking=>{
            //attach to group
            Group.update(group_id,booking).then(()=>{
              //subtract points from user
              User.update(user_id,{}).then((user)=>{
                //return result
                reply(res,201,'Booking saved',user)
              })
            })
          })
        }
        //b) insufficient -> return insufficient
        reply(res,500,'Not enough points')
      }
      //2. no space -> return no space
      reply(res,500,'Group has no space')
    }
  })
});
router.post('/update', auth.permission(['manager']),async (req, res) => {
  //params: group_id, update
  await Group.update(group_id,{}).then(group=>{
    reply(res, 201,'Group created',group)
  })
  .catch(err=>reply(res,500,err))
});
router.post('/new', auth.permission(['manager']),async (req, res) => {
  //params: group_id, update
  await new Group(group).save().then(group=>{
    reply(res,201,'Group created',group)
  })
  .catch(err=>reply(res,500,err))
});

// //Delete
router.post('/delete', auth.permission(['manager']),async (req, res) => {
  await Group.deleteOne(group_id)
      .then(()=>{
        reply(res,201,'Group deleted')
      })
      .catch(err=>reply(res,500,err))
});

//Get
router.get('/all', async (req, res) => {
  await Group.find().then(groups=>reply(res,201,'Groups loaded',groups))
  .catch(err=>reply(res,500,err))
});

module.exports = router;
