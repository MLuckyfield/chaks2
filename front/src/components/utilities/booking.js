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
  const [available,setAvailable]=useState()
  const [student, setStudent]=useState(JSON.parse(localStorage.getItem('user'))._id)

  const onSubmit=(e)=>{
    e.preventDefault();
    if(moment(day).format('dddd')=='Monday'){
      setMsg(['Monday is a holiday.',false])
    }else{
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
  }
  const bookSlot=(item)=>{
      console.log(item.slot,item.teacher)
  }
  const updateView=(e)=>{
    setDay(e)
    axios.get('/booking/all', {params:{filter:{date:{$gte:day,$lte:moment(day).add(24,'hours')}}}})
      .then((res) => {
          let schedule = [{
            slot: moment('7-00','HH-MM'),
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
                {available?available.map(function(item,i){
                  return <div class='col slim feedback'>
                      <div class='' onClick={(item)=>{bookSlot(item)}}>{moment(item.slot).format('HH-MM')} {item.teacher}</div>
                  </div>
                }):''}
                  {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                    <form style={{width:'100%',border:'solid 1px black'}}>
                      <div class='form-group'>
                        <input type="text" class="form-control" placeholder={day?`${day}`:'Please pick a time'} disabled/>
                      </div>
                    </form>
                    <Calendar onChange={updateView} value={day}/>

                  <button onClick={onSubmit} class="solid-first">Reserve!</button>
          </div>
      </div>
  )
}

export default Booking;
