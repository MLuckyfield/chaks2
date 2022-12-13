import React, { useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Popup from '../utilities/popup'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  useEffect(()=>{
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${days}`)}}}})
      .then((res) => {
        let data = res.data.data
        console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        const startingDay = new Date(`${year}-${month}-1`).getDay()
        const endingDay = new Date(`${year}-${month}-${days}`).getDay()
        console.log(year,month,startingDay,endingDay,days)
        for(let i=0;i<days+startingDay+(6-endingDay);i++){
          let day_bookings = {bookings:[]}
          if(i<startingDay || i>days+startingDay){day_bookings['day']=' '}
          else{
            day_bookings['day']=i-(7-startingDay)
            let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              //if date of booking matches i create object and add to bookings
              console.log(today,today.getDay(),booking.date,moment(booking.date),moment(booking.date).day())
              if(today.getDay()==moment(booking.date).day()){
                day_bookings.bookings.push(booking)
              }
            });
          }
          bookings.push(day_bookings)          
        }
        console.log('ready',bookings)
        setBookings(bookings)
      })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });

  },[])
  return(
    <div class='col'>
      <h1>{month},{year}</h1>
      <div class='calendar'>
        <div class='labelBox border'>日</div>
        <div class='labelBox border'>月</div>
        <div class='labelBox border'>火</div>
        <div class='labelBox border'>水</div>
        <div class='labelBox border'>木</div>
        <div class='labelBox border'>金</div>
        <div class='labelBox border'>土</div>
        {bookings?bookings.map((item,i)=>{
          return (<div class={item.day>=new Date().getDate()?'dayBox border':'dayBox border inactive'}>
                  {item.day==new Date().getDate()?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                  {item.bookings.map((timeslot,i)=>{
                    return <Popup title={`${timeslot.teacher.first} ${timeslot.teacher.last} | ${moment(timeslot.date).format('HH:MM')}`} num={5} content={
                      <div>
                        予約されたレッスンについては返金いたしかねますのでご了承ください。ただ、予約後のレッスン時間の変更は可能です。時間変更をご希望の方はお手数ですが、下記電話番号にお問い合わせください。050-3395-1289
                      </div>
                    }/>
                  })}
                 </div>)
        }):'Loading...'}
      </div>
    </div>
)
}

export default TestProp;
