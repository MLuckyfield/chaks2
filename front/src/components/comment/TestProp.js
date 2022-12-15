import React, { useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'
import ReactPlayer from 'react-player/youtube'
import banner from '../../banner.jpg'

moment.tz.setDefault('Asia/Tokyo')


const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    console.log('looping')
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${days}`)}}}})
      .then((res) => {
        let data = res.data.data
        console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        const startingDay = new Date(`${year}-${month}-1`).getDay()
        const endingDay = new Date(`${year}-${month}-${days}`).getDay()
        for(let i=0;i<(days+startingDay+(6-endingDay));i++){
          console.log(i)
          let day_bookings = {bookings:[]}
          if(i<startingDay || i>days+startingDay-2){day_bookings['day']=' '}
          else{
            if(i==startingDay){
              day_bookings['day']=1
            }else{
              day_bookings['day']=i-startingDay+1
            }
            let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              //if date of booking matches i create object and add to bookings
              console.log(i)
              if(today.getDate()==moment(booking.date).date()){
                day_bookings.bookings.push(booking)
              }
            });
          }
          bookings.push(day_bookings)
        }
        console.log('ready',bookings)
        setBookings(bookings)
      })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });

  },[month])

  return(
    <div class='col'>
    <ReactPlayer
        url='https://www.youtube.com/watch?v=qgLZwUiLfAs'
        playing={true} volume={0} muted={true} width={'100%'} height={'60vh'}
        playIcon={
          <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center'}}>
            <div class='col'>
              <h1>The best ever</h1>
              <button style={{width:'50%',color:'white',backgroundColor:'black'}}>Watch Now</button>
            </div>
          </div>
        } light={banner}/>
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
          console.log(new Date(year,month,item.day),today,new Date(year,month,item.day)==today)
          //manager bookings calendar
          if(user.role=='manager'){
            return (<div class={item.day>=today.getDate()?'dayBox border':'dayBox border inactive'}>
                    {new Date(year,month,item.day)==today?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      return <Lesson title={`${timeslot.teacher.first} | ${moment.tz(timeslot.date).format('HH:MM')}`} num={y+5} active={timeslot.status} content={
                        <div>
                          {timeslot.teacher.first} {timeslot.teacher.last}<br/>
                          {moment.tz(timeslot.date).format('HH:MM')} | {timeslot.status}
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
