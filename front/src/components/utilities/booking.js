import React, {useState,useEffect,useRef} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
// import Payment from './payment'
import {axios} from "../../utilities/axios";
import moment from "moment"

const Booking = ()=>{

  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day, setDay]=useState(new Date())
  const [msg,setMsg] = useState()
  const appointment = useRef()
  const [bookings, setBookings]=useState()
  // const [appointment,setAppointment]=useState()
  const [available,setAvailable]=useState()
  const [student, setStudent]=useState(JSON.parse(localStorage.getItem('user'))._id)
  // const [showPayment, setShowPayment]=useState(false)

  const onSubmit=(e)=>{
    e.preventDefault();
    console.log('activating...')
    // setShowPayment(true)
    // window.location.href='https://book.stripe.com/test_7sIg1z0jC1iI7EkcMM'
    axios.post('/booking/new',{
        student:student,
        teacher:appointment.teacher,
        date:appointment.slot
    })
      .then((res) => {
          console.log(res.data.data)
          window.location.reload(true)
          // setMsg([res.data.message,res.data.success]);
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
      console.log(moment(e).startOf('day'))
        axios.get('/booking/all', {params:{filter:{date:{$gte:e,$lte:moment(e).add(24,'hours')}}}})
          .then((res) => {
              console.log('length '+res.data.data.length)
              // console.log(res.data.data)
              let schedule = [{
                slot: moment(e).startOf('day').add(7,'hours'),
                teacher:'Canadian',
                level:'Intermediate-Advanced'
              },
              {
                slot: moment(e).startOf('day').add(7,'hours'),
                teacher:'Japanese',
                level:'Beginner-Intermediate'
              },
              {
                slot: moment(e).startOf('day').add(8,'hours'),
                teacher:'Canadian',
                level:'Intermediate-Advanced'

              },
              {
                slot: moment(e).startOf('day').add(8,'hours'),
                teacher:'Japanese',
                level:'Beginner-Intermediate'

              },
              {
                slot: moment(e).startOf('day').add(9,'hours'),
                teacher:'Canadian',
                level:'Intermediate-Advanced'

              },
              {
                slot: moment(e).startOf('day').add(9,'hours'),
                teacher:'Japanese',
                level:'Beginner-Intermediate'

              }]
              res.data.data.forEach((booking, i) => {
                  schedule.forEach((slot, y) => {
                  //   console.log(booking)
                  //   console.log(booking.date)
                      let x = moment(booking.date).format('dddd, MMM DD @ h:mm a')
                      let z = moment(slot.slot).format('dddd, MMM DD @ h:mm a')
                      console.log(x)
                      console.log(z)
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
  // const updateAppointment=(item)=>{
  //   setAppointment(item)
  //   console.log(item)
  // }
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
      <div class='col slim'>
      <h1>Reservations</h1>
            <div class='col'>
              {bookings ? (bookings.map(function(item, i){
                  return (
                    <div class='col slim feedback'>
                        <div class=''>{moment(item.date).format('dddd, MMM DD @ h:mm a')} {item.teacher}</div>
                    </div>
                  )
                })): 'No reservations. Why not make one? :)'}
                    <Calendar onChange={updateView} value={day} minDate={date?date:new Date()}/>
                    <select class='form-control' ref={appointment}>

                      {available?available.map(function(item,i){
                        return <option class='col slim feedback clickable' value={available[i]}>{moment(item.slot).format('MMMM Do, h:mm a')} | <strong>TEACHER:</strong>{item.teacher} ({item.level})</option>

                      }):<option>No timeslots available!</option>}
                    </select>
                  <button onClick={onSubmit} class="solid-first">Reserve {appointment?()=>{console.log(appointment);return moment(appointment.slot).format('MMMM Do, h:mm a') + ' '+appointment.teacher;}:''}</button>
          </div>
          {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
      </div>
    </div>
  )
}
// activeStartDate={date?date:new Date()}
// <form style={{width:'100%',border:'solid 1px black'}}>
//   <div class='form-group'>
//     <input type="text" class="form-control" placeholder={day?`${day}`:'Please pick a time'} disabled/>
//   </div>
// </form>
// {showPayment?
//   <div class='col'>
//   <Payment appointment={appointment} product={'private_lesson'}/>
//   <a onClick={()=>setShowPayment(false)} href="#">Cancel</a>
//   </div>
//       :'Set an appointment'}
export default Booking;
