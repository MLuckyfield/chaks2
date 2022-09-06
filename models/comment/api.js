const router = require('express').Router();
const Comment = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const encrypt = require('crypto-js/md5')
const request = require('request')
const mailchimp = require("@mailchimp/mailchimp_marketing");

//Create
router.post('/new', auth.permission(['teacher','manager']),async (req, res) => {
  req = req.body
  // console.log('recieved: '+JSON.stringify(req))

  await Comment.insertMany({
      comment: req.comment,
      student: req.student._id,
      author: req.author._id
  })
      .then(()=>{
        Comment.find({student:req.student._id}).then((result)=>{
          // let mailchimp_hash = encrypt(req.student.email.toLowerCase()).toString()
          // console.log(req.student.email)
          // console.log(encrypt(req.student.email).toString())
          if (result.length==1){
            console.log('sending feedback email...')
            let mailchimp_hash = encrypt(req.student.email.toLowerCase()).toString()
            mailchimp.setConfig({
              apiKey: process.env.MAILCHIMP_AUTH,
              server: 'us9',
            });

            const response = mailchimp.lists.updateListMemberTags(
              "cb86e9b6f5",
              mailchimp_hash,
              { tags: [{ name: "finished_trial", status: "active" }] }
            ).then(()=>{
              User.findOneAndUpdate({_id:req.author._id},{'$pull':{students:req.student._id}},{new:true})
                  .then((result)=>{
                    console.log('removing',req.student._id,'from',req.author._id,result)
                    return res.status(201).json({
                      data:result,
                      message: 'User update',
                      success: true
                    });
                  })
                  .catch((err)=>{
                    return res.status(500).json({
                      message: `User failed to update: ${err}`,
                      success: false
                    });
                  })
              // return res.status(201).json({
              //         message: `Success!`,
              //         success: true
              //       });
            })
          }
        })
        // return res.status(201).json({
        //   message: 'Feedback uploaded!',
        //   success: true
        // });
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
  let data = await Comment.find({student:req.query.filter}).populate('author')
  return res.status(201).json({
    data: data,
    message: 'Comment saved',
    success: true
  });
});

module.exports = router;
