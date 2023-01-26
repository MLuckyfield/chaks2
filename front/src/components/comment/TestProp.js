import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'

const TestProp = () => {


  //calendar display inputs
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    let target = new Date(year,month,0)
    console.log('searching from', new Date(`${year}-${month}-1`),new Date(`${year}-${month}-${target.getDate()}`))
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{date:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${target.getDate()}`)}}}})
      .then((res) => {
        let data = res.data.data
        // console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(`${year}-${month}-1`).getDay()
        let endingDay = target.getDay()
        let count = 1
        for(let i=0;i<(days+startingDay+(6-endingDay));i++){
          let day_bookings = {bookings:[]}
          // console.log(i,year,month,target,count,startingDay,endingDay)
//
          if(i<startingDay || count>target.getDate()){day_bookings['day']=' '}
          else{
            day_bookings['day']=count
            let today = new Date(`${year}-${month}-${i-startingDay}`)
            // let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              booking.date=moment.utc(booking.date)
              //if date of booking matches i create object and add to bookings
              // console.log('match?',today.getDate(),booking.date.date(),today.getDate()==booking.date.date())
              if(day_bookings.day==booking.date.date()){
                booking.date=moment.utc(booking.date).toDate()
                console.log('matching',day_bookings.day,booking,booking.date)
                day_bookings.bookings.push(booking)
              }
            });
            count++
          }
          bookings.push(day_bookings)
        }
        console.log('ready',bookings)
        setBookings(bookings)
      })
      .catch((err) => {
        console.log('calendar err',err);
        // setFeedback(err.response.data.message);
        });

  },[month])
  const displayTime =(hour,minute)=>{
    if(minute=='0'){minute='00'}
    return `${hour}:${minute}`
  }
  // const reschedule = (timeslot)=>{
  //   console.log('data',new_date,new_hour,new_minute)
  //   let new_slot = new Date(year,month-1,new_date)
  //   console.log('proposed',new_slot)
  //   new_slot.setHours(new_hour)
  //   new_slot.setMinutes(new_minute)
  //   console.log('adjusted',new_slot)
  //   axios.post('/booking/update',
  //     {
  //       filter: timeslot._id,
  //       data: {date:new_slot}
  //     })
  //     .then((res) => {
  //         window.location.reload();
  //         })
  //     .catch((err) => {
  //       console.log(err);
  //       });
  // }
  // const flagDelete = (timeslot)=>{
  //   axios.post('/booking/update',
  //     {
  //       filter: timeslot._id,
  //       data: {status:'delete'}
  //     })
  //     .then((res) => {
  //         window.location.reload();
  //         })
  //     .catch((err) => {
  //       console.log(err);
  //       });
  //
  // }
  return(
    <div class='col'>
      <div class='row'><button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button><h1>{month},{year}</h1><button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button></div>
      <div class='calendar'>
        <div class='labelBox  '>日</div>
        <div class='labelBox  '>月</div>
        <div class='labelBox  '>火</div>
        <div class='labelBox  '>水</div>
        <div class='labelBox  '>木</div>
        <div class='labelBox  '>金</div>
        <div class='labelBox  '>土</div>
        {bookings?bookings.map((item,i)=>{
          let today = new Date()
          // console.log(today,moment(today).format('MM Do YY'),moment(new Date(year,month-1,item.day)).format('MM Do YY'))
          // manager bookings calendar
          if(user.role=='manager'){
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox':'dayBox inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'tomato'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      return <Lesson title={`${timeslot.teacher.first} | ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} content={timeslot}/>
                    })}
                   </div>)
          }
          else if (user.first=='student') {
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox':'dayBox inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'tomato'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      return <Lesson title={`${timeslot.teacher.first} | ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} content={timeslot}/>
                    })}
                   </div>)
          }
          //user booking calendar
          else{
            return <div></div>
          }
        }):'Loading...'}
      </div>
    </div>
)
}

export default TestProp;
