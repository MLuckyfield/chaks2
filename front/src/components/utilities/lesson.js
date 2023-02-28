
import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";

const Lesson = (props)=>{

  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  //reschedule inputs
  const [new_date,setNew_date] = useState('')
  const [new_hour,setNew_hour] = useState('')
  const [new_minute,setNew_minute] = useState('')

  //calendar display inputs
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})

  //reservation options
  const option = useRef('')

  const reschedule = (content)=>{
    console.log('data',new Date(year,month-1,new_date))
    axios.post('/booking/reschedule',
      {
        filter: {_id:content._id},
        data: {year:year,month:month-1,date:new_date,hour:new_hour,minute:new_minute}
      })
      .then(() => {
          window.location.reload();
          })
      .catch((err) => {
        console.log(err.response.data.message);
        });
  }
  const reserve=(content)=>{
    axios.post('/booking/reserve',
      {
        filter: {_id:content._id},
        data: {status:'reserved',student:user._id,request:option.current.value}
      })
      .then(() => {
          window.location.reload();
          })
      .catch((err) => {
        console.log('failed',err);
        });
  }
  const flagDelete = (content)=>{
    axios.post('/booking/delete',
      {
        filter: {_id:content._id}
      })
      .then(() => {
          window.location.reload();
          })
      .catch((err) => {
        console.log(err);
        });

  }

  return (
    <div class="pop" style={{textAlign:'center',width:'100% '}}>
      <label for={props.num}><div class='timeslot' style={props.content.status=='available'?{backgroundColor:'#89CFF0'}:(props.content.status=='reserved'?{backgroundColor:'lime'}:{backgroundColor:'#D3d3d3'})}>{props.title}</div></label>
      <input class='prompt' type="checkbox" id={props.num} />
      <div class="modal">
        <div class="modal__inner">
        {user.role=='manager'?
          <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
            <h1>TEACHER{props.content.teacher?`${props.content.teacher.first} ${props.content.teacher.last} |`:''}</h1>
            <h2>{props.time}</h2>
            <h2 style={{size:'13px'}}>{props.num.format('M/D, dddd')}</h2>
            <span style={{border:'1px solid black',padding:'2%',width:'fit-content',fontSize:'13px',fontWeight:'800'}}>{props.content.status.toUpperCase()}</span>
            <h3>{props.content.student?`${props.content.student.first} ${props.content.student.last}`:''}</h3>
            <p>{props.content._id}</p>
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
        :
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
          <h1>{props.content.teacher?`${props.content.teacher.first} ${props.content.teacher.last} |`:'予約'}</h1>
          <h2>{props.time}</h2>
          <h2 style={{fontSize:'1em'}}>{props.num.format('M/D, dddd')}</h2>
          <span style={{border:'1px solid black',padding:'2%',width:'fit-content',fontSize:'13px',fontWeight:'800'}}>{props.content.status.toUpperCase()}</span>
          {props.content.student?
            props.content.student._id==user._id?
            <div>You are signed up!<div class="btn" style={{position:'relative'}} onClick={(e)=>{e.preventDefault();window.location='https://us05web.zoom.us/j/7973308497?pwd=MXZ4UDF4V0FMaFNDU3pQR1FwZnV0UT09'}}>Join Now</div></div>  :`${props.content.student.first} ${props.content.student.last}`
            :<div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <select class='form-control' style={{width:'100%'}} ref={option}>
                  {props.options?props.options.map((item,i)=>{
                    console.log('options recieved',item)
                    return <option value={item.course.name}>{item.course.name}</option>
                  }):''}
                </select>
                {console.log('points',props.points)}
                {props.points<2?
                  <span style={{border:'1px solid red',color:'red',padding:'2%',width:'fit-content'}}>ポイントが足りません！</span>
                  :
                <div class="btn" style={{position:'relative',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();reserve(props.content)}}>予約 (2ポイント)</div>}
             </div>}
        </div>
      }
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
