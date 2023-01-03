import React, { useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'
import Popup from '../utilities/popup'
import environment from '../../online_environment.jpg'
import points from '../../pic.png'
import fluency from '../../fluency.jpg'
import courses from '../../courses.jpg'
import discount from '../../discount.jpg'
import campaign from '../../campaign.jpg'

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
    <div class='fixed-row' style={{backgroundImage: 'url('+campaign+')',backgroundColor:'rgba(175,65,84,1)',color:'white'}}>
      <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0'}}>
        <div class='col w20'>
          <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>新年入会<br/>キャンペーン</span>
        </div>
        <div class='col w80 align'>
          <p>今なら</p>
          <h1>最大15%割引</h1>
          <p style={{marginBottom:'3%'}}>期間限定 1月3日~2月28日</p>
          <Popup button={"詳細"} num={1} content={
            <div class='col'>
                <h1 style={{margin:'10% 0'}}>最大15%割引</h1>
                <p>４時間以上でご契約されるお客様には以下の割引が適用されます!</p>
                <div class='col'>
                    <div class='fixed-row'>
                        <div class='col align'>
                          <h2>新年入会</h2>
                          <ul>
                            <li>４時間以上：５％割引</li>
                            <li>８時間以上：１０％割引</li>
                            <li>１２時間以上：１５％割引</li>
                          </ul>
                        </div>
                    </div>
                    <div class='fixed-row'>
                        <div class='col align'>
                          <h2>学生限定</h2>
                          <p>さらに！！学生様には追加で１０％割引が適用されます！</p>
                        </div>
                    </div>
                </div>
            </div>
          }/>
          </div>
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
                      サブスクスタイル!<br/>
                      コーヒー・紅茶込み
                  </span>
                  <Popup button={"割引でお得!"} num={4} content={
                    <div class='col'>
                        <div class='col'>
                            <div class='fixed-row' style={{alignItems:'flex-start'}}>
                                <div class='col align'>
                                  <h2 style={{marginBottom:'5%'}}>講師陣が英会話レベルを４項目で評価！</h2>
                                  <img style={{width:'100%'}} src={fluency}></img>
                                  <p></p>
                                </div>
                            </div>
                            <div class='fixed-row'>
                                <div class='col align'>
                                  <h2 style={{marginBottom:'5%'}}>ガイドコース</h2>
                                  <img style={{width:'100%'}} src={courses}></img>
                                  <p>学習したい英文法を設定して使うことで講師が間違いを直してくれるガイドコースも利用可能！</p>
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
