import React, {useState,useEffect} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import {axios} from "../../utilities/axios";
import moment from "moment"

const CalendarView = ()=>{

  const [day, setDay] = useState(new Date())
  const [bookings, setBookings]=useState()

  useEffect(()=>{
    axios.get('/booking/all', {params:{filter:{date:{$gte:moment(day).startOf('day'),$lte:moment(day).endOf('day')}}}})
      .then((res) => {
          setBookings(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[day])

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
          <div class='col'>
          <DateTimePicker onChange={setDay} value={day} format='MM-dd' maxDetail='minute' disableClock='true' minDate={new Date()}/>
              {bookings ? (bookings.map(function(item, i){
                  return (
                    <div class='col slim'>
                        <div class=''>{moment(item.date).format('dddd, MMM DD @ h:mm a')} | {item.student.first} {item.student.last}</div>
                    </div>
                  )

                })): 'No reservations. Get better at marketing! :)'}
          </div>
      </div>
  )
}

export default CalendarView;
