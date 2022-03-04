
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios';
import GoogleMapReact from 'google-map-react'
//import styles
import './scss/main.scss'
import logo from './chatshack.jpeg'
import shunsuke from './shunsuke.jpg'
import matt from './matt.jpg'

const App = () => {

      const [text, setText] = useState([
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'このような悩みありませんか？高校や大学で英語を学んでも、高い英会話スクールに通っていたとしても、英語を話すことに自信を持つのは難しいでしょう。また、英語の読み書きには自信があっても、リスニングとスピーキングが苦手な方が多いかと思います。きっとそれは、気軽に楽しく英語を話す機会が少ないからなのではないでしょうか？語学交流アプリなどを利用して外語人の友人を作り、英語を話す機会を作ったとしても、きっと彼らはあなたの英語の間違いを１つ１つ丁寧に指摘や修正はしてくれないでしょう。'
      ])

      const email = useRef('');
      const first = useRef('');
      const last = useRef('');
      const [msg,setMsg] = useState()

      const onSubmit = (e) => {
        e.preventDefault();

        axios.post('user/new',
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
      const navSlide=()=>{
        const burger = document.querySelector(".burger");
        const nav = document.querySelector(".nav-links");
        const navLinks = document.querySelectorAll(".nav-links li");
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");

      }
      // <nav role="navigation">
      //   <div id="menuToggle">
      //     <input type="checkbox" />
      //     <span></span>
      //     <span></span>
      //     <span></span>
      //       <ul id="menu">
      //         <li><img class='avatar' id='nav-logo' src={logo} alt="Avatar"></img><div class='logo-basic'>CHATSHACK</div></li>
      //         <li><a href="#intro">Intro</a></li>
      //         <li><a href="#concept">Concept</a></li>
      //         <li><a href="#merit">Merit</a></li>
      //         <li><a href="#team">Team</a></li>
      //       </ul>
      //   </div>
      // </nav>
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

              <nav>
                  <div class="logo">
                    <div id='nav-row'>
                        <img class='avatar' id='nav-logo' src={logo} alt="Avatar"></img>
                        <div class='logo-basic'>CHATSHACK</div>
                    </div>
                  </div>
                  <ul class="nav-links">
                      <li><a onClick={navSlide} href="#intro">INTRO</a></li>
                      <li><a onClick={navSlide} href="#concept">CONCEPT</a></li>
                      <li><a onClick={navSlide} href="#merit">MERIT</a></li>
                      <li><a onClick={navSlide} href="#team">TEAM</a></li>
                  </ul>
                  <div class="burger" onClick={navSlide}>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
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
              <div class='master-row'>
              <div id='intro'  class='row '>
                <div class='col slim center'>
                    <div class='col slim center'>
                    <h2>「英語でなんて表現すれば良いかわからない」<br/><br/>「自分の英語のどこが間違っているんだろう」<br/><br/>「正しい発音がわからない」</h2>

                    </div>
                    <p/>{text[1]}
                </div>
              </div>
              <div id='concept'  class='master-row dark'>
                <div class='row'><h1 class='col'>CONCEPT</h1></div>
                <div class='row'>
                  <div class='col slim center'>
                  CHATSHACKでは、これらの問題を解決することができます。
会話はインストラクターがリードし、分からない英語については１つ１つ説明し、お客様が理解した上で、会話を続けます。なので、英会話に自信がない人や、正しく自然な英語を学びたい人は是非ともお試しください。
                  </div>
                </div>
                <div class='row'>
                    <div class='col slim center border'>
                    AFTERNOON
                        <h2>ENGLISH + CAFE</h2>
                        <p/>ゆっくりできるカフェスペースにて、自由に英会話を楽しめます！会話はインストラクターがリードするので、不安な方でも楽しくご利用いただけます。
                        <p/>FREE! coffee or tea
                        <p/>1000yen/30min
                        <p/>10AM - 6PM
                    </div>
                    <div class='col slim center border'>
                    EVENING
                        <h2>ENGLISH + BAR</h2>
                        <p/>季節のクラフトビールや、自家製のソーセージをつまみながら英会話を楽しめます！外国のバーにいるような雰囲気で楽しくインストラクターがあなたの英語をレベルアップしてくれます。
                        <p/>FREE! 1 drink
                        <p/>2500yen/UNLIMITED
                        <p/>6PM - 12AM
                    </div>
                </div>
                <div class='row'><p/></div>
              </div>
              <div id='merit' class='master-row mid'>
                  <div class='row'><h1 class='col'>MERIT</h1></div>
                  <div class='row'>
                        <div class='col slim'>
                            <span class='material-icons'>school</span>
                            <div class='col'>自由なテーマで楽しめる！テキストを使わず、自由な会話をベースとしたスタイルなので、あなたの知りたいことや話したいことをテーマにして英会話を楽しめます。</div>
                        </div>
                        <div class='col slim'>
                            <span class='material-icons'>more_time</span>
                            <div class='col'>いつでも参加できる！好きな時間に来店し自由に英会話へ参加ができ、好きな時間に退出ができます！</div>
                        </div>
                        <div class='col slim'>
                            <span class='material-icons'>savings</span>
                            <div class='col'>入会費、テキスト代などの費用が要らない！他社英会話教室などには入会金やテキスト代等ございますが、当店は入場料のお支払のみでご参加いただけます！</div>
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
                          <input ref={first} class='form-control' minlength='1' placeholder='First Name'/>
                          <input ref={last} class='form-control' minlength='1' placeholder='Family Name'/>
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
              <div id='access' class='row'>
                <div class='col'>
                  <Map/>
                </div>
              </div>
              <div id='team' class='row dark'>
                <div class='master-row slim'>
                    <h1 class='col'>TEAM</h1>
                    <div class='row center'>
                        <div class='col slim'>
                            <img class='avatar' src={shunsuke}></img>
                            <h2>SHUNSUKE</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'>Legal, Supply Chain, Food & Beverage, Funding, External Communications</span>
                            Born in Japan. Speaks 3 language. Lived in Canada and China. Likes travelling and has friends all over the world!
                        </div>
                        <div class='col slim'>
                            <img class='avatar' src={matt}></img>
                            <h2>MATT</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'> Research, Product, Branding & Marketing, Finance, HR, Tech</span>
                            Born in Canada. Speaks 1.5 languages. Lived in 5 countries. Has too many hobbies & interests - at least 5!
                        </div>
                    </div>
                </div>
            </div>
          </div>
          </div>
      )
  }
const Map = ()=>{
  const [location, setLocation] = useState({
    address:'2-chōme-4-12 Kudanminami, Chiyoda City, Tokyo 102-0074, Japan',
    lat:35.693535,
    lng:139.744438
  })

  useEffect(()=>{
    setLocation({
      // address:'2-chōme-4-12 Kudanminami, Chiyoda City, Tokyo 102-0074, Japan',
      lat:35.693535,
      lng:139.744438
    })
  },[])
  return (
    <div id='map'>
        {location?<GoogleMapReact bootstrapURLKeys={{key:'AIzaSyBX-HH0dhkemDet_G5TTZsR__uphcOEI6k'}} defaultCenter={location} defaultZoom={15}>
            <LocationPin lat={location.lat} lng={location.lng} text='ChatShack'/>
        </GoogleMapReact>:'loading'}
    </div>
  )

}
const LocationPin=({text})=>{
  return <span class='material-icons'>location_on</span>
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
