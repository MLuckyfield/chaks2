import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"

const TestProp = () => {
  const [account,setAccount]=useState(JSON.parse(localStorage.getItem('user')))
  const [courses,setCourses]=useState(()=>{
    axios.get('/enrolled/all',{params:{filter:{student:account._id}}})
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  })
  return (
    <div class='col border'>
        <h1>ACCOUNT</h1>
        {account?
        <div class='col'>
        {console.log('subscriptions',account.subscriptions)}
          Subscriptions:{account.subscriptions.length>0?account.subscsriptions.map((sub,i)=>{
            return <div class='row'>{sub.name} {moment(sub.start).format('M/D')}</div>
          }):'You are not subscribed!'}
          ポイント: 20
        </div>
      :'Loading account...'}
      {courses?courses.map(function(course,i){
        return <div>{course.course.name} {course.status}</div>
      }):''}
    </div>
  )
}

export default TestProp;
