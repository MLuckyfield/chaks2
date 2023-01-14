import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'

const TestProp = () => {

  //reschedule inputs
  const [new_date,setNew_date] = useState('')
  const [new_hour,setNew_hour] = useState('')
  const [new_minute,setNew_minute] = useState('')
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

          if(i<startingDay || count>target.getDate()){day_bookings['day']=' '}
          else{
            day_bookings['day']=count
            let today = new Date(`${year}-${month}-${i-startingDay}`)
            // let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              //if date of booking matches i create object and add to bookings
              if(today.getDate()==moment(booking.date).date()){
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
  const reschedule = (timeslot)=>{
    console.log('data',new_date,new_hour,new_minute)
    let new_slot = new Date(year,month-1,new_date)
    console.log('proposed',new_slot)
    new_slot.setHours(new_hour)
    new_slot.setMinutes(new_minute)
    console.log('adjusted',new_slot)
    axios.post('/booking/update',
      {
        filter: timeslot._id,
        data: {date:new_slot}
      })
      .then((res) => {
          window.location.reload();
          })
      .catch((err) => {
        console.log(err);
        });
  }
  const flagDelete = (timeslot)=>{
    axios.post('/booking/update',
      {
        filter: timeslot._id,
        data: {status:'delete'}
      })
      .then((res) => {
          window.location.reload();
          })
      .catch((err) => {
        console.log(err);
        });

  }
  return(
    <div class='col'>
      <div class='row'><button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button><h1>{month},{year}</h1><button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button></div>
      <div class='calendar'>
        <div class='labelBox border'>日</div>
        <div class='labelBox border'>月</div>
        <div class='labelBox border'>火</div>
        <div class='labelBox border'>水</div>
        <div class='labelBox border'>木</div>
        <div class='labelBox border'>金</div>
        <div class='labelBox border'>土</div>
        {bookings?bookings.map((item,i)=>{
          let today = new Date()
          console.log('currently',item)
          // console.log(today,moment(today).format('MM Do YY'),moment(new Date(year,month-1,item.day)).format('MM Do YY'))
          // manager bookings calendar
          if(user.role=='manager'){
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox border':'dayBox border inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      console.log('timeslot',timeslot)
                      return <Lesson title={`${timeslot.teacher.first} | ${displayTime(moment.tz(timeslot.date,'Asia/Tokyo')._a[3],moment.tz(timeslot.date,'Asia/Tokyo')._a[4])}`} num={y+5} active={timeslot.status} content={
                        <div>
                          <h2>{timeslot.teacher.first} {timeslot.teacher.last} | {displayTime(moment.tz(timeslot.date,'Asia/Tokyo')._a[3],moment.tz(timeslot.date,'Asia/Tokyo')._a[4])}</h2><br/>
                          <h3>{timeslot._id} <br/>{timeslot.date}<br/>{timeslot.status}</h3>
                          <form class='login' style={{width:'100%'}}>
                            <div class='row'>
                              <input onChange={e=>setNew_date(e.target.value)} value={new_date} class="form-control" type="number" placeholder='Date' required/>
                              <input onChange={e=>setNew_hour(e.target.value)} value={new_hour} class="form-control" type="number" placeholder='Hour' required/>
                              <input onChange={e=>setNew_minute(e.target.value)} value={new_minute} class="form-control" type="number" placeholder='Minute' required/>
                            </div>
                          </form>
                          <div class='row'>
                            <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();reschedule(timeslot)}}>Reschedule</div>
                            <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'red'}} onClick={(e)=>{e.preventDefault();flagDelete(timeslot)}}>Delete</div>
                          </div>
                        </div>
                      }/>
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
