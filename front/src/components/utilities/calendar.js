import React, {useState} from 'react'
import Calendar from 'react-calendar'

const Booking = ()=>{

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
          <div class='col'>
              <Calendar/>
          </div>
      </div>
  )
}

export default Booking;
