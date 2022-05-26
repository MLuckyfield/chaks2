import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Booking = ()=>{

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
              <Calendar/>
      </div>
  )
}

export default Booking;
