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
  await Booking.insertMany({
      teacher:req.teacher,
      student: req.student,
      date: req.date
  })
      .then((result)=>{
        //use req.teach directly?
        email.sendBooking(req)
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Error. Please call if this error persists.`,
          success: false
        });
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
