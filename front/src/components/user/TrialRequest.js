import React, { useState ,useRef} from 'react';
import {axios} from "../../utilities/axios";
import Social from '../utilities/social'
import Popup from '../utilities/popup'
import DateTimePicker from '../utilities/date_time_picker'
import moment from 'moment'

const Signup = (props)=>{
  const mobile = useRef('');
  const first = useRef('');
  const last = useRef('');
  const email = useRef('');
  // const month = useRef();
  // const day = useRef();
  // const hour = useRef();
  // const year = useRef();
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)
  const [showDateTimePicker,setShowDateTimePicker] = useState(false)
  const [created,setCreated] = useState(false)

const onSubmit = (e) => {
  e.preventDefault();
  setForm(false)
  axios.post('booking/new_trial',
    {
      first: first.current.value,
      last: last.current.value,
      mobile: mobile.current.value,
      email: email.current.value,
      segment:props.segment,
      year: localStorage.getItem('year'),
      month: localStorage.getItem('month'),
      day: localStorage.getItem('date'),
      hour: localStorage.getItem('hour'),
    })
    .then((res) => {
      localStorage.removeItem('year')
      localStorage.removeItem('month')
      localStorage.removeItem('day')
      localStorage.removeItem('date')
      localStorage.removeItem('hour')
      setCreated(true)
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
        {created?
          <div class="master-row form-group border successBox">
              REGISTRATION COMPLETED
          </div>
          :
          <div class="master-row form-group border">
              <div class='row'>
                <div class='col'>
                  <div class='row'><h1>無料体験予約</h1></div>
                </div>
              </div>
              <div class='row'>
                <input ref={first} class='form-control' minlength='1' placeholder='名（英語）'  required/>
                <input ref={last} class='form-control' minlength='1' placeholder='姓（英語）'  required/>
              </div>
              <div class='row'>
                <input ref={email} class='form-control' type='email' placeholder='メール'  required/>
              </div>
              <div class='row'>
                <input ref={mobile} minlength='11' maxlength='11' class='form-control' type='tel' placeholder='電話番号' required/>
              </div>
              <div class='row'>
                <label class='form-control' style={{textAlign:'center',border:'none',fontSize:'1em',fontWeight:'bold',width:'100%'}}>{localStorage.getItem('hour')?moment(`${localStorage.getItem('year')}-${localStorage.getItem('month')}-${localStorage.getItem('date')}`).hour(localStorage.getItem('hour')).format("MMM Do HH:mm"):'時間を選択してください'}</label>
                <button class='form-control outline-first' style={{width:'100%'}} onClick={(e)=>{e.preventDefault();setShowDateTimePicker(true)}}>選択する</button>
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
                {form?
                    localStorage.getItem('hour')?
                    <button class='form-control solid-first' type="submit">予約</button>
                    :''
                  :'Loading...'}
                </div>
          </div>}
        </form>
      </div>
      <Social data={'tiny-logo'}/>
      {showDateTimePicker?<form><DateTimePicker closeFunction={()=>{setShowDateTimePicker(false)}}/></form>:''}

    </div>
  )
}
export default Signup;
