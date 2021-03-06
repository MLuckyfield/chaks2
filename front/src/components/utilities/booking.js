import React, {useState,useEffect,useRef} from 'react'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import {metaTags} from '../seo'
import {axios} from "../../utilities/axios";
import moment from "moment"

const Booking = ()=>{

  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day, setDay]=useState(new Date())
  const [msg,setMsg] = useState()
  const [disable,setDisable] = useState(false)
  const [bookings, setBookings]=useState()
  const active = useRef()
  const [appointment,setAppointment]=useState(null)
  const [available,setAvailable]=useState()
  const [student, setStudent]=useState(JSON.parse(localStorage.getItem('user'))._id)
  // const [showPayment, setShowPayment]=useState(false)

  const onSubmit=(e)=>{
    if(appointment){
      e.preventDefault();
      setDisable(true)
      console.log('activating...')
      console.log(appointment)
      axios.post('/booking/new',{
          student:student,
          teacher:appointment.teacher,
          date:appointment.slot
      })
        .then((res) => {
            window.location.reload(true)
            // setMsg([res.data.message,res.data.success]);
            })
        .catch((err) => {
          setMsg([err.message,err.success]);
          // setFeedback(err.response.data.message);
          });
    }else{
      setMsg(['Please select a timeslot',false])
    }
  }
  const updateView=(e)=>{
    if(moment(e).format('dddd')=='Monday'){
      setMsg(['Monday is a holiday.',false])
    }else{
      setDay(e)
      // console.log(moment(e).startOf('day'))
             let schedule = [
               {
               slot: moment(e).startOf('day').add(7,'hours'),
               teacher:'Canadian',
               level:'中級-上級'
             },
             {
               slot: moment(e).startOf('day').add(7,'hours'),
               teacher:'Japanese',
               level:'初級-中級'
             },
             {
               slot: moment(e).startOf('day').add(8,'hours'),
               teacher:'Canadian',
               level:'中級-上級'

             },
             {
               slot: moment(e).startOf('day').add(8,'hours'),
               teacher:'Japanese',
               level:'初級-中級'

             },
             {
               slot: moment(e).startOf('day').add(9,'hours'),
               teacher:'Canadian',
               level:'中級-上級'

             },
             {
               slot: moment(e).startOf('day').add(9,'hours'),
               teacher:'Japanese',
               level:'初級-中級'

             }]
             bookings.forEach((booking, i) => {
                 schedule.forEach((slot, y) => {
                     let x = moment(booking.date).format('dddd, MMM DD @ h:mm a')
                     let z = moment(slot.slot).format('dddd, MMM DD @ h:mm a')
                     // console.log('analyzing...')
                     // console.log(booking)
                     // console.log(slot)
                     // console.log(x==z)
                     // console.log('booking teacher'+booking.teacher)
                     // console.log('schedule teacher'+slot.teacher)
                     // console.log('done...')

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

    }
  }
  const updateAppointment=(item)=>{
    setAppointment(available[item])
    console.log(item)
    console.log(available[item])
    console.log(appointment)
  }
  const prepBooking=(data)=>{
      if(moment(data).format('dddd')=='Monday'){
        setMsg(['Monday is a holiday.',false])
      }else{
        setDay(data)
      }
  }
  useEffect(()=>{
    axios.get('/booking/all', {params:{filter:{student:student,date:{$gte:new Date()}}}})
      .then((res) => {
          setBookings(res.data.data.reverse());
          if(bookings){console.log('activating updateView for initial render');updateView(date)}
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <div class='master-row'>
      <div class='col slim'>
      <h1>マンツーマン予約</h1>
            <div class='col'>
              <h2>予約状況 ({bookings?bookings.length:'0'})</h2>
              {bookings ? (bookings.map(function(item, i){
                  return (
                    <div class='col slim feedback'>
                        <div class=''>{moment(item.date).format('dddd, MMM DD @ h:mm a')} | TEACHER: {item.teacher}</div>
                    </div>
                  )
                })): '予約がありません。レッスンを予約しましょう :)'}<br/>
                <h2>新しいマンツーマン予約をする</h2><br/>
                    <Calendar onChange={updateView} value={day} minDate={date?date:new Date()}/>
                    {available?
                      available.length>0?
                      <select class='form-control' onChange={()=>{updateAppointment(active.current.value)}} ref={active}>
                        <option class='col slim feedback clickable'>予約可能枠 ({available.length})</option>
                        {available?available.map(function(item,i){
                          return <option class='col slim feedback clickable' value={i}>{moment(item.slot).format('MMMM Do, h:mm a')} | TEACHER: {item.teacher} ({item.level})</option>
                        }):''}
                      </select>
                      :()=>{setMsg('No Lessons Available',false);return ''}:'日付を指定してください！'}
                    {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                  {disable?'Loading, please wait...':<button onClick={onSubmit} class="solid-first">予約 {appointment?<span>{moment(appointment.slot).format('MMMM Do, h:mm a') } {appointment.teacher}</span>:''}</button>}

          </div>
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
