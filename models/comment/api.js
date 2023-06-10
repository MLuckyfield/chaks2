const router = require('express').Router();
const Comment = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const encrypt = require('crypto-js/md5')
const request = require('request')
const mailchimp = require("@mailchimp/mailchimp_marketing");

//Create
router.post('/new', auth.permission(['manager']),async (req, res) => {
  req = req.body
  // console.log('recieved: '+JSON.stringify(req))

  await Comment.insertMany({
      student: req.student,
      author: req.author,
      end:new Date()
  }).then(()=>{
    return res.status(201).json({
              message: 'new comment',
              success: true
            });
  })

});
// //Update
router.post('/draftComment', auth.permission(['teacher','manager']),async (req, res) => {
  req=req.body
  await Comment.findByIdAndUpdate(req.commentId,{comment:req.comment,status:'draft'},{new:true})
      .then((comment)=>{
        console.log('revised comment',comment)
        return res.status(201).json({
          message: 'Comment saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Comment creation unsuccessful: ${err}`,
          success: false
        });
      })

});
router.post('/approveComment', auth.permission(['manager']),async (req, res) => {
  req=req.body
  await Comment.findByIdAndUpdate(req.commentId,{status:'approved'},{new:true})
      .then((comment)=>{
        console.log('revised comment',comment)
        return res.status(201).json({
          message: 'Comment saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Comment creation unsuccessful: ${err}`,
          success: false
        });
      })

});
router.post('/reassignTeacher', auth.permission(['manager']),async (req, res) => {
  req=req.body
  await Comment.findByIdAndUpdate(req.commentId,{author:req.teacherId},{new:true})
      .then((comment)=>{
        console.log('revised comment',comment)
        return res.status(201).json({
          message: 'Comment saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Comment creation unsuccessful: ${err}`,
          success: false
        });
      })

});
//Get
router.get('/all', async (req, res) => {
  console.log(req.query)
  let data = await Comment.find({student:req.query.filter}).populate('author')
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});
//delete
router.post('/deleteComment', auth.permission(['manager']),async (req, res) => {
  req=req.body
  await Comment.findByIdAndRemove(req.commentId)
      .then(()=>{
        console.log('deleted comment',req.commentId)
        return res.status(201).json({
          message: 'Comment saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Comment deletion unsuccessful: ${err}`,
          success: false
        });
      })

});
//Get
router.get('/allSessions', async (req, res) => {
  console.log(req.query)
  let data = await Comment.find(JSON.parse(req.query.filter)).populate('student')
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});
//Get
router.get('/teacherSession', async (req, res) => {
  // req=JSON.parse(req.query.filter)
  let data = await Comment.find({author: req.query.filter,status:{'$ne':'approved'}}).populate('author').populate('student')
  console.log('found',data,'for',req.query.filter)
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});

router.get('/getInSession', auth.permission(['manager']),async (req, res) => {
  console.log(req.query)
  let data = await Comment.find({status:{'$ne':'approved'}}).populate('author').populate('student')
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});
module.exports = router;
