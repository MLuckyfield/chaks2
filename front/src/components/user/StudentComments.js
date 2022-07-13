import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import Profile from "./Profile";
import moment from "moment"

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

    axios.get('/comment/all', {params:{filter:target._id}})
      .then((res) => {
          setComments(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  const clockin=(status)=>{
    console.log('will send '+JSON.stringify(target._id))
    axios.get('/user/clock', {params:{filter:target._id,data:status}})
      .then((res) => {
          console.log(res.data.data);
          setTarget(res.data.data)
          localStorage.setItem(source,JSON.stringify(res.data.data))
          if(status==true){setPayable(null)}
          else{setPayable(res.data.data.statistics[0])}
        })
      .catch(error => console.log("error"+error))
  }

  return(
    <div class='master-row'>
      <div class='col'>
        {JSON.parse(localStorage.getItem('user')).role=='manager'?(payable?moment(payable.end).diff(moment(payable.start), 'hours'):''):''}
        {JSON.parse(localStorage.getItem('user')).role=='manager'? (<button onClick={target.inClass?()=>clockin(false):()=>clockin(true)} style={target.inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{target.inClass?'End':'Start'}</button>):''}
        {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
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
