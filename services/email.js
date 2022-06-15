const User = require('../models/user/model')
const router = require('express').Router();
const nodemailer = require('nodemailer');
const request = require('request')

router.post('/internal_reservation', async (req, res)=>{
  console.log('starting email service')
  //SEND TO MAILCHIMP
  const {email} = 'support@chatshack.jp';
  const addData = {
      members: [
         {
            email_address: email,
            status: "subscribed"
         }
      ]
  }
  addDataJson = JSON.stringify(addData);

  const options = {
      url: "https://us9.api.mailchimp.com/3.0/lists/cb86e9b6f5",
      method: "POST",
      headers: {
          Authorization: `auth ${process.env.MAILCHIMP_AUTH}`
      },
      body: addDataJson
  }
  console.log('mailchimo request ready')
  request (options, (error, response, body) => {
      console.log(body)
      // console.log(response)
      body = JSON.parse(body)
      if(body.errors) {
        console.log(email+' failed to save to Mailchimp') // error :(
          return res.status(500).json({
            message: `user creation unsuccessful: ${body.errors}`,
            success: false
          });
      } else {
          console.log(email+' saved to Mailchimp') // error :(
            return res.status(201).json({
              message: 'User created',
              success: true
            });
      }
   })
   //----mailchimp code ends here
  // console.log(req.body)
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'support@chatshack.jp',
  //     pass: 'chatshack'
  //   }
  // });
  //
  // const mailOptions = {
  //   from: 'support@chatshack.jp',
  //   to: 'support@chatshack.jp',
  //   subject: 'Sending Email using Node.js',
  //   text: 'That was easy!'
  // };
  // console.log(mailOptions)
  // transporter.sendMail(mailOptions, function(error, info){
  //   if (error) {
  //     return res.status(403).json({
  //       message: 'email attempt failed:' +error,
  //       success: false
  //     });
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //     return res.status(200).json({
  //       message: 'Welcome back',
  //       success: true
  //     });
  //   }
  // });
})


module.exports = router;
