import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import Profile from "./Profile";
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
    console.log('will send '+JSON.stringify(target._id))
    axios.get('/user/clock', {params:{filter:target._id,data:status}})
      .then((res) => {
          console.log(res.data.data);
          setTarget(res.data.data)
          localStorage.setItem(source,JSON.stringify(res.data.data))
          if(status==true){setPayable(null)}
          else{setPayable(res.data.data.statistics[0])}
          let start =moment(res.data.data.statistics[0].start)
          let end = moment(res.data.data.statistics[0].end)
          const time = end.diff(start, 'minutes')
          let billable = 0
          if(time-40>0){billable=time-40}
          billable = (Math.round(billable/30)*1000)+1000
          console.log('Billable time is',billable,start,end)
          if(!status){alert(time+' minutes | ¥'+billable+' Start:'+start.format('HH:MM')+' End:'+end.format('HH:MM'))}
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
         socket.emit('sendstudent',target._id,id)
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  }
  return(
    <div class='master-row'>
      <div class='col'>
        {JSON.parse(localStorage.getItem('user')).role=='manager'?(payable?<span style={{color:'green',fontSize:'14px'}}>{moment(payable.end).diff(moment(payable.start), 'minutes')}</span>:''):''}
        {JSON.parse(localStorage.getItem('user')).role=='manager'? (<button onClick={target.inClass?()=>clockin(false):()=>clockin(true)} style={target.inClass?{backgroundColor:'red',width:'80%'}:{backgroundColor:'blue',width:'80%'}}>{target.inClass?'End':'Start'}</button>):''}
        {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
      </div>
      <div id='teacher_select'>
        <button onClick={()=>sendTo('63218b02f17f3f46bf91af22')} class='button'>Bre</button>
        <button onClick={()=>sendTo('628c7aefc378ce2a01df6ac7')} class='button'>Matthew</button>
        <button onClick={()=>sendTo('62fb3ed3bc7766179393b277')} class='button'>Vincent</button>
        <button onClick={()=>sendTo('63108c4d1a4b22bc06185083')} class='button'>TEST</button>
      </div>
      <h1>Feedback ({comments?comments.length:'None Yet!'})</h1>
      <div class='col'>
          {comments ? (comments.map(function(item, i){
              return (
                <div class='col feedback'>
                    <div class=''>{item.comment}</div>
                    <div class=''>{item.author.first} {item.author.last}</div>
                    <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                </div>
              )
                  })): 'No data to display'}
      </div>
      </div>
)
}

export default StudentComments;
