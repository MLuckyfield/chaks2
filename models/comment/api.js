const router = require('express').Router();
const Comment = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')

//Create
router.post('/new', async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))

  await Comment.insertMany({
      comment: req.comment,
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
//   await Comment.findOneAndUpdate(req.body.filter,req.body.data)
//       .then(()=>{
//         return res.status(201).json({
//           message: 'Comment saved',
//           success: true
//         });
//       })
//       .catch((err)=>{
//         return res.status(500).json({
//           message: `Comment creation unsuccessful: ${err}`,
//           success: false
//         });
//       })
//
// });
//Get
router.get('/all', async (req, res) => {
  console.log(req.query)
  let data = await Comment.find({student:req.query.filter}).populate('User')
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});

module.exports = router;
