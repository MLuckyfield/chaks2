const User = require('../models/user/model')
const nodemailer = require('nodemailer');
const moment = require ('moment')

const sendBooking = (user,req,res)=>{
    console.log('email service starting')
    // console.log(booking)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'support@chatshack.jp',
        pass: process.env.EMAIL_AUTH
      }
    });

    const mailOptions = {
      from: 'support@chatshack.jp',
      to: 'support@chatshack.jp',
      subject: 'NEW BOOKING | Teacher: ' + req.teacher+' @ '+req.date,
      text: user.first+' '+user.last
    };
    console.log(transporter)
    console.log(mailOptions)
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
          return res.status(201).json({
            message: 'Error - confirmation not sent',
            success: false
          });
        } else {console.log('email sent')
          return res.status(201).json({
            message: 'Done! See you soon :)',
            success: true
          });
        }
  })
}

module.exports={sendBooking}
