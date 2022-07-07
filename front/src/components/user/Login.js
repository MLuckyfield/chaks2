import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";

const Login = () => {

  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState();
  const email = useRef('');
  const password = useRef('');

  const [msg,setMsg] = useState()

  const onSubmit = (e) => {
    e.preventDefault();


    axios.post('/user/login',
      {
        email: email.current.value,
        password: password.current.value
      })
      .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data.result));
          window.location='/dash';
          })
      .catch((err) => {
        console.log(err);
        setMsg([err,false])

        });
  }

  return(
      <div class='row'>
        <form class='login' onSubmit={onSubmit}>
                <h2>Welcome Back!</h2>
                    <div class="form-group">
                      <input ref={email} type="email" class="form-control" placeholder="Email" required/>

                    </div>
                    <div class="form-group">
                      <input ref={password} type="password" class="form-control" placeholder="Password" required/>
                    </div>
                    {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                    <button type="submit" class="outline-first">Login</button>

                  </form>
                </div>
)
}

export default Login;
