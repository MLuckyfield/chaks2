
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios';
//import styles
import './scss/main.scss'

const App = () => {

      const [text, setText] = useState([
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',

      ])

      const email = useRef('');
      const first = useRef('');
      const last = useRef('');
      const [msg,setMsg] = useState()

      const onSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/user/new',
          {
            email: email.current.value,
            first:first.current.value,
            last:last.current.value,
          })
          .then((res) => {
            console.log('response'+res)
              setMsg([res.data.message,res.data.success]);
          })
          .catch((err) => {
            setMsg([err.message,err.success]);
          });
      }

      return (
        // <Router>
        //     <Route path="/" component={Navbar}/>
        //     <Route path="/signup" component={Signup}/>
        //     <AuthDataProvider>
        //       <SentryRoute path="/login" access='user' success={AdminDash} fail={Login}/>
        //       <SentryRoute path="/dash" access='user' success={AdminDash} fail={Login}/>
        //     </AuthDataProvider>
        // </Router>
        <div>
              <div id='header' class='transparent'>
                  <div id='overlay'>
                    <div id='nav'>test</div>
                    <div id='text'><h1>CHAT<br/>SHACK</h1></div>
                  </div>
              </div>
          <div class='master-row'>
              <div class='row '><div class='col slim center'>{text[0]}</div></div>
              <div class='master-row mid'>
                  <div class='row'><h2 class='col'>MERIT</h2></div>
                  <div class='row'>
                        <div class='col slim'>
                            <span class='material-icons'>school</span>
                            <div class='col'>{text[0]}</div>
                        </div>
                        <div class='col slim'>
                            <span class='material-icons'>more_time</span>
                            <div class='col'>{text[0]}</div>
                        </div>
                        <div class='slim'>
                            <span class='material-icons'>savings</span>
                            <div class='col'>{text[0]}</div>
                        </div>
                  </div>
              </div>
              <div class='row'>
                <form onSubmit={onSubmit}>
                  <div class="master-row form-group border">
                      <h2 class='col'>SUBSCRIBE</h2>
                      <div class='row'>
                        <input ref={first} class='form-control' placeholder='First Name'/>
                        <input ref={last} class='form-control' placeholder='Family Name'/>
                      </div>
                      <div class='row'>
                        <input ref={email} class='form-control' type='email' placeholder='Email'/>
                      </div>
                        {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                        <button class='form-control' type="submit">Sign Up</button>
                  </div>
                </form>
              </div>
              <div class='row dark'>
                <div class='master-row slim'>
                    <h2 class='col'>TEAM</h2>
                    <div class='row'>
                        <div class='col slim'>{text[0]}</div>
                        <div class='col slim'>{text[0]}</div>
                    </div>
                </div>
            </div>
          </div>
          </div>
      )
  }

const SentryRoute = ({ access, success, fail, ...options }) => {
  //const { user } = useAuthDataContext();

  let user = localStorage.getItem('user');
  if(user == '' || null){
    return <Route {...options} component={fail} />;
  }else{
    user = JSON.parse(localStorage.getItem('user'));
    const finalComponent = (user && user.role==access? success : fail);
    return <Route {...options} component={finalComponent} />;
  }



};

export default App;
