
import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"

const Lesson = (props)=>{

  //reschedule inputs
  const [new_date,setNew_date] = useState('')
  const [new_hour,setNew_hour] = useState('')
  const [new_minute,setNew_minute] = useState('')

  //calendar display inputs
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  useEffect(()=>{
    console.log('recieved',props.content)
  },[])
  const displayTime =(hour,minute)=>{
    if(minute=='0'){minute='00'}
    return `${hour}:${minute}`
  }
  const reschedule = (content)=>{
    console.log('data',new_date,new_hour,new_minute)
    let new_slot = new Date(year,month-1,new_date)
    console.log('original',content.date)

    console.log('proposed',new_slot)
    new_slot.setHours(new_hour)
    new_slot.setMinutes(new_minute)
    console.log('adjusted',new_slot)
    // axios.post('/booking/update',
    //   {
    //     filter: content._id,
    //     data: {date:new_slot}
    //   })
    //   .then((res) => {
    //       window.location.reload();
    //       })
    //   .catch((err) => {
    //     console.log(err);
    //     });
  }
  const flagDelete = (content)=>{
    axios.post('/booking/update',
      {
        filter: content._id,
        data: {status:'delete'}
      })
      .then((res) => {
          window.location.reload();
          })
      .catch((err) => {
        console.log(err);
        });

  }

  return (
    <div class="pop" style={{textAlign:'center',width:'100% '}}>
      <label for={props.num}><div class='lesson' style={props.content.status=='final'?{backgroundColor:'#89CFF0'}:(props.content.status=='booked'?{backgroundColor:'red'}:{backgroundColor:'grey'})}>{props.title}</div></label>
      <input class='prompt' type="checkbox" id={props.num} />
      <div class="modal">
        <div class="modal__inner">

          <div>
            <h2>{props.content.teacher.first} {props.content.teacher.last} | {displayTime(moment.tz(props.content.date,'Asia/Tokyo')._a[3],moment.tz(props.content.date,'Asia/Tokyo')._a[4])}</h2><br/>
            <h3>{props.content._id} {props.content.date} {props.content.status}</h3>
            <form class='login' style={{width:'100%'}}>
              <div class='row'>
                <input onChange={e=>setNew_date(e.target.value)} value={new_date} class="form-control" type="number" placeholder='Date' required/>
                <input onChange={e=>setNew_hour(e.target.value)} value={new_hour} class="form-control" type="number" placeholder='Hour' required/>
                <input onChange={e=>setNew_minute(e.target.value)} value={new_minute} class="form-control" type="number" placeholder='Minute' required/>
              </div>
            </form>
            <div class='row'>
              <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();reschedule(props.content)}}>Reschedule</div>
              <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'red'}} onClick={(e)=>{e.preventDefault();flagDelete(props.content)}}>Delete</div>
            </div>
          </div>

                    <label class="btn-close" for={props.num}>X</label>

        </div>
      </div>
    </div>
  )
}

export default Lesson;

// CHATSHACK(以下「当社」)では、お預かりした個人情報について、以下のとおり適正かつ安全に管理・運用することに努めます。
// <br/>
// <p>１．利用目的
// 当社は、収集した個人情報について、以下の目的のために利用いたします。
// ①サービス実施、およびアフターサービスのため
// ②相談・お問い合わせへの回答のため
// ③商品・サービス・イベントの案内のため</p>
// <br/>
// <p>２．第三者提供
// 当社は、以下の場合を除いて、個人データを第三者へ提供することはしません。
// ①法令に基づく場合
// ②人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合
// ③公衆衛生の向上・児童の健全な育成のために必要で、本人から同意を得ることが難しい場合
// ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合</p>
// <br/>
// <p>３．開示請求
// 貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。</p>
