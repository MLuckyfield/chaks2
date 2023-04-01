const router = require('express').Router();
const Booking = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const email = require('../../services/email')
const cron = require('node-cron')
const moment = require ('moment-timezone')


router.post('/trial_booking', async (req,res)=>{
  req=req.body
  console.log('trial booking requested',req)
  // let content = req.first + ' ' + req.last+ ' ('+req.mobile+') '+' requested a trial lesson for ' + req.month + ' ' + req.day+ ' ' + req.hour + ' ' + req.minutes + ''
  // email.sendDefault('New Trial Lesson Request', content, 'support@chatshack.jp')
})
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
// //Delete
router.post('/delete', async (req, res) => {

  await Booking.deleteOne(req.body.filter)
      .then(()=>{
        return res.status(201).json({
          message: 'Booking saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Booking creation unsuccessful: ${err}`,
          success: false
        });
      })

});
// //create new
router.post('/create', async (req, res) => {
  let data = req.body
  let new_slot = moment(new Date(new Date().getFullYear(),data.month-1,data.date)).month(data.month-1).set({h:data.hour,m:data.minute})
  console.log('booking update request',data.month-1,data.date,new Date().getFullYear(),new Date(new Date().getFullYear(),data.month-1,data.date),new_slot)

  await Booking.insertMany({
      date: moment.utc(new_slot).toDate(),
  }).then((update)=>{
    return res.status(201).json({
      data:update,
      message: 'Booking saved',
      success: true
    });
  })
  .catch((err)=>{
    return res.status(500).json({
      message: `Booking creation unsuccessful: ${err}`,
      success: false
    });
  })

});
// //reschedule
router.post('/reschedule', async (req, res) => {
  let filter =req.body.filter
  let data = req.body.data
  let new_slot = moment(new Date(data.year,data.month,data.date)).set({h:data.hour,m:data.minute})
  console.log('booking update request',data.year,data.month,data.date,new Date( data.year, data.month, data.date),new_slot)

  await Booking.findOneAndUpdate(filter,{date:moment.utc(new_slot).toDate()},{new:true})
      .then((update)=>{
        return res.status(201).json({
          data:update,
          message: 'Booking saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Booking creation unsuccessful: ${err}`,
          success: false
        });
      })

});
// //Update
router.post('/reserve', async (req, res) => {
  console.log('reserving for',req.body.data.student)
  await User.findById(req.body.data.student).then((student)=>{
    let points = student.points.sort((a,b)=>{a.createdAt-b.createdAt})
    if(points.length>=2){
      points.splice(0,2)
      User.findByIdAndUpdate(req.body.data.student,{'$set':{points:points}},{new:true})
          .then(()=>{
            Booking.findOneAndUpdate(req.body.filter,req.body.data,{new:true})
                .then((update)=>{
                  // email.sendDefault(`BOT | Lesson Booked: ${student.first} ${student.last}`)
                  console.log('booking confirmed')
                  return res.status(201).json({
                    data: update,
                    message: 'Booking saved',
                    success: true
                  });
                })
                .catch((err)=>{
                  return res.status(500).json({
                    message: `Booking creation unsuccessful: ${err}`,
                    success: false
                  });
                })
          })
          .catch((err)=>{console.log('Booking error: user points failed to deduct',err)})
    }
    else{
      console.log(`Booking failed, not enough points`)
      return res.status(500).json({
              message: `Booking failed, not enough points ${points.length}`,
              success: false
            });
    }
  }).catch((err)=>{console.log('Booking error: user not found')})
});
//Get
router.get('/all', auth.permission(['user','teacher','manager']),async (req, res) => {
  console.log(req.query)
  let data = await Booking.find(JSON.parse(req.query.filter)).populate('student').populate('teacher')

  console.log('retrivied',data.length,'bookings')
  return res.status(201).json({
    data: data,
    message: 'Booking saved',
    success: true
  });
});

//converting base schedule to booking timeslots
// cron.schedule('*/15 * * * *',()=>{
//   console.log('running bookings')
//   User.find({role:'teacher',online_schedule:{$exists:true}}).then((teachers)=>{
//     //get first and last day as date object, to extract date and day
//     let year = new Date().getYear()+1900
//     let month = new Date().getMonth()+1
//     let days =new Date(year,month,0).getDate()
//     // let startDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-1`)
//     // let endDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-${days}`)
//     //create new booking array
//     teachers.forEach((teacher, i) => {
//         console.log(teacher.first,teacher.last)
//         if(teacher.online_schedule.length>0){
//           console.log('has shift')
//           console.log(year,month,days,new Date(year,month,i),new Date(year,month,i).getDay())
//
//           let bookings = []
//           teacher.online_schedule.forEach((shift, i) => {
//             //check if schedule is within start and end date
//             console.log(shift)
//             for(let i =1;i<days+1;i++){
//               let date = new Date(`${year}-${month}-${i}`)
//               if(date.getDay()==shift.day){
//                 //calculate number of slots based on shift length
//                 let shift_start = moment(date).set({h:shift.start_hour,m:shift.start_minute})
//                 let shift_end = moment(date).set({h:shift.end_hour,m:shift.end_minute})
//                 let shift_minutes = shift_end.diff(shift_start,'minutes')
//                 let loop = shift_minutes/30
//                 console.log('shift details',shift_start,'to',shift_end)
//                 for(let y=1;y<loop+1;y++){
//                   //add to booking array
//                   console.log('utc',moment.utc(shift_start).toDate())
//                   let object = {
//                     teacher:teacher._id,
//                     date: moment.utc(shift_start).toDate(),
//                     status:'draft'
//                   }
//                   bookings.push(object)
//                   console.log(object)
//                   // //need to track time in 30 min increments
//                   shift_start.add(30,'minutes')
//                   // console.log('after',shift_start)
//                 }
//                 //create bookings
//                 console.log('inserting',bookings.length,loop,'bookings')
//               }
//             }
//           });
//           Booking.insertMany(bookings).then(()=>{console.log(bookings.length,'added')}).catch((err)=>console.log('error:',err))
//         }
//     });
//   })
// })

// cron.schedule('*15 * * * *',()=>{
//   console.log('running temporary bookings')
//   let bookings=[
//     {
//       date:moment(new Date()).month(2).set({h:13,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:13,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:14,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:14,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:15,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:15,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:16,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:16,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:17,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:17,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:18,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:18,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:19,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:19,m:30})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:20,m:00})
//     },
//     {
//       date:moment(new Date()).month(2).set({h:20,m:30})
//     },
//   ]
//   Booking.insertMany(bookings).then(()=>{console.log(bookings.length,'added')}).catch((err)=>console.log('error:',err))
//
// })
// //converting draft bookings to live bookings
// cron.schedule('*/5 * * * *',()=>{
//   console.log('approving schedule')
//   Booking.updateMany({status:'draft'},
//                       {status:'available'}).then((bookings)=>{
//     console.log('approved',bookings)
//   }).catch((err)=>{console.log('schedule approval failed',err)})
// })

module.exports = router;
