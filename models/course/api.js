const router = require('express').Router();
const Course = require('./model')
const User = require('../user/model')
const jwt = require('jsonwebtoken')
const auth= require('../../services/authentication');
const email = require('../../services/email')
const cron = require('node-cron')
const moment = require ('moment-timezone')

//Create
router.post('/new',auth.auth, auth.permission(['manager']),async (req, res) => {
  req=req.body

  try{
    await new Course({
      ...req
    }).save()
      .then(()=>{
        return res.status(201).json({
          message: `Success!`,
          success: true
        });
      })
  }
 catch(err){
   console.log('Course creation failed',err)
   return res.status(500).json({
     message: `user creation unsuccessful: ${err}`,
     success: false
   });
  }
});
// //Delete
router.post('/delete', async (req, res) => {
  await Course.deleteOne(req.body.filter)
      .then(()=>{
        return res.status(201).json({
          message: 'Course saved',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Course creation unsuccessful: ${err}`,
          success: false
        });
      })

});
// //update
router.post('/update',auth.auth, auth.permission(['manager']),async (req,res)=>{
  await Course.findOneAndUpdate(req.body.filter,req.body.data)
      .then(()=>{
        return res.status(201).json({
          message: 'Course updated',
          success: true
        });
      })
      .catch((err)=>{
        return res.status(500).json({
          message: `Course failed to update: ${err}`,
          success: false
        });
      })
})

//Get
router.get('/all', auth.permission(['user','manager']),async (req, res) => {
  console.log('pulling courses',req.query)
  let data = await Course.find(JSON.parse(req.query.filter))
  return res.status(201).json({
    data: data,
    message: 'Course saved',
    success: true
  });
});

//converting base schedule to Course timeslots
// cron.schedule('*/15 * * * *',()=>{
//   console.log('running Courses')
//   User.find({role:'teacher',online_schedule:{$exists:true}}).then((teachers)=>{
//     //get first and last day as date object, to extract date and day
//     let year = new Date().getYear()+1900
//     let month = new Date().getMonth()+1
//     let days =new Date(year,month,0).getDate()
//     // let startDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-1`)
//     // let endDate = new Date(`${new Date().getYear()+1900}-${new Date().getMonth()+1}-${days}`)
//     //create new Course array
//     teachers.forEach((teacher, i) => {
//         console.log(teacher.first,teacher.last)
//         if(teacher.online_schedule.length>0){
//           console.log('has shift')
//           console.log(year,month,days,new Date(year,month,i),new Date(year,month,i).getDay())
//
//           let Courses = []
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
//                   //add to Course array
//                   console.log('utc',moment.utc(shift_start).toDate())
//                   let object = {
//                     teacher:teacher._id,
//                     date: moment.utc(shift_start).toDate(),
//                     status:'draft'
//                   }
//                   Courses.push(object)
//                   console.log(object)
//                   // //need to track time in 30 min increments
//                   shift_start.add(30,'minutes')
//                   // console.log('after',shift_start)
//                 }
//                 //create Courses
//                 console.log('inserting',Courses.length,loop,'Courses')
//               }
//             }
//           });
//
//
//           Course.insertMany(Courses).then(()=>{console.log(Courses.length,'added')}).catch((err)=>console.log('error:',err))
//         }
//     });
//   })
// })

// //converting draft Courses to live Courses
cron.schedule('*/6 * * * *',()=>{
  console.log('approving schedule')
  Course.find({createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${days}`)}}).then((Courses)=>{
    console.log('will approve',Courses)
    Course.updateMany(Course,{status:'final'}).then(()=>{console.log('schedule approved')})
  })
})

module.exports = router;
