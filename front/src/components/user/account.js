import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import QRCode from 'react-qr-code'

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('user')));
  const [account,setAccount]=useState()
  const [sessions,setSessions]=useState(0)
  const [count,setCount]=useState(0)
  const [reward,setReward]=useState()
  const [points,setPoints]=useState(0)
  const [msg,setMsg]=useState('')

  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          // res.data.data.forEach((item, i) => {
          //   item['inClass']=false
          // });
          // console.log(res.data.data)
          // setAccount(res.data.data[0])
          // console.log(res.data.data[0],res.data.data[0].first)
          let user = res.data.data[0]
          setAccount(user)
          res=user.statistics
          setCount(res)
          console.log('has pounts',user)
          setPoints(user.points.length*30)
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
          if(eligible==user.reward){word='keep'}
          if(count>=temp[user.reward][0]){
            setMsg(temp[next][0]-count +' more sessions for '+next+' status!');
            setSessions((count/temp[next][0])*100)}
          else{
            setMsg(temp[eligible][0]-count +' more sessions for '+eligible+' status!');
            setSessions((count/temp[eligible][0]*100))
          }
        })
      .catch(error => console.log("error"+error))
  },[])
  const onSubmit=(e,action)=>{
    // console.log(action)
    axios.post('payment/update_sub', {params:{filter:{_id:student._id},fields:'first stripe plan'}})
      .then((res) => {
          console.log(res.data.data[0])
          setAccount(res.data.data[0])
        })
      .catch(error => console.log("error"+error))
  }
  return(
      <div class='master-row'>
          <div class='col border'>
              <h1>ACCOUNT</h1>
              {account?
              <div class='col'>
                Plan: {account.plan}  {account.plan.toLowerCase()!='standard'?moment(account.stripe.plan_start_date).format('dddd, MMM DD, YYYY'):''}<br/>
                {account.first=='M'?(account.plan=='premium'?<div class="btn" onClick={(e)=>{onSubmit(e,'upgrade')}}>Upgrade</div>:<div class="btn" onClick={(e)=>onSubmit(e,'downgrade')}>Downgrade</div>):''}
                Points: {points?points:'Loading...'}
              </div>
            :'Loading account...'}
          </div>
          {student.first=='Takeshi'?
          <div>
          Current Reward Level: <span style={{fontWeight:'bold'}}>{account?account.reward:'Loading'}</span><br/>
          <span>You are eligible for {reward}.</span><br/>
          <span>{msg} {moment().endOf('month').diff(moment(),'days')} days left</span>
            <div class="progress-container">
              <div class="progress" style={{width:`${sessions}%`}}></div>
            </div>
          </div>:''}
          VIP Rewards:
          <ul>
            <li>Diamond: <span>10%</span> off <span>everything</span> + 1 drink & 1 snack <span>FREE</span> at each event</li>
            <li>Platinum: <span>10%</span> off <span>lessons</span> + 1 snack <span>FREE</span> at each event</li>
            <li>Gold: <span>5%</span> off <span>lessons</span></li>
          </ul>
          <QRCode value={localStorage.getItem('user')}/>
      </div>
)
}

export default Account;
