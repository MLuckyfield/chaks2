const router = require('express').Router();
const Booking = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const email = require('../../services/email')
//Create
router.post('/new', async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))
  await User.findById(req.student).then((user)=>{
      console.log(user.first+' has '+user.points)
      if(user.points>=100){
        Booking.insertMany({
            teacher:req.teacher,
            student: req.student,
            date: req.date
        })
          .then((result)=>{
            //update user
            User.findOneAndUpdate({_id:req.student},{$inc:{points:-100}})
                .then(()=>{
                  email.sendBooking(user,req,res)

                  // return res.status(201).json({
                  //   message: 'User update',
                  //   success: true
                  // });
                })
                .catch((err)=>{
                  return res.status(500).json({
                    message: `User failed to update: ${err}`,
                    success: false
                  });
                })
          })
          .catch((err)=>{
            return res.status(500).json({
              message: `Error. Please call if this error persists.`,
              success: false
            });
          })
      }else{
      return res.status(300).json({
        message: `Not enough points. You need at least 100!`,
        success: false
      });}
  })

});
// //Update
// router.post('/update', async (req, res) => {
//
//   await Booking.findOneAndUpdate(req.body.filter,req.body.data)
//       .then(()=>{
//         return res.status(201).json({
//           message: 'Booking saved',
//           success: true
//         });
//       })
//       .catch((err)=>{
//         return res.status(500).json({
//           message: `Booking creation unsuccessful: ${err}`,
//           success: false
//         });
//       })
//
// });
//Get
router.get('/all', auth.permission(['user','manager']),async (req, res) => {
  console.log(req.query)
  let data = await Booking.find(JSON.parse(req.query.filter)).populate('student')
  return res.status(201).json({
    data: data,
    message: 'Booking saved',
    success: true
  });
});

module.exports = router;
