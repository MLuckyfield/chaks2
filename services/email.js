const User = require('../models/user/model')
const nodemailer = require('nodemailer');
const moment = require ('moment')
const timezone = require ('moment-timezone')

//email builder functions
const authenticate = ()=>{
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'support@chatshack.jp',
      pass: process.env.EMAIL_AUTH
    }
  });
}
const prepareEmail=(subject,text,email)=>{
  return {
    from: 'support@chatshack.jp',
    to: email?email:'support@chatshack.jp',
    subject: subject,
    text: text
  };
}

//emails with no res requirement
const sendDefault = (title,content,email)=>{
    console.log('email service starting',content,email)
    // console.log(booking)
    const transporter = authenticate()
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = prepareEmail(
      title,
      content,
      email
    )
    sendEmailNoRes(mailOptions,transporter)
}
const sendEmailNoRes=(mailOptions,data)=>{
  const transporter = authenticate()

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {console.log(error)} else {console.log('email sent')}
    })
}
//send email with res
const sendTrial = (student,email,mobile,date,status,res)=>{
  let title = `New trial! Booking: ${status==1?'success':'fail'}`
  let content = `${student} booked a trial for ${date}: ${mobile} ${email}`
  const mailOptions = prepareEmail(
    title,
    content
  )
  sendEmail(mailOptions,res)
}
const sendEmail=(mailOptions,res,data)=>{
  const transporter = authenticate()

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error)
        return res.status(201).json({
          message: 'Error - confirmation not sent',
          success: false
        });
      } else {console.log('email sent')
        return res.status(201).json({
          data:data,
          message: 'Done! See you soon :)',
          success: true
        });
      }
})
}
const sendBooking = (user,req,res)=>{
    console.log('email service starting')
    // console.log(booking)
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = prepareEmail(
      'BOT| New Booking for ' +user.first+' '+user.last+ '| Teacher: ' + req.teacher+' @ '+timezone.tz(req.date,'Asia/Tokyo').format('dddd, MMM DD @ h:mm a').toString(),
      user.first+' '+user.last+' wants to learn '+req.lesson
    )
    sendEmail(mailOptions,res)
}
const sendRSVP = (user,event,res)=>{
    console.log('email service starting')
    // console.log(booking)
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())

    const mailOptions = prepareEmail(
      'BOT|New RSVP for ' +event.name+' | ' + user.first,
      user.first+' will join '+event.name
    )
    sendEmail(mailOptions,res,event)
}
const reportEngagement = (mada,delay)=>{
    console.log('email service starting')
    // console.log(booking)
    // console.log(req)
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a'))
    // console.log(moment(req.date).format('dddd, MMM DD @ h:mm a').toString())
    let report = 'Absent: '+delay.length+' |Not visited: '+mada.length
    // let report = 'Not yet visited:'+mada.length+'\n'
    // mada.forEach((item, i) => {
    //   console.log(item,item.duration, report.length)
    //   report += report + item.name + ' registered '+item.duration+' days ago\n'
    // });
    // report='Absent:'+delay.length+'\n'
    // delay.forEach((item, i) => {
    //   report += report + item.name + ' last attended '+item.duration+' days ago\n'
    // });

    const mailOptions = prepareEmail(
      'BOT|Daily Report: Email Engagement',
      report
    )
    sendEmailNoRes(mailOptions)
}

module.exports={sendDefault,sendBooking, sendTrial, sendRSVP, reportEngagement}
