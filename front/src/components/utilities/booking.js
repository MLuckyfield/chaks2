import React, {useState,useEffect} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import {axios} from "../../utilities/axios";
import moment from "moment"

const Booking = ()=>{

  const [day, setDay]=useState(new Date())
  const [msg,setMsg] = useState()
  const [bookings, setBookings]=useState()
  const [appointment,setAppointment]=useState()
  const [available,setAvailable]=useState()
  const [student, setStudent]=useState(JSON.parse(localStorage.getItem('user'))._id)

  const onSubmit=(e)=>{
    e.preventDefault();
    axios.post('/booking/new',
    {
      teacher:appointment.teacher,
      student: student,
      date: appointment.slot,
    }
      )
      .then((res) => {
          setMsg([res.data.message,res.data.success]);
          })
      .catch((err) => {
        setMsg([err.message,err.success]);
        // setFeedback(err.response.data.message);
        });
  }
  const updateView=(e)=>{
    if(moment(e).format('dddd')=='Monday'){
      setMsg(['Monday is a holiday.',false])
    }else{
      setDay(e)
        axios.get('/booking/all', {params:{filter:{date:{$gte:day,$lte:moment(day).add(24,'hours')}}}})
          .then((res) => {
              console.log('length '+res.data.data.length)
              let schedule = [{
                slot: moment(e).add(7,'hours'),
                teacher:'Canadian'
              },
              {
                slot: moment(e).add(7,'hours'),
                teacher:'Japanese'
              },
              {
                slot: moment(e).add(8,'hours'),
                teacher:'Canadian'
              },
              {
                slot: moment(e).add(8,'hours'),
                teacher:'Japanese'
              },
              {
                slot: moment(e).add(9,'hours'),
                teacher:'Canadian'
              },
              {
                slot: moment(e).add(9,'hours'),
                teacher:'Japanese'
              }]
              res.data.data.forEach((booking, i) => {
                  schedule.forEach((slot, y) => {
                  //   console.log(booking)
                  //   console.log(booking.date)
                      let x = moment(booking.date).format('dddd, MMM DD @ h:mm a')
                      let z = moment(slot.slot).format('dddd, MMM DD @ h:mm a')
                      // console.log(x)
                      // console.log(z)
                      console.log(x==z)
                      // console.log('booking teacher'+booking.teacher)
                      // console.log('schedule teacher'+slot.teacher)

                      if (x==z){
                        if(booking.teacher==slot.teacher){
                          console.log('removing')
                          console.log(slot)
                          schedule.splice(y,1)
                        }
                      }
                  });
              });
              setAvailable(schedule);
            })
          .catch(error => console.log("error"+error))
    }
  }
  const updateAppointment=(item)=>{
    setAppointment(item)
    console.log(item)
  }
  const prepBooking=(data)=>{
      if(moment(data).format('dddd')=='Monday'){
        setMsg(['Monday is a holiday.',false])
      }else{
        setDay(data)
      }
  }
  useEffect(()=>{
    axios.get('/booking/all', {params:{filter:{student:student}}})
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
                        <div class=''>{moment(item.date).format('dddd, MMM DD @ h:mm a')} {item.teacher}</div>
                    </div>
                  )
                })): 'No reservations. Why not make one? :)'}
                  {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                    <Calendar onChange={updateView} value={day} />
                    {available?available.map(function(item,i){
                      return <div class='col slim feedback' onClick={(item)=>{updateAppointment(available[i])}}>
                          <div class=''>{moment(item.slot).format('MMMM Do, h:mm a')} {item.teacher}</div>
                      </div>
                    }):''}
                  <button onClick={onSubmit} class="solid-first">Reserve {appointment?moment(appointment.slot).format('MMMM Do, h:mm a') + ' '+appointment.teacher:''}</button>
          </div>
      </div>
  )
}
// <form style={{width:'100%',border:'solid 1px black'}}>
//   <div class='form-group'>
//     <input type="text" class="form-control" placeholder={day?`${day}`:'Please pick a time'} disabled/>
//   </div>
// </form>
export default Booking;
