const User = require('../models/user/model')
const nodemailer = require('nodemailer');
const moment = require ('moment')
const timezone = require ('moment-timezone')

const authenticate = ()=>{
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'support@chatshack.jp',
      pass: process.env.EMAIL_AUTH
    }
  });
}
const prepareEmail=(subject,text)=>{
  return {
    from: 'support@chatshack.jp',
    to: 'support@chatshack.jp',
    subject: subject,
    text: text
  };
}
const sendEmail=(transporter,mailOptions)=>{
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
const sendBooking = (user,req,res)=>{
    console.log('email service starting')
    // console.log(booking)
    const transporter = authenticate()
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = prepareEmail(
      'NEW BOOKING for ' +user.first+' '+user.last+ '| Teacher: ' + req.teacher+' @ '+timezone.tz(req.date,'Asia/Tokyo').format('dddd, MMM DD @ h:mm a').toString(),
      user.first+' '+user.last+' wants to learn '+req.lesson
    )
    const sendEmail(transporter,mailOptions)
}
const sendRSVP = (user,req,res)=>{
    console.log('email service starting')
    // console.log(booking)
    const transporter = authenticate()
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = prepareEmail(
      'NEW BOOKING for ' +user.first+' '+user.last+ '| Teacher: ' + req.teacher+' @ '+timezone.tz(req.date,'Asia/Tokyo').format('dddd, MMM DD @ h:mm a').toString(),
      user.first+' '+user.last+' wants to learn '+req.lesson
    )
    const sendEmail(transporter,mailOptions)
}
module.exports={sendBooking}
