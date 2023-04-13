import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import {getCurrentUser} from '../../utilities/helpers'
import QRCode from 'react-qr-code'
import {io} from 'socket.io-client';
const socket=io()

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const [user, setUser] = useState(getCurrentUser());
  const [account,setAccount]=useState()
  const [sessions,setSessions]=useState(0)
  const [count,setCount]=useState(0)
  const [reward,setReward]=useState()
  const [msg,setMsg]=useState('')
  const [clock,setClock]=useState();
  const [courses,setCourses]=useState(()=>{
    axios.get('/enrolled/all',{params:{filter:{user:user._id}}})
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  })
  useEffect(()=>{
    localStorage.removeItem('clock')
    // console.log('loading account view for '+JSON.stringify(user))
    axios.get('user/all', {params:{filter:{_id: user._id}}})
      .then((res) => {
          socket.on(user._id,(status)=>{
            setClock(status)
          })

          let userData = res.data.data[0]
          setAccount(userData)
          setUser(userData)
          setClock(userData.inClass)
          res=userData.statistics
          setCount(res)
          // console.log('Statistics for',res.length)
          let month = new Date().getMonth()
          let count = 0
          res.forEach((item, i) => {
            if(moment(item.start).month()==month){count++}
            // console.log(i,moment(item.start).month()+1,month,moment(item.start).month()+1==month)
          });
          // console.log('number',count)
          let temp = []
          temp['Standard']=[0,'Gold']
          temp['Gold']=[4,'Platinum']
          temp['Platinum']=[8,'Diamond']
          temp['Diamond']=[12]
          setReward(temp)
          // console.log('end of',moment().endOf('month').diff(moment(),'days'))
          let eligible = ''
          if(count<4){eligible='Standard'}
          if(count>=4 && count<8){eligible='Gold'}
          if(count>=8 && count<12){eligible='Platinum'}
          if(count>=12){eligible='Diamond'}
          setReward(eligible)
          let next = temp[eligible][1]
          let word = 'unlock'
          if(eligible==userData.reward){word='keep'}
          if(count>=temp[userData.reward][0]){
            setMsg(temp[next][0]-count +' more sessions for '+next+' status!');
            setSessions((count/temp[next][0])*100)}
          else{
            setMsg(temp[eligible][0]-count +' more sessions for '+eligible+' status!');
            setSessions((count/temp[eligible][0]*100))
          }
        })
      .catch(error => console.log("error"+error))
  },[])
  const toPay=(e,product,countable)=>{
    e.preventDefault();
    console.log(product)
    axios.post('/payment/new',{user:user._id,product:product,countable:countable})
      .then((res) => {
          console.log(res.data.data)
          window.location.href=res.data.data.url
          // setMsg([res.data.message,res.data.success]);
          })
      .catch((err) => {
        setMsg([err.message,err.success]);
        // setFeedback(err.response.data.message);
        });
  }
  const onSubmit=(e,action)=>{
    // console.log(action)
    axios.post('payment/update_sub', {params:{filter:{_id:user._id},fields:'first stripe plan'}})
      .then((res) => {
          console.log(res.data.data[0])
          setAccount(res.data.data[0])
        })
      .catch(error => console.log("error"+error))
  }
  return(
      <div class='master-row'>
          {clock?
            <div class='col' style={{backgroundColor:'#55DF80',fontWeight:'700',color:'white'}}>
              YOU'RE IN CLASS!
              <button style={{width:'50%',color:'white',backgroundColor:'black',fontWeight:'700'}} onClick={(e)=>{window.location='/clock_out'}}>FINISH</button>
            </div>
          :''}
          <div class='col border'>
              <h1>ACCOUNT</h1>
              {account?
              <div class='col'>

                Plan: {account.plan}  {account.plan.toLowerCase()!='standard'?moment(account.stripe.plan_start_date).format('dddd, MMM DD, YYYY'):<div class="btn" style={{position:'relative'}} onClick={(e)=>{toPay(e,'price_1LvguqBVAfieqaobMWOW9cvF',true)}}>購入</div>}<br/>
                {account.first=='M'?(account.plan=='premium'?<div class="btn" onClick={(e)=>{onSubmit(e,'upgrade')}}>Upgrade</div>:<div class="btn" onClick={(e)=>onSubmit(e,'downgrade')}>Downgrade</div>):''}
                ポイント: {user.points}
              </div>
            :'Loading account...'}
            {courses?courses.map(function(course,i){
              return <div>{course.course.name} {course.status}</div>
            }):''}
          </div>
          {console.log('recieved',user,user._id)}
          <QRCode value={user._id}/>

          <div class='col border'>
          <h1>REWARDS</h1>
          Current Reward Level: <span style={{fontWeight:'bold'}}>{account?account.reward:'Loading'}</span><br/>
          <span>You are eligible for {reward}.</span><br/>
          <span>{msg} {moment().endOf('month').diff(moment(),'days')} days left</span>
            <div class="progress-container">
              <div class="progress" style={{width:`${sessions}%`}}></div>
            </div>
            VIP Rewards:
            <div class='col'>
              <ul>
                <li>Diamond: <span>500円</span>ドリンク１杯<span>無料</span> ＋ スナック<span>無料</span> ＋ 全メニュー <span>5%</span>オフ</li>
                <li>Platinum: <span>500円</span>ドリンク１杯<span>無料</span> ＋ 全メニュー <span>5%</span>オフ</li>
                <li>Gold: <span>500円</span> ドリンク１杯<span>無料</span></li>
              </ul>
            </div>
          </div>
      </div>
)
}

export default Account;
