import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [day, setDay]=useState(new Date())
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})

  const updateView=(e)=>{
    setDay(e)
  }
  return(
    <div>
      <Calendar onChange={updateView} value={day} minDate={date}/>
    </div>
)
}

export default TestProp;
