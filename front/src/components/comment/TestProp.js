import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Calendar from "../utilities/calendar";


const TestProp = () => {

  return(
    <div>
      <Booking/>
      <Calendar/>
    </div>
)
}

export default TestProp;
