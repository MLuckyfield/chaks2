import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Booking = ()=>{

  const [day, setDay]=useState(new Date())

  

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
          <div class='col'>
              <Calendar onChange={setDay} value={day}/>
          </div>
      </div>
  )
}

export default Booking;
