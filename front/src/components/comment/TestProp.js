import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Popup from '../utilities/popup'
import Trial from '../user/TrialRequest'
import instructor from '../../images/OUTPUT.jpg'
import campaign from '../../images/sakura.jpg'
import info from '../../output.png'
import {useSelector, useDispatch} from 'react-redux'
import actions from "../../utilities/actions";

const TestProp = () => {

  const user = ''
  const dispatch = useDispatch()
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
  //USEFFECT and insert dispatch
  useEffect(()=>{
    dispatch(actions.setCurrentUser({name:'happy'}))
    console.log('dispatch activated')
  })
  //useselector
  user = useSelector(state => state.userReducer)

  return (
    <div class='col border'>
        <h1>ACCOUNT ({user.user.name})</h1>
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
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>POINT<br/>1</span>
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
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>POINT<br/>2</span>
          </div>
          <div class='col w80 align'>
            <h1>ニーズに合わせる</h1>
            <p style={{marginBottom:'3%'}}>完全マンツーマンレッスンなので、お客様のご希望に沿ったレッスンをご提供しています!</p>
            <Popup button={"詳細"} num={2} content={
              <div class='col'>
                  <h1 style={{margin:'10% 0'}}>好きに選べる<br/>レッスン内容</h1>
                  <p>各コースを購入していただければ、コースの内容のレッスンをすることも可能です。文法コース、日常英会話コース、ビジネス英語コース、TOEIC対策コース等ございます。</p>
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
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>POINT<br/>3</span>
          </div>
          <div class='col w80 align'>
            <h1>効果的な学び方</h1>
            <p style={{marginBottom:'3%'}}>学習システム</p>
            <Popup button={"詳細"} num={3} content={
              <div class='col'>
                <h1 style={{margin:'10% 0'}}>確実に英語を伸ばす</h1>
                <img style={{width:'200%'}} src={info}></img>
                <h1 style={{margin:'10% 0'}}>好きに選べる<br/>レッスン内容</h1>
                <p>CHATSHACKのオンラインシステムでは、全てのレッスンのフィードバックをご覧いただけます。
レッスン中の自分の間違えなどをいつでも確認することができるため、アウトプットだけではなくインプットも含めた効率的な学習が可能です。</p>
                <img style={{width:'200%'}} src={instructor}></img>
              </div>
            }/>
            </div>
          </div>
      </div>
      <Trial/>
    </div>
  )
}
export default TestProp;
