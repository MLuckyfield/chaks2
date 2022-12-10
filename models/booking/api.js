const router = require('express').Router();
const Booking = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const email = require('../../services/email')
const cron = require('node-cron')
const moment = require ('moment')

//Create
router.post('/new', async (req, res) => {
  req = req.body
  console.log('recieved: '+JSON.stringify(req))
  await User.findById(req.student).then((user)=>{
      console.log(user.first+' has '+user.points)
      if(user.points>=100){
        Booking.insertMany({
            teacher:req.teacher,
            student: req.student,
            date: req.date,
            lesson:req.lesson
        })
          .then((result)=>{
            //update user
            User.findOneAndUpdate({_id:req.student},{$inc:{points:-100}})
                .then(()=>{
                  email.sendBooking(user,req,res)

                  // return res.status(201).json({
                  //   message: 'User update',
                  //   success: true
                  // });
                })
                .catch((err)=>{
                  return res.status(500).json({
                    message: `User failed to update: ${err}`,
                    success: false
                  });
                })
          })
          .catch((err)=>{
            return res.status(500).json({
              message: `Error. Please call if this error persists.`,
              success: false
            });
          })
      }else{
      return res.status(401).json({
        message: `Not enough points. You need at least 100!`,
        success: false
      });}
  })

});
// //Update
// router.post('/update', async (req, res) => {
//
//   await Booking.findOneAndUpdate(req.body.filter,req.body.data)
//       .then(()=>{
//         return res.status(201).json({
//           message: 'Booking saved',
//           success: true
//         });
//       })
//       .catch((err)=>{
//         return res.status(500).json({
//           message: `Booking creation unsuccessful: ${err}`,
//           success: false
//         });
//       })
//
// });
//Get
router.get('/all', auth.permission(['user','manager']),async (req, res) => {
  console.log(req.query)
  let data = await Booking.find(JSON.parse(req.query.filter)).populate('student').populate('teacher')
  return res.status(201).json({
    data: data,
    message: 'Booking saved',
    success: true
  });
});

cron.schedule('*/5 * * * *',()=>{
  console.log('running bookings')
  User.find({role:'teacher',online_schedule:{$exists:true}}).then((teachers)=>{
    //get first and last day as date object, to extract date and day
    let year = new Date().getYear()+1900
    let month = new Date().getMonth()+1
    let days =new Date(year,month,0).getDate()
    // let startDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-1`)
    // let endDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-${days}`)
    //create new booking array
    teachers.forEach((teacher, i) => {
        console.log(teacher.first,teacher.last)
        if(teacher.online_schedule.length>0){
          let bookings = []
          teacher.online_schedule.forEach((shift, i) => {
            console.log('converting',shift,days)
            //check if schedule is within start and end date
            for(let i =1;i<days+1;i++){
              let date = new Date(`${year}-${month}-${i}`)
              console.log('loop:',i,days)
              if(date.getDay()==shift.day){
                //calculate number of slots based on shift length
                let shift_start = moment(date).set({h:shift.start_hour,m:shift.start_minute})
                let shift_end = moment(date).set({h:shift.end_hour,m:shift.end_minute})
                let shift_minutes = shift_end.diff(shift_start,'minutes')
                let loop = shift_minutes/30
                console.log('shift time',shift_minutes,loop)
                console.log('within range:',date,date.getDay(),shift.day,date.getDay()==shift.day)
                for(let y=1;y<loop+1;i++){
                  console.log(y)
                  // //need to track time in 30 min increments
                  // shift_start.add(i*30,'minutes')
                  // console.log(shift_start,shift_start.hour(),shift_start.minutes())
                  //
                  // //add to booking array
                  // bookings.push({
                  //   teacher:teacher._id,
                  //   date: moment(date).set({h:shift.start_hour,m:shift.start_minute}),
                  //   status:'draft'
                  // })
                }
              }
            }
          });
          //create bookings
          console.log(bookings)
          // Bookings.insertMany(bookings).then(()=>{console.log(bookings.length,'added')})
        }
    });
  })
})

module.exports = router;
