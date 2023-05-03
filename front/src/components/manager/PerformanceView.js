import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"

const PerformanceView = ()=>{
  //calendar display inputs
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month+1,0);return time.getDate()})

//general
  const [sessionsData,setSessionsData]=useState()
  const [weeklySummary,setWeeklySummary] =useState()
  const [totalTrials,setTotalTrials]=useState()
  const [totalRepeats,setTotalRepeats]=useState()
  useEffect(()=>{
    let target = new Date(year,month,0)
    axios.get('/comment/allSessions',{params:{filter:{createdAt:{$gte:new Date(year,month,1),$lte:new Date(year,month,target.getDate())}}}})
      .then((res) => {
        let data = res.data.data
        //SET UP
        //variables for plotting on calendar
        let sessionsForMonth = []
        let startingDay = new Date(year,month,1).getDay()
        let endingDay = target.getDay()
        let count = 1
        //variables for weekly summary
        let fedToWeeklySummary=false
        let weeklySessions = {'0':[],'1':[],'2':[],'3':[],'4':[],'5':[],'6':[]};
        //variables for monthly
        let trials=0
        let repeats=0
        //CODE
        //determine number of days in month and loop through number of days
        for(let i=0;i<(days+startingDay);i++){
          let sessionsForDay = {repeats:0,trials:0}
          //if day box should not be displayed
          if(i<startingDay || count>target.getDate()){sessionsForDay['day']=''}
          //if day box should be displayed
          else{
            sessionsForDay['day']=count
            //loop through all sessionsForDay for the month
            data.forEach((session, i) => {
              session.createdAt=moment.utc(session.createdAt)

              //if date of current session is same as calendar
              if(sessionsForDay.day==session.createdAt.date()){
                if(session.student!=null){
                  //add to trials if student.createdAt is the same as calender day
                  if(moment.utc(session.student.createdAt).date()==sessionsForDay.day){
                    sessionsForDay.trials++
                    trials++
                    //add to weeklySummary
                    if(fedToWeeklySummary==false){
                      weeklySessions[session.createdAt.day()].push({session:session,trial:true})
                    }
                  }//add to repeats if student.createdAt is not equal to calendar day
                  else{
                    sessionsForDay.repeats++//add to weeklySummary
                    repeats++
                    if(fedToWeeklySummary==false){
                      weeklySessions[session.createdAt.day()].push({session:session,trial:false})
                    }
                  }
                }

              }
            });
            count++
          }
          //add sessions for the day to sessions for the Month
          sessionsForMonth.push(sessionsForDay)
          }
        //update state with monthly sessions
        setSessionsData(sessionsForMonth)
        setWeeklySummary(weeklySessions)
        setTotalTrials(trials)
        setTotalRepeats(repeats)
        console.log(weeklySessions)
      })
      .catch((err) => {
        console.log('calendar err',err);
        // setFeedback(err.response.data.message);
        });
  },[])

  return (
    <div class='col'>
      <h1>{month+1},{year}</h1>
      (Trials: {totalTrials} | Repeats: {totalRepeats})
      <div class='calendar'>
        <div class='labelBox'>日</div>
        <div class='labelBox'>月</div>
        <div class='labelBox'>火</div>
        <div class='labelBox'>水</div>
        <div class='labelBox'>木</div>
        <div class='labelBox'>金</div>
        <div class='labelBox'>土</div>
        {sessionsData?sessionsData.map((session,i)=>{
          let today = new Date()

          return <div class='dayBox'>
                    {moment(new Date(year,month-1,session.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'tomato'}}>{session.day}</span>:<span class='day_tag'>{session.day}</span>}
                    {session.day?
                      <div class='fixed-row'>
                          <span style={{fontWeight:'bold',fontSize:'1.5em',color:'black',marginRight:'5%'}}>{session.repeats}</span>
                          <span style={{fontWeight:'bold',fontSize:'1.5em',color:'red',marginRight:'5%'}}>{session.trials}</span>
                      </div>:''}

                 </div>
        }):'Loading...'}
      </div>
      <h2>Day of Week Totals</h2>
      <div class='calendar'>
        <div class='labelBox'>日</div>
        <div class='labelBox'>月</div>
        <div class='labelBox'>火</div>
        <div class='labelBox'>水</div>
        <div class='labelBox'>木</div>
        <div class='labelBox'>金</div>
        <div class='labelBox'>土</div>
        {weeklySummary?Object.keys(weeklySummary).map((eachDay,i)=>{
          let trials = 0
          let repeats = 0
          weeklySummary[eachDay].forEach((session, i) => {
            session.trial?trials++:repeats++
          });
          return <div class='dayBox' style={{alignItems:'center'}}>
                      <span style={{fontWeight:'bold',fontSize:'1.5em',color:'red',marginRight:'5%'}}>{trials}</span>
                      <span style={{fontWeight:'bold',fontSize:'1.5em',color:'black',marginRight:'5%'}}>{repeats}</span>
                      <hr style={{border:'1px solid tomato',width:'80%',margin:'0'}}/>
                      <span style={{fontWeight:'bold',fontSize:'1.5em',color:'black',marginRight:'5%'}}>{repeats+trials}</span>
                      <span style={{fontWeight:'bold',fontSize:'1em',color:'black',marginRight:'5%'}}>({((repeats+trials)/(totalTrials+totalRepeats)*100).toFixed(2)}%)</span>
                 </div>
        }):'Loading...'}
      </div>
    </div>
  )
}
export default PerformanceView
