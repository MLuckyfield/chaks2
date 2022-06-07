const router = require('express').Router();
const Blog = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');

//Create
router.post('/new', auth.permission(['teacher','manager']),async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))
  const target = {
    title: req.title,
    preview: req.preview,
    content: req.content,
    author: req.author._id,
    date: req.date,
  }
  console.log(target)
  console.log('to be saved:'+JSON.stringify(target))
  await Blog.insertMany(target)
      .then(()=>{
        return res.status(201).json({
          message: 'Done! See you soon :)',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Error. Please call if this error persists.${err}`,
          success: false
        });
      })

});
// //Update
// router.post('/update', async (req, res) => {
//
//   await Blog.findOneAndUpdate(req.body.filter,req.body.data)
//       .then(()=>{
//         return res.status(201).json({
//           message: 'Blog saved',
//           success: true
//         });
//       })
//       .catch((err)=>{
//         return res.status(500).json({
//           message: `Blog creation unsuccessful: ${err}`,
//           success: false
//         });
//       })
//
// });
//Get
router.get('/all', auth.permission(['teacher','manager']),async (req, res) => {
  console.log(req.query)
  let data = await Blog.find(req.query.filter?JSON.parse(req.query.filter):{}).populate('author')
  return res.status(201).json({
    data: data,
    message: 'Blog saved',
    success: true
  });
});

module.exports = router;
