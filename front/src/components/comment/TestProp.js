import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()})
  const [days,setDays]=useState(()=>{let time = new Date(new Date().getYear(),new Date().getMonth(),0);return time.getDate()+1})
  const [bookings,setBookings]=useState()
  useEffect(()=>{
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(year,month,1),$lte:new Date(year,month,0)}}}})
      .then((res) => {
        let data = res.data.data
        console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(year,month,1).getDay()-1
        let endingDay = new Date(year,month,0).getDay()-1
        console.log(year,month,startingDay,endingDay,days)
        for(let i=0;i<days+(7-endingDay)+startingDay;i++){
          let day_bookings = {bookings:[]}
          if(i<startingDay || i>days){day_bookings['day']=' '}
          else{day_bookings['day']=i}
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
    <div class='row'>
    {bookings?bookings.map((item,i)=>{
      return <div class='dayBox border'>{item.day}</div>
    }):'Loading...'}

    </div>
)
}

export default TestProp;
