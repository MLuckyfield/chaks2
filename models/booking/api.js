const router = require('express').Router();
const Booking = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');

//Create
router.post('/new', async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))

  await Booking.insertMany({
      student: req.student,
      date: req.date
  })
      .then(()=>{
        return res.status(201).json({
          message: 'Done! See you soon :)',
          success: true
        });
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
  let data = await Booking.find({student:req.query.filter}).populate('student')
  return res.status(201).json({
    data: data,
    message: 'Booking saved',
    success: true
  });
});

module.exports = router;
