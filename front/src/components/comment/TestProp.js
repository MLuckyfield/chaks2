import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Popup from '../utilities/popup'
import instructor from '../../images/OUTPUT.jpg'
import campaign from '../../images/sakura.jpg'

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
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>POINT</span>
          </div>
          <div class='col w80 align'>
            <p>ただのネイティブではなく</p>
            <h1>選び抜かれた<br/>講師陣</h1>
            <p style={{marginBottom:'3%'}}>合格率２％のテストに合格した講師のみを採用しています</p>
            <Popup button={"詳細"} num={1} content={
              <div class='col'>
                  <h1 style={{margin:'10% 0'}}>プレミアム英会話なら<br/>ハイクラスな教師</h1>
                  <p>講師は英会話講師の経験があり、トレーニングを受けいるため
                  教え方が上手なだけでなく英語の知識も豊富です。会話を楽しくスムーズにリードし、細かい英文法などもしっかりと教えてくれます！</p>
                  <img style={{width:'200%'}} src={instructor}></img>
                  <div class="btn" style={{position:'relative'}} onClick={(e)=>{e.preventDefault();window.location='#team'}}>チームを見る</div>
              </div>
            }/>
            </div>
          </div>
      </div>
      <div class='fixed-row' style={{backgroundColor:'rgba(175,65,84,1)',color:'white'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0',display:'flex'}}>
          <div class='col w20'>
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>POINT</span>
          </div>
          <div class='col w80 align'>
            <p>ただのネイティブではなく</p>
            <h1>選び抜かれた<br/>講師陣</h1>
            <p style={{marginBottom:'3%'}}>合格率２％のテストに合格した講師のみを採用しています</p>
            <Popup button={"詳細"} num={1} content={
              <div class='col'>
                  <h1 style={{margin:'10% 0'}}>プレミアム英会話なら<br/>ハイクラスな教師</h1>
                  <p>講師は英会話講師の経験があり、トレーニングを受けいるため
                  教え方が上手なだけでなく英語の知識も豊富です。会話を楽しくスムーズにリードし、細かい英文法などもしっかりと教えてくれます！</p>
                  <img style={{width:'200%'}} src={instructor}></img>
                  <div class="btn" style={{position:'relative'}} onClick={(e)=>{e.preventDefault();window.location='#team'}}>チームを見る</div>
              </div>
            }/>
            </div>
          </div>
      </div>
      
    </div>
  )
}
export default TestProp;
