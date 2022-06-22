const User = require('../models/user/model')
const router = require('express').Router();
const nodemailer = require('nodemailer');
const request = require('request')
const moment = require ('moment')

const sendBooking = (booking)=>{

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
      subject: 'NEW booking: ' + booking.teacher+': '+moment(booking.date).format('dddd, MM DD @ h:mm a'),
      text: booking.student.first+' '+booking.student.last
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
}

module.exports={sendBooking}
