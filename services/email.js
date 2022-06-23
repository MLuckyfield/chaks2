const User = require('../models/user/model')
const nodemailer = require('nodemailer');
const moment = require ('moment')

const sendBooking = (req)=>{
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
      subject: 'NEW booking: ' + req.teacher+': '+moment(req.date).format('dddd, MM DD @ h:mm a'),
      text: req.student.first+' '+req.student.last
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return res.status(201).json({
            message: 'Error - confirmation not sent',
            success: false
          });
        } else {
          return res.status(201).json({
            message: 'Done! See you soon :)',
            success: true
          });
        }
  })
}

module.exports={sendBooking}
