import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from './lesson'
import Popup from '../utilities/popup'
import Accordion from '../utilities/accordion'

const Calendar = () => {

  //new timeslot
  const new_month = useRef('')
  const new_date = useRef('')
  const new_hour = useRef('')
  const new_minute = useRef('')

  //calendar display inputs
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})

//general
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  //reservation options
  const [options,setOptions]=useState()
  const createNewTime=()=>{
    axios.post('/booking/create',
    {
      month:new_month.current.value,
      date:new_date.current.value,
      hour:new_hour.current.value,
      minute:new_minute.current.value,
    }).then(()=>{
      window.location.reload()
    }).catch((err)=>console.log(err))
  }
  useEffect(()=>{
    let target = new Date(year,month,0)
    console.log('searching from', new Date(year,month,new Date().getDate()),new Date(year,month,target.getDate()),target)
    //get all bookings for the month
    // axios.get('/booking/all',{params:{filter:{date:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${target.getDate()}`)}}}})
    axios.get('/booking/all',{params:{filter:{date:{$gte:new Date(year,month,1),$lte:new Date(year,month,target.getDate())}}}})
      .then((res) => {
        let data = res.data.data
        // console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(year,month,1).getDay()
        let endingDay = target.getDay()
        let count = 1
        for(let i=0;i<(days+startingDay+(6-endingDay));i++){
          let day_bookings = {bookings:[]}
          // console.log(i,year,month,target,count,startingDay,endingDay)
//
          if(i<startingDay || count>target.getDate()){day_bookings['day']=' '}
          else{
            day_bookings['day']=count
            data.forEach((booking, i) => {
              booking.date=moment.utc(booking.date)
              //if date of booking matches i create object and add to bookings
              if(day_bookings.day==booking.date.date()){
                booking.date=moment.utc(booking.date).toDate()
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

        //load resevation options to send as props to Lesson
        if(user.role=='user'){
          axios.get('/enrolled/all',{params:{filter:{student:user._id,'delivery.$':{channel:'online private'}}}})
          .then((res) => {
              res.data.data.push(
                {course:{name:'自由会話: 講師と自由なトピックで会話をお楽しみいただけます'}},
                {course:{name:'校正: 英文の書類やメールなどを講師と一緒に添削できます'}})
              console.log('options',res.data.data)
              setOptions(res.data.data)
              })
          .catch((err) => {
            console.log(err);
            });}
  },[month])
  const displayTime =(hour,minute)=>{
    if(minute=='0'){minute='00'}
    return `${hour}:${minute}`
  }

  return(
    <div class='col'>
      {user.role=='manager'?
      <div class='row'>
          <button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button>
          <h1>{month+1},{year}</h1>
          <button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button>
      </div>:
      <div class='col'>
          <h1>ONLINE PRIVATE</h1>
          <h2>{month+1},{year}</h2>
          {user?<div class='col border'>
                  <h2>コースとは</h2>
                  <p>毎週決まった日時に決まったテーマを中心にレッスンをいたします！日時はコースによって違いますので、以下よりご確認ください！</p>
                  <h2>楽しむ方法は簡単!</h2>
                  <p>
                    <br/>1. 受講したいコースの "申し込み" をクリックし、受講規約をご確認の上、決済を完了してください!
                    <br/>2. 当日に、オンライングループの場合は、レッスン開始の１０分前、ZOOMリンクをクリック！グループの場合は、レッスン開始の１０分前、ご来店をお願い致します！
                  </p>
          </div>:''}
          {user.points.length<2?
            <span style={{border:'1px solid red',color:'red',padding:'2%',width:'fit-content'}}>You need more points!</span>
            :''}
      </div>}
      <div class='row'>
        <div class='col'>
          <div class='fixed-row'>
            <div class='timeslot' style={{backgroundColor:'#89CFF0'}}>予約可能</div>
            <div class='timeslot' style={{backgroundColor:'lime'}}>予約済み</div>
          </div>
        </div>
        <div class='col'>
          {user.role=='manager'||user.role=='teacher'?
          <Popup button={"Create"} num={1} content={
            <form class='make_blog' onSubmit={createNewTime}>
              <h2>New Timeslot</h2>
                  <div class="form-group make_blog">
                    Month
                    <input ref={new_month} type="text" class="form-control" required/>
                  </div>
                  <div class="form-group make_blog">
                    Date
                    <input ref={new_date} type="text" class="form-control"/>
                  </div>
                  <div class="form-group make_blog">
                    Hour
                    <input ref={new_hour} type="text" class="form-control"/>
                  </div>
                  <div class="form-group make_blog">
                    Minute
                    <input ref={new_minute} type="text" class="form-control"/>
                  </div>
                  <button type="submit" class="solid-first">Submit</button>
              </form>
          }/>:
          <div class='fixed-row'>
            <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='https://us9.list-manage.com/survey?u=803e460f5dec6935e2fc8e187&id=b6aaf771a8&attribution=false'}}>FEEDBACK</div>
            <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='#faq'}}>FAQ</div>
          </div>
          }
        </div>
      </div>
      <div class='calendar'>
        <div class='labelBox'>日</div>
        <div class='labelBox'>月</div>
        <div class='labelBox'>火</div>
        <div class='labelBox'>水</div>
        <div class='labelBox'>木</div>
        <div class='labelBox'>金</div>
        <div class='labelBox'>土</div>
        {bookings?bookings.map((item,i)=>{
          let today = new Date()
          // console.log(today,moment(today).format('MM Do YY'),moment(new Date(year,month-1,item.day)).format('MM Do YY'))
          // manager bookings calendar
          if(user.role=='manager'){
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox':'dayBox inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'tomato'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      console.log('date is',y,timeslot._id,timeslot.date)
                      return <Lesson title={`${timeslot.teacher?timeslot.teacher.first:''}  ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} content={timeslot}/>
                    })}
                   </div>)
          }
          else if (user.role=='user') {
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox':'dayBox inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'tomato'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      if(timeslot.status=='available'){
                        return <Lesson title={`${timeslot.teacher?timeslot.teacher.first:''} ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} options={options} content={timeslot}/>
                      }else{
                        if(timeslot.student){
                          if(Object.values(timeslot.student).includes(user._id)){
                            return <Lesson title={`${timeslot.teacher?timeslot.teacher.first:''} ${displayTime(timeslot.date.hour(),timeslot.date.minute())}`} num={timeslot.date} time={displayTime(timeslot.date.hour(),timeslot.date.minute())} options={options} content={timeslot}/>

                          }
                        }
                      }
                    })}
                   </div>)
          }
          //user booking calendar
          else{
            return <div></div>
          }
        }):'Loading...'}
      </div>
      <Accordion id='faq' title={'FAQ'} accordionData={[{
        title: 'レッスンの予約はどのように行いますか？',
        content: `まずは無料登録をしていただきポイントの購入をお願いいたします。ポイント購入後にレッスン予約ページより予約が可能となります。なお、オンラインレッスンの予約には２ポイント必要になりますので、ご承知おきください。`,
      },
      {
      title: 'レッスンは何日前に予約しなければなりませんか？',
      content: `レッスンは2日前までに予約をしてください。`,
      },
      {
      title: '予約のキャンセルは可能ですか？',
      content: ` レッスンの48時間前までキャンセルは可能です。キャンセルの際にはお手数ですがCHATSHACKまでお電話いただきますようよろしくお願いいたします。`,
      },
      {
      title: 'レッスンの内容は何ですか？',
      content: `レッスンは基本的に自由会話型のレッスンとなりますが、コースをご購入いただいた場合にはそのコースをマンツーマンにて受講することが可能になります。`,
      }]}/>
    </div>
)
}

export default Calendar;
