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
    console.log(moment(day+' '+appointment.slot))
    console.log(appointment.teacher)
    // if(moment(day).format('dddd')=='Monday'){
    //   setMsg(['Monday is a holiday.',false])
    // }else{
    //   axios.post('/booking/new',
    //     {
    //       student: student,
    //       date: day,
    //     })
    //     .then((res) => {
    //         setMsg([res.data.message,res.data.success]);
    //         })
    //     .catch((err) => {
    //       setMsg([err.message,err.success]);
    //       // setFeedback(err.response.data.message);
    //       });
    // }
  }
  const updateView=(e)=>{
    setDay(e)
    axios.get('/booking/all', {params:{filter:{date:{$gte:day,$lte:moment(day).add(24,'hours')}}}})
      .then((res) => {
          let schedule = [{
            slot: moment('07:00').format('','HH:mm'),
            teacher:'Canadian'
          }]
          console.log(schedule)
          setAvailable(schedule);
        })
      .catch(error => console.log("error"+error))
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
                        <div class=''>{moment(item.date).format('dddd, MMM DD @ h:mm a')}</div>
                    </div>
                  )
                })): 'No reservations. Why not make one? :)'}
                  {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                    <Calendar onChange={updateView} value={day}/>
                    {available?available.map(function(item,i){
                      return <div class='col slim feedback' onClick={(item)=>{setAppointment(item)}}>
                          <div class=''>{moment(day+item.slot).format('dddd','HH-MM')} {item.teacher}</div>
                      </div>
                    }):''}
                  <button onClick={onSubmit} class="solid-first">Reserve!</button>
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
