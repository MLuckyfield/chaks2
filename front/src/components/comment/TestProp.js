import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Popup from '../utilities/popup'

const TestProp = () => {
  const [account,setAccount]=useState(()=>{
    axios.get('/user/all',{params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          console.log('found',res.data.data)
          setAccount(res.data.data[0])
          })
      .catch((err) => {
        console.log(err);
        });
  })
  const [courses,setCourses]=useState(()=>{
    axios.get('/enrolled/all',{params:{filter:{student:JSON.parse(localStorage.getItem('user'))._id}}})
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
          <div class='row'>
          ポイント: 20
          </div>:'Loading account...'}
        {account?
          <div class='row'>
            <div class='col'><h2>Subscriptions</h2></div>
            <div class='col'>{account.subscriptions.length>0?account.subscriptions.map((sub,i)=>{
              return <div class='fixed-row'>{sub.name} since {moment(sub.start).format('M/D')}</div>
            }):'You are not subscribed!'} </div>
          </div>
      :'Loading account...'}
      <div class='row'>
        <div class='col'><h2>Courses</h2></div>
        <div class='col'>{courses?courses.map(function(course,i){
          return <div>{course.course.name} {course.status}</div>
        }):'You are not enrolled!'}</div>
      </div>
      <div class='fixed-row' style={{backgroundColor:'rgba(175,65,84,1)',color:'white'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0',display:'flex'}}>
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
    </div>
  )
}
export default TestProp;
