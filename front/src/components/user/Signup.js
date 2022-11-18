import React, { useState, useEffect ,useRef} from 'react';
import {axios} from "../../utilities/axios";
import Social from '../utilities/social'
import Popup from '../utilities/popup'

const Signup = (props)=>{
  const email = useRef('');
  const first = useRef('');
  const last = useRef('');
  const password = useRef('');
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)

const onSubmit = (e) => {
  e.preventDefault();
  setForm(false)
  axios.post('user/new',
    {
      email: email.current.value,
      first:first.current.value,
      password:password.current.value,
      last:last.current.value,
    })
    .then((res) => {
      // console.log('response'+res)
      localStorage.setItem('user', JSON.stringify(res.data.result));
      setMsg([res.data.message,res.data.success]);
      window.location=props.redirect
    })
    .catch((err) => {
      setForm(true)
      setMsg([err.message,err.success]);
    });
}


  return (

    <div id='signup' class='col'>
      <div class='col'>
        <form onSubmit={onSubmit}>
          <div class="master-row form-group border">
              <div class='row'>
                <div class='col'>
                  <div class='row'><h1>SUBSCRIBE</h1></div>
                  <div class='row'>
                    <div class='col'>
                        CHATSHACKの最新情報を知りたい方はこちら！特別割引、キャンペーン情報、イベント招待など、お届けします！登録することで先生からのフィードバックが見れたり、予約システムの利用も可能になります！
                    </div>
                  </div>
                </div>
              </div>
              <div class='row'>
                <input ref={first} class='form-control' minlength='1' placeholder='First Name'  required/>
                <input ref={last} class='form-control' minlength='1' placeholder='Last Name'  required/>
              </div>
              <div class='row'>
                <input ref={email} class='form-control' type='email' placeholder='Email'  required/>
              </div>
              <div class='row'>
                <input ref={password} class='form-control' type='Password' placeholder='Password' required/>
              </div>
                {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                <Popup title={"個人情報取り扱いについて"} num={1} content={
                  <div>
                    CHATSHACK(以下「当社」)では、お預かりした個人情報について、以下のとおり適正かつ安全に管理・運用することに努めます。
                    <br/>
                    <p>１．利用目的
                    当社は、収集した個人情報について、以下の目的のために利用いたします。
                    ①サービス実施、およびアフターサービスのため
                    ②相談・お問い合わせへの回答のため
                    ③商品・サービス・イベントの案内のため</p>
                    <br/>
                    <p>２．第三者提供
                    当社は、以下の場合を除いて、個人データを第三者へ提供することはしません。
                    ①法令に基づく場合
                    ②人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合
                    ③公衆衛生の向上・児童の健全な育成のために必要で、本人から同意を得ることが難しい場合
                    ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合</p>
                    <br/>
                    <p>３．開示請求
                    貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。</p>
                  </div>
                }/>
                <div class='row'>
                    {form?<button class='form-control solid-first' type="submit">Sign Up</button>:'Loading...'}
                </div>
          </div>
        </form>
      </div>
      <Social data={'tiny-logo'}/>
    </div>
  )
}
export default Signup;
