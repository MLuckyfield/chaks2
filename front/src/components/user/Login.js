import React, { useRef, useState } from 'react';
import {useDispatch} from 'react-redux'
import {axios} from "../../utilities/axios";
import action from "../../utilities/actions";
import {setCurrentUser} from '../../utilities/helpers'

const Login = () => {

  const dispatch = useDispatch()
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
          setCurrentUser(res.data.result);
          // dispatch(action.setCurrentUser(res.data.result))
          window.location='/dash';
          })
      .catch((err) => {
        console.log(err);
        setMsg([err,false])
        });
  }

  return(
      <div class='master-row'>
        <form class='login' onSubmit={onSubmit}>
                <h2>Welcome Back!</h2>
                    <div class="form-group">
                      <input ref={email} type="email" class="form-control" placeholder="Email" required/>

                    </div>
                    <div class="form-group">
                      <input ref={password} type="password" class="form-control" placeholder="Password" required/>
                    </div>
                    <div class="form-group">
                    </div>
                    {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}

                    <button type="submit" class="outline-first">Login</button>
                  </form>
                  <button style={{background:'none',color:'brown',fontSize:'smaller',textDecoration:'underline',width:'50%',border:'none'}} onClick={()=>window.location='/reset'} class="solid-first">Forgot Password</button>
                </div>
)
}

export default Login;
