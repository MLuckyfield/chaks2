import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from './lesson'
import Popup from '../utilities/popup'
import Accordion from '../utilities/accordion'
import {setTrialHour} from '../../utilities/actions'
import {useDispatch, useSelector} from 'react-redux'
const DateTimePicker = (props) => {

  //new timeslot
  const hour = useRef('')
  const [timeslots,setTimeslots] =useState([11,12,13,14,15,16,17,18,19,20])
  const [weekend_timeslots,setWeekendTimeslots] =useState([13,14,15,16,17,18,19,20])
  //calendar display inputs
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month+1,0);return time.getDate()})

//general
  const [showContent,setShowContent]=useState(false)
  const [daysInMonth,setDaysInMonth]=useState()
  const dispatch = useDispatch()
  const selectedHour = useSelector(state=>state.hour)

  useEffect(()=>{
    let target = new Date(year,month,0)
    // console.log('calendarDays retrieved:',data)
    const daysInMonthData = []
    //create schedule array
    let startingDay = new Date(year,month,1).getDay()
    let endingDay = target.getDay()
    let count = 1
    console.log('recieve data',year,month,days,startingDay,endingDay)
    console.log('daysInMonthData',daysInMonthData)
    let day = {date:''}
    for(let i=1;i<(days+startingDay+1);i++){
      let date = i<=startingDay || i>days+startingDay+1?'':i-startingDay
      daysInMonthData.push({date:date,day:new Date(year,month,date).getDay()})
      // console.log(i,count,daysInMonthData)
    }
    console.log('ready',daysInMonthData)
    setDaysInMonth(daysInMonthData)
  },[month])

  return(
    <div class='col'>
      <div class='popup'>
        <div class="modal col">
          <h1>{month+1}月{year}</h1>
          <h2>日を選択してください</h2>
          <div class='calendar'>
            <div class='labelBox'>日</div>
            <div class='labelBox'>月</div>
            <div class='labelBox'>火</div>
            <div class='labelBox'>水</div>
            <div class='labelBox'>木</div>
            <div class='labelBox'>金</div>
            <div class='labelBox'>土</div>
            {daysInMonth?daysInMonth.map((day,i)=>{
              let today = new Date()
              if(day.day==1){//to disable for holidays add '|| day.date==HOLIDAY_DATE'
                return <div class='dayBox disabled'>
                        <span class='day_tag' style={day.date==today.getDate()?{color:'white',backgroundColor:'tomato'}:{}}>{day.date}</span>
                       </div>
              }
              else if(day.date>=today.getDate()){
                return <div class='dayBox clickable' onClick={()=>{localStorage.setItem('day',day.day);localStorage.setItem('date',day.date);localStorage.setItem('month',month+1);localStorage.setItem('year',year);setShowContent(true)}}>
                        <span class='day_tag' style={day.date==today.getDate()?{color:'white',backgroundColor:'tomato'}:{}}>{day.date}</span>
                       </div>
                   }
              else{
                 return <div class='dayBox disabled'>
                         <span class='day_tag' style={day.date==today.getDate()?{color:'white',backgroundColor:'tomato'}:{}}>{day.date}</span>
                        </div>
                   }
            }):'Loading...'}
          </div>
          <br/>
          <div class='col'>
            <p>月曜日は定休日となります。<br/>
            11時～20時の間で予約時間を選択してください。</p>
            <button class='form-control outline-first' style={{width:'20%'}} onClick={(e)=>{e.preventDefault();props.closeFunction();}} class="solid-first">戻る</button>
          </div>
        </div>
      </div>
      {showContent?
        <div class="popup">
            <div class='col' style={{width:'fit-content',minWidth:'350px',backgroundColor:'white',display:'flex'}}>
                <h1>{localStorage.getItem('month')}月 {localStorage.getItem('date')}日</h1>
                時間を選択してください
                {moment().date()==localStorage.getItem('day') && moment().hour()>21?
                '21時以降は予約を受け付けておりません。':
                <div class='fixed-row'>
                  <select class='form-control' ref={hour} style={{maxWidth:'100px'}}required>
                  //logic for determining which timeslots are available
                  //if weekend
                  {localStorage.getItem('day')==0||localStorage.getItem('day')==6?(
                    moment().date()==localStorage.getItem('day')?//if selected day is today, show slots from next hour
                        weekend_timeslots.map((item,i)=>{
                          if(item>moment().hour()){
                            return <option value={item}>{item}</option>
                          }
                      }):
                      weekend_timeslots.map((item,i)=>{
                        console.log(item,i)
                          return <option value={item}>{item}</option>
                    })
                  ):(//if weekday
                    moment().date()==localStorage.getItem('day')?//if selected day is today, show slots from next hour
                        timeslots.map((item,i)=>{
                          if(item>moment().hour()){
                            return <option value={item}>{item}</option>
                          }
                      }):
                      timeslots.map((item,i)=>{
                        console.log(item,i)
                          return <option value={item}>{item}</option>
                    })
                  )

                  }
                  </select>
                  <span>時から</span>
                </div>}
                <div class='fixed-row'>
                  <button class='form-control outline-first' style={{width:'30%'}} onClick={(e)=>{e.preventDefault();setShowContent(false);}} class="solid-first">戻る</button>
                  {moment().day()==localStorage.getItem('day') && moment().hour()>21?'':<button class='form-control outline-first' style={{width:'100%',margin:'1%'}} onClick={(e)=>{e.preventDefault();localStorage.setItem('hour',hour.current.value);setShowContent(false);props.closeFunction()}} class="solid-first">決定</button>}
                </div>
            </div>
        </div>
        :''}
    </div>
)
}

export default DateTimePicker;
