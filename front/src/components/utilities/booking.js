import React, {useState,useEffect} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import {axios} from "../../utilities/axios";
import moment from "moment"

const Booking = ()=>{

  const [day, setDay]=useState(new Date())
  const [msg,setMsg] = useState()
  const [bookings, setBookings]=useState()
  const [student, setStudent]=useState(JSON.parse(localStorage.getItem('user'))._id)

  const onSubmit=(e)=>{
    e.preventDefault();
    axios.post('/booking/new',
      {
        student: student,
        date: day,
      })
      .then((res) => {
          setMsg([res.data.message,res.data.success]);
          })
      .catch((err) => {
        setMsg([err.message,err.success]);
        // setFeedback(err.response.data.message);
        });
  }
  const prepBooking=(data)=>{
    setDay(data.slice(0,-12))
  }
  useEffect(()=>{
    axios.get('/booking/all', {params:{filter:student}})
      .then((res) => {
          setBookings(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
          <div class='col'>
              {bookings ? (bookings.map(function(item, i){
                  return (
                    <div class='col slim feedback'>
                        <div class=''>{moment(item.date).format('MM-DD, h:mm')}</div>
                    </div>
                  )

                })): 'No reservations. Why not make one? :)'}
              <form class='login' onSubmit={onSubmit}>
                  <div class="form-group">
                  {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                    <input type="text" class="form-control" placeholder={day?`${day}`:'Please pick a time'} disabled/>
                    <DateTimePicker onChange={prepBooking} value={day} format='MM-dd h:mm' maxDetail='minute' disableClock='true' minDate={new Date()}/>
                  </div>
                  <button type="submit" class="solid-first">Reserve!</button>
              </form>
          </div>
      </div>
  )
}

export default Booking;
