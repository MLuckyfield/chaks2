import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Course from '../page/course'

const TestProp = () => {
  return (
      <div class='row'>
        <Course/>
      </div>
  )
}

export default TestProp;
