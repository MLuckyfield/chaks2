
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios';
//import styles
import './scss/main.scss'
import logo from './chatshack.jpeg'

const App = () => {

      const [text, setText] = useState([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Have you ever wondered these things? After 5 years of English language education in public school, and maybe even after graduating from expensive Eikaiwa, many people still do not have the confidence to speak English well. Though people often have good knowledge of reading/wriitng, listening is harder and speaking is hardest. So eventually pople say "I need more opportunities to speak English!" Perhaps you tried language exchange apps, or meetups, to make new foreign friends. But what happens? Do they tell you everytime you make a mistake, or explain the mistake, or a better way to say it depending on the situation, or whats more natural? Maybe once a meeting! Usually, as long as they understand you, the conversation just carries on, and you never learn from that moment. Because the truth is, most people we meet through those channels are not there to really give you the feedback you need. So in summary: school (possibly the best option, but typically very expensive, and if structure is too formal it takes time to learn to speak naturally), meetups/exchange apps (very cheap and exciting in the beginning, but difficult to find a good one. Difficult to have someone remember your person patterns or guide your growth), or making new friends (free! but usually you just end up playing not learning))'
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
              <nav role="navigation">
                <div id="menuToggle">
                  <input type="checkbox" />
                  <span></span>
                  <span></span>
                  <span></span>
                    <ul id="menu">
                      <li><img class='avatar' id='nav-logo' src={logo} alt="Avatar"></img><div class='logo-basic'>CHATSHACK</div></li>
                      <li><a href="#intro">Intro</a></li>
                      <li><a href="#">Concept</a></li>
                      <li><a href="#merit">Merit</a></li>
                      <li><a href="#team">Team</a></li>
                    </ul>
                </div>
              </nav>
              <div id='header' class='transparent'>
                    <div id='overlay'>
                        <div class='row'>
                          <div class='col'>
                            <img class='avatar' id='logo' src={logo} alt="Avatar"></img>
                            <h1 class='logo-basic'>CHAT SHACK</h1>
                          </div>
                        </div>
                    </div>
              </div>
              <div id='intro' class='master-row'>
              <div class='row '>
                <div class='col slim center'>
                    <h2>"I do not know how to say that"<br/>"I know I am speaking incorrectly but I do not know when"<br/>"How can I send more natural"<br/>"What is the difference between these words"<br/>"When is this word appropriate"</h2>
                    <p/>{text[1]}
                </div>
              </div>
              <div id='merit' class='master-row mid'>
                  <div class='row'><h1 class='col'>MERIT</h1></div>
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
                <div class='col'>
                  <form onSubmit={onSubmit}>
                    <div class="master-row form-group border">
                        <div class='row'>
                            <h1 class='col'>SUBSCRIBE</h1>
                        </div>
                        <div class='row'>
                          <input ref={first} class='form-control' placeholder='First Name'/>
                          <input ref={last} class='form-control' placeholder='Family Name'/>
                        </div>
                        <div class='row'>
                          <input ref={email} class='form-control' type='email' placeholder='Email'/>
                        </div>
                          {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                          <div class='row'>
                              <button class='form-control' type="submit">Sign Up</button>
                          </div>
                    </div>
                  </form>
                </div>
              </div>
              <div id='team' class='row dark'>
                <div class='master-row slim'>
                    <h1 class='col'>TEAM</h1>
                    <div class='row center'>
                        <div class='col slim'>
                            <img class='avatar' src="https://thumbs.dreamstime.com/z/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg" alt="Avatar"></img>
                            <h2>SHUNSUKE</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'>Legal, Sourcing, F&B, Funding, Communications</span>
                            {text[0]}
                        </div>
                        <div class='col slim'>
                            <img class='avatar' src="https://thumbs.dreamstime.com/z/man-profile-cartoon-smiling-vector-illustration-graphic-design-135443492.jpg" alt="Avatar"></img>
                            <h2>MATT</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'>Research, Product, Branding & Marketing, Finance, Tech</span>
                            {text[0]}
                        </div>
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
