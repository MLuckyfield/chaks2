const User = require('../models/user/model')
const router = require('express').Router();
const nodemailer = require('nodemailer');

router.post('/internal_reservation'), async (req, res)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'support@chatshack.jp',
      pass: 'chatshack'
    }
  });

  const mailOptions = {
    from: 'support@chatshack.jp',
    to: 'support@chatshack.jp',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({
        message: 'Welcome back',
        success: true
      });
    }
  });
}


module.exports = {
  createToken,
  newPass,
  validatePass,
  auth,
  permission
}
