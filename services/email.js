const User = require('../models/user/model')
const nodemailer = require('nodemailer');
const moment = require ('moment')
const timezone = require ('moment-timezone')

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
    console.log(req)
    console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = {
      from: 'support@chatshack.jp',
      to: 'support@chatshack.jp',
      subject: 'NEW BOOKING for ' +user.first+' '+user.last+ '| Teacher: ' + req.teacher+' @ '+timezone.tz(req.date,'Asia/Tokyo').format('dddd, MMM DD @ h:mm a').toString(),
      text: user.first+' '+user.last
    };
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
