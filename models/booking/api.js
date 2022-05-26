const router = require('express').Router();
const Booking = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')

//Create
router.post('/new', async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))

  await Booking.insertMany({
      Booking: req.Booking,
      student: req.student._id,
      author: req.author._id
  })
      .then(()=>{
        return res.status(201).json({
          message: 'Feedback uploaded!',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Upload failure: ${err}`,
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
router.get('/all', async (req, res) => {
  console.log(req.query)
  let data = await Booking.find({student:req.query.filter}).populate('author')
  return res.status(201).json({
    data: data,
    message: 'Booking saved',
    success: true
  });
});

module.exports = router;
