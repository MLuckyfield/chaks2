import Table from '../utilities/table'
import SessionTable from './SessionTable'
import moment from "moment-timezone"
import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import * as constants from '../../utilities/constants'

const TrialView =()=>{
  const [trial,setTrial]=useState(JSON.parse(localStorage.getItem('trial')))
  const mobile = useRef();
  const first = useRef();
  const last = useRef();
  const email = useRef();
  const password = useRef();
  const segment = useRef({value:''});
  const teacher = useRef();
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)
  const [created,setCreated] = useState(false)

  useEffect(()=>{
      first.current.value=trial.first?trial.first:''
      last.current.value=trial.last?trial.last:''
      email.current.value=trial.email?trial.email:''
      mobile.current.value=trial.mobile?trial.mobile:''
      segment.current.value=trial.segment?trial.segment:''
      teacher.current.value=trial.teacher?trial.teacher:''
    },[])

  const onSubmit = (e) => {
    e.preventDefault();
    setForm(false)
    localStorage.removeItem('trial')
    axios.post('user/new',
      {
        first: first.current.value,
        last: last.current.value,
        mobile: mobile.current.value,
        email: email.current.value,
        teacher:teacher.current.value,
        password:password.current.value,
        segment:segment.current.value,
        trial:trial,
      })
      .then(() => {
        setCreated(true)
      })
      .catch((err) => {
        setForm(true)
        setMsg([err.message,err.success]);
      });
  }

  return(
    <div class='col'>
    <h1>TRIAL</h1>
    <h2>{moment.utc(trial.date).format("MMM Do HH:mm")}</h2>
    <form onSubmit={onSubmit}>
      {created?
        <div class="master-row form-group border successBox">
            REGISTRATION COMPLETED
        </div>
      :<div class="master-row form-group border">
          <div class='row'>
            <div class='col'>
              <div class='row'>
                <label>担当講師</label>
                <select class='form-control' ref={teacher} required>
                  {Object.entries(constants.PROFILES).map((teacher, i) => {
                    if(teacher[1].active){
                      return <option value={teacher[0].substring(1)}>{teacher[1].name}</option>
                    }
                  })}
                </select>
              </div>
              <div class='row'>
                <label>サービス</label>
                <select class='form-control' ref={segment} required>
                  {constants.SERVICES.map((service, i) => {
                    return <option value={service}>{service}</option>
                  })}
                </select>
              </div>
            </div>
          </div>
          <hr style={{border:'1px solid tomato',width:'80%',margin:'5'}}/>
          <div class='row'>
            <input ref={first} class='form-control' minlength='1' placeholder='名（英語）'  required/>
            <input ref={last} class='form-control' minlength='1' placeholder='姓（英語）'  required/>
          </div>
          <div class='row'>
            <input ref={email} class='form-control' type='email' placeholder='メール'  required/>
          </div>
          <div class='row'>
            <input ref={mobile} minlength='11' maxlength='11' class='form-control' type='tel' placeholder='Mobile' required/>
          </div>
          <hr style={{border:'1px solid tomato',width:'80%',margin:'5%'}}/>
          <div class='row'>
            <input ref={password} class='form-control' type='Password' placeholder='パスワード' required/>
          </div>

            {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

            <div class='row'>
                {form?<button class='form-control solid-first' type="submit">登録</button>:'Loading...'}
            </div>
      </div>}
    </form>
    </div>
  )
}
export default TrialView;
