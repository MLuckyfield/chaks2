import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  useEffect(()=>{
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(year,month,1),$lte:new Date(year,month,0)}}}})
      .then((res) => {
        let data = res.data.data
        console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(`${year}-${month}-1`).getDay()
        let endingDay = new Date(`${year}-${month}-${days}`).getDay()
        console.log(year,month,startingDay,endingDay,days)
        for(let i=0;i<days+startingDay+(6-endingDay);i++){
          let day_bookings = {bookings:[]}
          if(i<startingDay || i>days+startingDay){day_bookings['day']=' '}
          else{day_bookings['day']=i-(7-startingDay)}
          data.forEach((booking, i) => {
            //if date of booking matches i create object and add to bookings
            day_bookings.bookings.push({booking})
          });
          bookings.push(day_bookings)
        }
        setBookings(bookings)
      })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });

  },[])
  return(
    <div class='col'>
      <h1>{month},{year}</h1>
      <div class='calendar'>
        <div class='dayBox'>日</div>
        <div class='dayBox'>月</div>
        <div class='dayBox'>火</div>
        <div class='dayBox'>水</div>
        <div class='dayBox'>木</div>
        <div class='dayBox'>金</div>
        <div class='dayBox'>土</div>
        {bookings?bookings.map((item,i)=>{
          return (<div class={item.day>new Date().getDate()?'dayBox border':'dayBox border inactive'}>
                  {item.day==new Date().getDate()?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                 </div>)
        }):'Loading...'}
      </div>
    </div>
)
}

export default TestProp;
