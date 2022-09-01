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
          const time = moment(res.data.data.statistics[0].end).diff(moment(res.data.data.statistics[0].start), 'minutes')
          let billable = 0
          if(time-40>0){billable=time-40}
          console.log('Billable time is',billable,1000+(Math.round(billable/30)*1000)
          if(!status){alert(time+' minutes | '+1000+(Math.round(billable/30)*1000)+'/n Start:'+moment(res.data.data.statistics[0].start).format('HH:MM')+'/n End:'+moment(res.data.data.statistics[0].end).format('HH:MM'))}
        })
      .catch(error => console.log("error"+error))
  }
  const sendTo=(id)=>{
    console.log(id)
    axios.post('user/update',{_id: id},{'$push':{students:target._id}})
      .then((result)=>{
         console.log(result)
         let popup = document.getElementById("teacher_select");
         popup.style.display = 'none';
         socket.emit('sendstudent',target._id)
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  }
  return(
    <div class='master-row'>
      <div class='col'>
        {JSON.parse(localStorage.getItem('user')).role=='manager'?(payable?<span style={{color:'green',fontSize:'14px'}}>{moment(payable.end).diff(moment(payable.start), 'minutes')}</span>:''):''}
        {JSON.parse(localStorage.getItem('user')).role=='manager'? (<button onClick={target.inClass?()=>clockin(false):()=>clockin(true)} style={target.inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{target.inClass?'End':'Start'}</button>):''}
        {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
      </div>
      <div id='teacher_select'>
        <button onClick={()=>sendTo('62fb3ed3bc7766179393b277')} class='button'>Vincent</button>
        <button onClick={()=>sendTo('62900e59f7fadacf7159f379')} class='button'>Sonja</button>
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
