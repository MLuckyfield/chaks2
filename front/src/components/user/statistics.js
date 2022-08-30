import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import io from 'socket.io-client';

const Statistics = (props)=>{

  const [user,setUser]=useState()
  const [time,setTime]=useState(new Date())
  const socket = io();
  const [isConnected,setIsConnected]=useState(socket.connected)
  socket.on("return", (arg) => {
    alert('recieved',arg); // world
    setTime(new Date())
  });
  useEffect(()=>{
    console.log('Front Connected?',isConnected)
    socket.on("return", (arg) => {
      setTime(new Date())
      alert('recieved'+arg); // world
      
    });

    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          setUser(res.data.data)
          console.log('Statistics for',res.data.data)
        })
      .catch(error => console.log("error"+error))
  },[])

  const sendPing = () => {
    console.log('ping clicked')
    socket.emit("hello", "world");
  }
  return (
    <div class="pop">
      <p></p>
      <p>Connected: {isConnected}</p>
      <p>Current Time: {time.toString()}</p>
      <button onClick={ sendPing }>Send ping</button>
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
