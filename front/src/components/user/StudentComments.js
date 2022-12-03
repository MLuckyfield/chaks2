import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import Profile from "./Profile";
import Social from "../utilities/social";
import moment from "moment"
import {io} from 'socket.io-client';
const socket = io();


const StudentComments = () => {

  const [comments, setComments] = useState(null);
  const [payable,setPayable] = useState(null)
  const [source,setSource] =useState()
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return JSON.parse(localStorage.getItem('user'))}
  })
  useEffect(() => {
    socket.on("connect", () => {
      console.log('front socket ready')
    });
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
    const vincent=0
    const sonja=0
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
  return(
    <div class='master-row'>
      <div class='col'>
        {JSON.parse(localStorage.getItem('user')).role=='manager'? (<button onClick={target.inClass?()=>clockin(false):()=>clockin(true)} style={target.inClass?{backgroundColor:'red',width:'80%'}:{backgroundColor:'blue',width:'80%'}}>{target.inClass?'End':'Start'}</button>):''}
        {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
      </div>
      <div id='teacher_select'>
        <button onClick={()=>sendTo('63218b02f17f3f46bf91af22')} class='button'>Bre</button>
        <button onClick={()=>sendTo('62fb3ed3bc7766179393b277')} class='button'>Vincent</button>
        <button onClick={()=>sendTo('6344faac6bf36a9debe60b25')} class='button'>TEST</button>
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
                          ご登録いただきありがとうございました！　では、これからどうやってあなたの英語力を向上させるのか？
                          <br/><p>まずは、CHATSHACKの無料レッスンを受けてみてください！予約不要で、お客様の好きなタイミングでご来店いただけます。
                            心よりお待ちしておりますので、緊張せずお気軽にお越しください。</p>
                          <p>また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
                            (050 3395 1280)</p>
                            <p>インスタやYouTubeもやっていますので、お楽しみください！</p>
                          <div calss='col'>
                            <Social data={'tiny-logo'}/>
                          </div>
                        </div>
                      </div>)
          ):'Loading...'}
      </div>
      </div>
)
}

export default StudentComments;
