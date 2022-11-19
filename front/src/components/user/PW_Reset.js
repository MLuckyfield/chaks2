import React, { useState, useEffect ,useRef} from 'react';
import {axios} from "../../utilities/axios";
import Social from '../utilities/social'
import Popup from '../utilities/popup'

const PW_Reset = (props)=>{
  const email = useRef('');
  const store_email = useRef('');
  const security_code = useRef('');
  const password = useRef('');
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)
  const [confirmed,setConfirmed]=useState(false)

  const onSubmit = (e) => {
    e.preventDefault();
    setForm(false)
    console.log('sending',email.current.value)
    axios.post('user/reset',
      {
        email: email.current.value
      })
      .then(() => {
        store_email.current.value=email.current.value
        email.current.value=''
        setConfirmed(true)
        setForm(true)
      })
      .catch((err) => {
        console.log(err,err.message,err.success)
        setForm(true)
        setMsg([err.message,err.success]);
      });
  }

  const reset = (e)=>{
    e.preventDefault();
    console.log('sending',security_code.current.value)
    axios.post('site_event/reset',
    {
      // email:store_email.current.value
      security_code: security_code.current.value,
      password: password.current.value
    }).then(()=>{
      window.location='/login'
    })
    .catch((err)=>setMsg([err.message,err.success]))
  }

  return (

    <div id='signup' class='col'>
      <div class='col'>
        {confirmed?
          <form onSubmit={reset}>
            <div class="master-row form-group border">
                <div class='row'>
                  <div class='col'>
                    <div class='row'>
                      <div class='col'>
                          Update Password
                      </div>
                    </div>
                  </div>
                </div>
                <div class='row'>
                  <input ref={security_code} class='form-control' placeholder='Security Code'  required/>
                </div>
                <div class='row'>
                  <input ref={password} class='form-control' type='password' placeholder='New Password'  required/>
                </div>
                  {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                  <div class='row'>
                      {form?<button class='form-control solid-first' type="submit">Reset</button>:'Loading...'}
                  </div>
            </div>
          </form>
        :
        <form onSubmit={onSubmit}>
          <div class="master-row form-group border">
              <div class='row'>
                <div class='col'>
                  <div class='row'>
                    <div class='col'>
                        Reset Password
                    </div>
                  </div>
                </div>
              </div>
              <div class='row'>
                <input ref={email} class='form-control' type='email' placeholder='Email'  required/>
              </div>
                {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                <div class='row'>
                    {form?<button class='form-control solid-first' type="submit">Reset</button>:'Loading...'}
                </div>
          </div>
        </form>}
      </div>
    </div>
  )
}
export default PW_Reset;
