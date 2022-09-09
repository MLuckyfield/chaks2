import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'

const Statistics = (props)=>{

  const [sessions,setSessions]=useState(0)
  const [count,setCount]=useState(0)
  const [reward,setReward]=useState()
  const [nextReward,setNextReward]=useState('')
  const [msg,setMsg]=useState('')
  const [account,setAccount]=useState()

  // const [time,setTime]=useState(new Date())
  // const [isConnected,setIsConnected]=useState()
  // socket.on("return", (arg) => {
  //   alert('recieved',arg); // world
  //   setTime(new Date())
  // });
  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          let user = res.data.data[0]
          setAccount(user)
          res=user.statistics
          setCount(res)
          console.log('Statistics for',res.length)
          let month = new Date()
          let count = 0
          res.forEach((item, i) => {
            // console.log(moment(session.start).month(),month,moment(session.start).month()==month)
            if(moment(item.start).month()==month){count++}
          });
          let requirement = 4
          let temp = []
          temp['Standard']=[0,'Gold']
          temp['Gold']=[4,'Platinum']
          temp['Platinum']=[8,'Diamond']
          temp['Diamond']=[12]
          setReward(temp)
          console.log('end of',moment().diff(moment().endOf('month')),'days')

          if(user.reward){requirement=temp[user.reward][0];}
          // if(user.reward=='Gold'){setReward('Platinum');requirement=4}
          // if(user.reward=='Platinum'){setReward('Diamond');requirement=8}
          // if(user.reward=='Diamond'){requirement=12}
          let next = temp[user.reward][1]
          if(count>temp[user.reward][0]){
            setMsg(temp[next][0]-count +' more sessions to unlock '+temp[next][1]+' level!');
            setSessions((count/temp[next][0])*100).toFixed(2)}
          else{
            setMsg(temp[user.reward][0]-count +' more sessions to keep your current status!');
            setSessions((count/temp[user.reward][0]*100).toFixed(2))
          }
          // setNextReward(temp[user.reward][1])
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <div class='master-row'>
        <div class='col border'>
            <h1>ACCOUNT</h1>
            {account?
            <div class='col'>
              Plan:
              Points: {account.points}
            </div>
          :'Loading account...'}
        </div>
        Current Reward Level: {account?account.reward:'Loading'}
        <span>{msg}  days left</span>
          <div class="progress-container">
            <div class="progress" style={{width:`${sessions}%`}}></div>{sessions}
          </div>
        <QRCode value={localStorage.getItem('user')}/>
    </div>

  )
}

export default Statistics;

// CHATSHACK(以下「当社」)では、お預かりした個人情報について、以下のとおり適正かつ安全に管理・運用することに努めます。
// <br/>
// <p>１．利用目的
// 当社は、収集した個人情報について、以下の目的のために利用いたします。
// ①サービス実施、およびアフターサービスのため
// ②相談・お問い合わせへの回答のため
// ③商品・サービス・イベントの案内のため</p>
// <br/>
// <p>２．第三者提供
// 当社は、以下の場合を除いて、個人データを第三者へ提供することはしません。
// ①法令に基づく場合
// ②人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合
// ③公衆衛生の向上・児童の健全な育成のために必要で、本人から同意を得ることが難しい場合
// ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合</p>
// <br/>
// <p>３．開示請求
// 貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。</p>
