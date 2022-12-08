import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [days,setDays]=useState(()=>{let time = new Date(new Date().getYear(),new Date().getMonth(),0);return time.getDate()+1})

  useEffect(()=>{
    let current = new Date()
    let d = new Date(current.getYear(),current.getMonth()+1,0).getDate()
    //get all bookings for the month
    //create schedule array
    for(let i=0;i<d;i++){
      //add bookings to object and add to array
    }
  },[])
  const buildCalendar = ()=>{
    let startingDay = new Date().getDay()
    let endingDay = new Date(new Date().getYear(),new Date().getMonth(),0).getDate()+1
    console.log(startingDay,endingDay)
    for(let i=1;i<days+(6-endingDay)+startingDay;i++){
      return <div class='dayBox'>{i}</div>
    }
  }
  return(
    <div class='row'>
    {month}
    {day.toString()}
      {days.toString()}
      {()=>{
        let startingDay = new Date().getDay()
        let endingDay = new Date(new Date().getYear(),new Date().getMonth(),0).getDate()+1
        console.log(startingDay,endingDay)
        for(let i=1;i<days+(6-endingDay)+startingDay;i++){
          return <div class='dayBox'>{i}</div>
        }
      }}

    </div>
)
}

export default TestProp;
