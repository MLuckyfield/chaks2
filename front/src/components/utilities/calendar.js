import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from './lesson'

const Calendar = () => {

  //new timeslot
  const new_month = useRef('')
  const new_date = useRef('')
  const new_hour = useRef('')
  const new_minute = useRef('')

  //calendar display inputs
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})

//general
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  //reservation options
  const [options,setOptions]=useState()
  const createNewTime=()=>{
    axios.post('/booking/create',
    {
      month:new_month.current.value,
      date:new_date.current.value,
      hour:new_hour.current.value,
      minute:new_minute.current.value,
    }).then(()=>{
      window.location.reload()
    }).catch((err)=>console.log(err))
  }
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
            data.forEach((booking, i) => {
              booking.date=moment.utc(booking.date)
              //if date of booking matches i create object and add to bookings
              if(day_bookings.day==booking.date.date()){
                booking.date=moment.utc(booking.date).toDate()
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

        //load resevation options to send as props to Lesson
        if(user.role=='user'){
          axios.get('/enrolled/all',{params:{filter:{student:user._id,delivery:'online private'}}})
          .then((res) => {
              res.data.data.push(
                {course:{name:'Free Talk'}},
                {course:{name:'Proof Reading'}})
              console.log('options',res.data.data)
              setOptions(res.data.data)
              })
          .catch((err) => {
            console.log(err);
            });}
  },[month])
  const displayTime =(hour,minute)=>{
    if(minute=='0'){minute='00'}
    return `${hour}:${minute}`
  }
  return(
    <div class='col'>
      {user.role=='manager'?
      <div class='row'>
          <button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button>
          <h1>{month},{year}</h1>
          <button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button>
          {user.role!='user'?
          <Popup button={"Create"} num={1} content={
            <form class='make_blog' onSubmit={createNewTime}>
              <h2>New Timeslot</h2>
                  <div class="form-group make_blog">
                    Month
                    <input ref={new_month} type="text" class="form-control" required/>
                  </div>
                  <div class="form-group make_blog">
                    Date
                    <input ref={new_date} type="text" class="form-control"/>
                  </div>
                  <div class="form-group make_blog">
                    Hour
                    <input ref={new_hour} type="text" class="form-control"/>
                  </div>
                  <div class="form-group make_blog">
                    Minute
                    <input ref={new_minute} type="text" class="form-control"/>
                  </div>
                  <button type="submit" class="solid-first">Submit</button>
              </form>
          }/>:''}
      </div>:
      <div class='row'>
          <h1>{month},{year}</h1>
      </div>}
      <div class='calendar'>
        <div class='labelBox'>日</div>
        <div class='labelBox'>月</div>
        <div class='labelBox'>火</div>
        <div class='labelBox'>水</div>
        <div class='labelBox'>木</div>
        <div class='labelBox'>金</div>
        <div class='labelBox'>土</div>
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
                      if(timeslot.status=='available'){
                        return <Lesson title={`${timeslot.teacher.first} | ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} options={options} content={timeslot}/>
                      }else{
                        if(timeslot.student){
                          if(Object.values(timeslot.student).includes(user._id)){
                            return <Lesson title={`${timeslot.teacher.first} | ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} options={options} content={timeslot}/>

                          }
                        }
                      }
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

export default Calendar;
