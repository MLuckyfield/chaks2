import React, {useState,useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {axios} from "../../utilities/axios";

const Booking = ()=>{

  const [day, setDay]=useState(new Date())
  const [msg,setMsg] = useState()

  const onSubmit=(e)=>{
    e.preventDefault();
    axios.post('/booking/new',
      {
        student: JSON.parse(localStorage.getItem('user'))._id,
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
  useEffect(()=>{

  },[])

  return (
    <div class='master-row'>
      <h1>Reservations</h1>
          <div class='col'>
              {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
              <form onSubmit={onSubmit}>
                  <div class="form-group row">
                    <input type="text" class="form-control" placeholder={`${day}`} disabled/>
                    <button type="submit" class="solid-first">Reserve!</button>
                  </div>

              </form>
              <Calendar onChange={setDay} value={day}/>
          </div>
      </div>
  )
}

export default Booking;
