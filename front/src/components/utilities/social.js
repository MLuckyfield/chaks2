import React, {useState,useEffect} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import {axios} from "../../utilities/axios";
import moment from "moment"

const Social = (props)=>{

  return (
    <div class='fixed-row'>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://instagram.com/chatshack/'} src={instagram} alt="English education and event information!"></img></div>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://twitter.com/CHATSHACK_Tokyo'} src={twitter} alt="Newest event and schedule information here!"></img></div>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://www.youtube.com/channel/UCjGUSfvKKj72blxyqusTRRg'} src={youtube} alt="English entertainment!"></img></div>
    </div>
  )
}

export default Social;
