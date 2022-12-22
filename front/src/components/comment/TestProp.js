import React, { useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'
import Popup from '../utilities/popup'
import environment from '../../online_environment.jpg'
import points from '../../pic.png'
import discount from '../../discount.jpg'

const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    let target = new Date(year,month,0)
    console.log('searching from', new Date(`${year}-${month}-1`),new Date(`${year}-${month}-${target.getDate()}`))
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${target.getDate()}`)}}}})
      .then((res) => {
        let data = res.data.data
        // console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(`${year}-${month}-1`).getDay()
        let endingDay = target.getDay()
        let count = 1
        for(let i=0;i<(days+startingDay+(6-endingDay));i++){
          let day_bookings = {bookings:[]}
          // console.log(i,year,month,target,count,startingDay,endingDay)

          if(i<startingDay || count>target.getDate()){day_bookings['day']=' '}
          else{
            day_bookings['day']=count
            let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              //if date of booking matches i create object and add to bookings
              console.log(i)
              if(today.getDate()==moment(booking.date).date()){
                day_bookings.bookings.push(booking)
              }
            });
            count++
          }
          bookings.push(day_bookings)
        }
        console.log('ready',bookings)
        setBookings(bookings)
      })
      .catch((err) => {
        console.log('calendar err',err);
        // setFeedback(err.response.data.message);
        });

  },[month])

  return(
    <div class='col'>
    <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
      <div class='mini_overlay col' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',color:'black'}}>
        <div class='col border'>
            <h1 style={{margin:'10% 0'}}>楽しむ方法は簡単</h1>
            <div class='row center align'>
                    <div class='col'>
                      <span class="custom_icon">1</span>
                      <p>予約不要の無料レッスンを</p>
                      <h2>気軽に体験!</h2>
                    </div>
                    <div class='col'>
                      <span class="custom_icon">2</span>
                      <p>月に通いたい時間を決めて</p>
                      <h2>サブスク登録!</h2>
                    </div>
                    <div class='col'>
                      <span class="custom_icon">3</span>
                      <p>好きな時にご来店</p>
                      <h2>習慣化を図ろう！</h2>
                    </div>
            </div>
        </div>
      </div>
    </div>
    <div class='fixed-row'>
        <div class='col w20'>
          <span>新年入会<br/>キャンペーン</span>
        </div>
        <div class='col w80 align'>
          <h1>最大15%割引</h1>
        </div>
    </div>
    <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover',backgroundPosition:'center'}}>
      <div class='mini_overlay yellow'>
          <div class='col' style={{width:'70%',alignItems:'normal'}}>
                  <h1 class='emphasize' style={{textAlign:'left'}}>1時間<br/>0円!</h1>
                  <h1 style={{textAlign:'left'}}>初回無料</h1>
                  <h2 style={{textAlign:'left'}}>気軽に来てください!</h2>
                  <span style={{fontSize:'20px',border:'1px solid white',padding:'1% 3%',margin:'3% 0% 5% 0%',width:'max-content'}}>
                      通常料金: 30分￥1000<br/>
                      サブスクスタイル!
                  </span>
                  <Popup button={"お得になる方法が２"} num={4} content={
                    <div class='col'>
                        <h1 style={{margin:'10% 0'}}>2 discounts!</h1>
                        <div class='col'>
                            <div class='fixed-row'>
                                <div class='col w20'>
                                  <span class='custom_icon'>5%</span>
                                </div>
                                <div class='col w80 align'>
                                  <h2>友達紹介</h2>
                                  <p>友達を紹介すると両方が５％割引</p>
                                </div>
                            </div>
                            <div class='fixed-row'>
                                <div class='col w20'>
                                  <span class='custom_icon'>10%</span>
                                </div>
                                <div class='col w80 align'>
                                  <h2>学生限定</h2>
                                  <p>学生の方が１０％割引</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  }/>
          </div>
      </div>
    </div>
    <div style={{backgroundImage: 'url('+points+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>test</div>
      <div class='row'><button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button><h1>{month},{year}</h1><button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button></div>
      <div class='calendar'>
        <div class='labelBox border'>日</div>
        <div class='labelBox border'>月</div>
        <div class='labelBox border'>火</div>
        <div class='labelBox border'>水</div>
        <div class='labelBox border'>木</div>
        <div class='labelBox border'>金</div>
        <div class='labelBox border'>土</div>
        {bookings?bookings.map((item,i)=>{
          let today = new Date()
          console.log(today,moment(today).format('MM Do YY'),moment(new Date(year,month-1,item.day)).format('MM Do YY'))
          // manager bookings calendar
          if(user.role=='manager'){
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox border':'dayBox border inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      console.log(moment.tz(timeslot.date,'Asia/Taipei'),moment.tz(timeslot.date,'JST'))
                      let temp = new Date(timeslot.date)
                      return <Lesson title={`${timeslot.teacher.first} | ${moment.tz(timeslot.date,'Asia/Taipei')._a[3]}:${moment.tz(timeslot.date,'Asia/Taipei')._a[4]}`} num={y+5} active={timeslot.status} content={
                        <div>
                          {timeslot.teacher.first} {timeslot.teacher.last}<br/>
                          {moment.tz(timeslot.date,'JST').format('HH:MM')} | {timeslot.status}
                        </div>
                      }/>
                    })}
                   </div>)
          }
          //user booking calendar
          else{
            return <div></div>
          }
        }):'Loading...'}
      </div>
    </div>
)
}

export default TestProp;
