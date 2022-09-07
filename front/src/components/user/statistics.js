import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'

const Statistics = (props)=>{

  const [sessions,setSessions]=useState(0)
  const [account,setAccount]=useState(JSON.parse(localStorage.getItem('user')))

  // const [time,setTime]=useState(new Date())
  // const [isConnected,setIsConnected]=useState()
  // socket.on("return", (arg) => {
  //   alert('recieved',arg); // world
  //   setTime(new Date())
  // });
  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:account._id}}})
      .then((res) => {
        res=res.data.data[0].statistics
          console.log('Statistics for',res.length)
          setSessions((res.length/4)*100)
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
