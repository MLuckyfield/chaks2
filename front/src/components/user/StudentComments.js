import React, { useEffect, useRef,useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import Popup from "../utilities/popup";
import Social from "../utilities/social";
import moment from "moment"
import {getCurrentUser, checkPermission} from '../../utilities/helpers'
import * as constants from '../../utilities/constants'
import {io} from 'socket.io-client';
const socket = io();


const StudentComments = () => {

  const points = useRef('');
  const [user,setUser] = useState(getCurrentUser())
  const [comments, setComments] = useState(null);
  const [source,setSource] =useState()
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return user}
  })
  useEffect(() => {
    socket.on('updateDash',(id)=>{
      axios.get('user/all',{params:{filter:{_id: id}}})
        .then((result)=>{setTarget(result.data.data[0])})
    })
    axios.get('/comment/all', {params:{filter:target._id}})
      .then((res) => {
          setComments(res.data.data.reverse());
        })
        .catch(error => console.log("error"+error.data.message))

  },[])

  const clockin=(status)=>{
    if(status){
      let popup = document.getElementById("teacher_select");
      popup.style.display = 'block';
    }
    // console.log('will send '+JSON.stringify(target))
    axios.get('/user/clock', {params:{filter:target._id,data:status}})
      .then((res) => {
          // console.log(res.data.data);
          setTarget(res.data.data)
          localStorage.setItem(source,JSON.stringify(res.data.data))
          // if(status==true){setPayable(null)}
          // else{setPayable(res.data.data.statistics[0])}
          // let start =moment(res.data.data.statistics[0].start)
          // let end = moment(res.data.data.statistics[0].end)
          // const time = end.diff(start, 'minutes')
          // let billable = 0
          // if(time-40>0){billable=time-40}
          // billable = (Math.round(billable/30)*1000)+1000
          // console.log('Billable time is',billable,start,end)
          res=res.data.display
          socket.emit('clock',target._id,false)//send directly withou tback
          if(!status){alert('Billable: '+res.billable+' |Unpaid: '+res.unpaid+' |Remaining: '+res.remaining)}
        })
      .catch(error => console.log("error"+error))
  }
  const sendTo=(id)=>{
    let params = {filter:{_id: id},data:{'$push':{students:target._id}}}
    console.log(id,params)
    axios.post('user/update',params)
      .then((result)=>{
         console.log(result)
         let popup = document.getElementById("teacher_select");
         popup.style.display = 'none';
         socket.emit('sendstudent',target,id)
         socket.emit('clock',target._id,true)//send directly withou tback
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  }
  //<button onClick={()=>sendTo('6344faac6bf36a9debe60b25')} class='button'>TEST</button>
const adjustPoints = (add)=>{
  let changes = []
  for(let i =0;i<points.current.value;i++){
    changes.push({
      value:30
    })
  }
  axios.post('user/update',{filter:{_id:target._id},data:{'$push':{points:changes}}})
    .then((result)=>{
       window.location.reload()
    })
    .catch(error=>console.log('From sendTo teacher:',error))
}


  return(
    <div class='col'>
        {user.role=='manager'?
        <div class='row border'>
          <Popup button={"Points"} num={1} content={
            <form class='make_blog'>
              <h2>Adjust Points</h2>
              <input ref={points} type="number" min='1' class="form-control" placeholder='Enter number of points' required/>
              <div class='fixed-row'>
                <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();adjustPoints()}}>+</div>
              </div>
            </form>
          }/>
          <div class='col'><button onClick={target.inClass?()=>clockin(false):()=>clockin(true)} style={target.inClass?{backgroundColor:'red',width:'80%'}:{backgroundColor:'blue',width:'80%'}}>{target.inClass?'End':'Start'}</button></div>
        </div>
        :''}
        {checkPermission(user.role,constants.TEACHER)?<div class='col'><Comment/></div>:''}
      <div id='teacher_select'>
        <button onClick={()=>sendTo('62fb3ed3bc7766179393b277')} class='button'>Vincent</button>
        <button onClick={()=>sendTo('63882dbd8a0031a501d54140')} class='button'>Radka</button>
        <button onClick={()=>sendTo('640d4ff6470b0e234739c640')} class='button'>Liza</button>
        <button onClick={()=>sendTo('64327746ee94db5a26b715c0')} class='button'>Mimmi</button>
        <button onClick={()=>sendTo('6432522fee94db5a26b6291b')} class='button'>Momo</button>
        <button onClick={()=>sendTo('641129d948fed7fcee0cf312')} class='button'>Futaba</button>
        <button onClick={()=>sendTo('628f3e7b8981f84051396159')} class='button'>Shunsuke</button>
      </div>
      <h1>Feedback ({comments?comments.length:'0'})</h1>
      <div class='col'>
          {comments ? (
            comments.length>0?
            (comments.map(function(item, i){
                return (
                  <div class='col feedback'>
                      <div class=''>{item.comment}</div>
                      <div class=''>{item.author.first} {item.author.last}</div>
                      <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                  </div>
                )
                    })): (
                      <div class='col slim' style={{background:'#89cff0',color:'white'}}>
                        <div class='col border' style={{borderColor:'white',display:'block'}}>
                          <h1>CHATSHACKにようこそ！</h1><br/>
                          ご登録いただきありがとうございました！　CHATSHACKでは、オフラインレッスンだけではなくオンラインレッスンやコースなど様々な方法で英語力の向上のお手伝いをしています！
                          <br/><p>まずは、無料の体験レッスンを受けてみてください！予約不要で、お客様の好きなタイミングでご来店いただけます。
                            心よりお待ちしておりますので、緊張せずお気軽にお越しください。</p>
                          <p>また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
                            (050 3395 1280)</p>
                            <p>インスタやYouTubeもやっていますので、お楽しみください！</p>
                          <div calss='col'>
                            <Social data={'tiny-logo'}/>
                          </div>
                        </div>
                      </div>)
          ):
          <div class='col slim' style={{background:'#89cff0',color:'white'}}>
            <div class='col border' style={{borderColor:'white',display:'block'}}>
              <h1>CHATSHACKにようこそ！</h1><br/>
              ご登録いただきありがとうございました！
CHATSHACKのオンラインレッスンは優れた講師とのマンツーマンです！
まずは、体験レッスンをお電話にて予約してください！（(050-3395-1280）
              <br/><p>オンラインレッスンのほかにも、CHATSHACKの対面レッスンやコースなど様々な方法で英語力の向上のお手伝いをしています！
対面レッスンは予約不要なので、お客様のタイミングでご来店いただけます！</p>
              <p>スタッフはみんなフレンドリーなので、緊張せずにお気軽にお越しください！また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
                (050 3395 1280)</p>
                <p>インスタやYouTubeもやっていますので、お楽しみください！</p>
              <div calss='col'>
                <Social data={'tiny-logo'}/>
              </div>
            </div>
          </div>}
      </div>
      </div>
)
}

export default StudentComments;
