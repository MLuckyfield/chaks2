import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [days,setDays]=useState()

  useEffect(()=>{
    let current = new Date()
    let d = new Date(current.getYear(),current.getMonth()+1,0).getDate()
    //get all bookings for the month
    //create schedule array
    for(let i=0;i<d;i++){
      //add bookings to object and add to array
    }
  },[])
  const reset = ()=>{

  }
  return(
    <div class='row'>
      {month}

    </div>
)
}

export default TestProp;
