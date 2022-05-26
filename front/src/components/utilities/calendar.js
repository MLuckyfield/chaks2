import React, {useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {axios} from "../../utilities/axios";
import moment from "moment"

const CalendarView = ()=>{

  const [day, setDay] = useState()
  const [bookings, setBookings]=useState()

  useEffect(()=>{
    axios.get('/booking/all', {params:{fields:'date'}})
      .then((res) => {
          setBookings(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <Calendar onChange={setDay} value={day} tileContent={({date, view})=>{if(view==='month'){if(bookings.find(dDate=>isSameDay(dDate,date))){return date}}}}/>
  )
}

export default CalendarView;
