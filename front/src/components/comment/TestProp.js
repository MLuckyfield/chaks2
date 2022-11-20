import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Booking from "../utilities/booking";
import Social from "../utilities/social";
import Calendar from 'react-calendar'



const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [days,setDays]=useState()

  useEffect(()=>{
    let current = new Date()
    let d = new Date(current.getYear(),current.getMonth()+1,0).getDate()
    //get all bookings for the month
    //create schedule array
    for(let i=0;i<d;i++){
      //add bookings to object and add to array

    }
  },[])
  const reset = ()=>{

  }
  return(
    <div class='row'>
      {month}
      <div class='col slim' style={{background:'#7ab5d1',color:'white'}}>
        <div class='col border' style={{alignItems:'flex-start',borderColor:'white'}}>
          <h1>CHATSHACKにようこそ！</h1>
          <h2>ご登録いただきありがとうございました！　では、これからどうやってあなたの英語力を向上させるのか？</h2>
          <br/><p>まずは、CHATSHACKの無料レッスンを受けてみてください！予約不要で、お客様の好きなタイミングでご来店いただけます。
            <br/>心よりお待ちしておりますので、緊張せずお気軽にお越しください。</p>
          <br/><p>また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
          (050 3395 1280)</p>
          <br/><p>インスタやYouTubeもやっていますので、お楽しみください！</p>
          <div calss='col'>
            <Social data={'tiny-logo'}/>
          </div>
        </div>
      </div>
    </div>
)
}

export default TestProp;
