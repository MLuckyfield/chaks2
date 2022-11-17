import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from 'react-calendar'



const TestProp = () => {

  return(
    <div>
      <Calendar value={new Date()} minDate={new Date()}/>
    </div>
)
}

export default TestProp;
