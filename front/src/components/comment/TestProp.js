import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})


  return(
    <div class='row'>
      {month}
    </div>
)
}

export default TestProp;
