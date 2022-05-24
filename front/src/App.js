
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import axios from 'axios';
import GoogleMapReact from 'google-map-react'
//import components
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import AdminDash from './components/nav/AdminDash'
import AuthDataProvider from "./components/auth-provider";
//import styles
import './scss/main.scss'
import logo from './chatshack.jpg'
import shunsuke from './shunsuke.jpg'
import matt from './matt.jpg'

const App = () => {

    return (
      <Router>
          <Route exact path="/" component={Front}/>
          <Route path="/signup" component={Signup}/>
          <AuthDataProvider>
            <SentryRoute path="/login" access='user' success={AdminDash} fail={Login}/>
            <SentryRoute path="/dash" access='user' success={AdminDash} fail={Login}/>
          </AuthDataProvider>
      </Router>

    )

};

const Front = ()=>{

      const [text, setText] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'このような悩みありませんか？高校や大学で英語を学んでも、高い英会話スクールに通っていたとしても、英語を話すことに自信を持つのは難しいでしょう。また、英語の読み書きには自信があっても、リスニングとスピーキングが苦手な方が多いかと思います。きっとそれは、気軽に楽しく英語を話す機会が少ないからなのではないでしょうか？語学交流アプリなどを利用して外国人の友人を作り、英語を話す機会を作ったとしても、きっと彼らはあなたの英語の間違いを１つ１つ丁寧に指摘や修正はしてくれないでしょう。'
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
                      <li><a onClick={navSlide} href="#concept">CONCEPT</a></li>
                      <li><a onClick={navSlide} href="#merit">MERIT</a></li>
                      <li><a onClick={navSlide} href="#access">ACCESS</a></li>
                      <li><a onClick={navSlide} href="#faq">FAQ</a></li>
                      <li><a onClick={navSlide} href="#team">TEAM</a></li>
                  </ul>
                  <div class="burger" onClick={navSlide}>
                      <div class="line1"></div>
                      <div class="line2"></div>
                      <div class="line3"></div>
                  </div>
              </nav>
              <div id='nav-filler'>
              </div>
              <div id='header' class='transparent'>
                    <div id='overlay'>
                        <div class='row'>
                          <div class='col'>
                            <h1 class='logo-basic'>６月初旬にオープン予定！</h1>
                          </div>
                        </div>
                    </div>
              </div>
              <div id='intro' class='master-row'>
              <div class='row '>
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
                        <p/>6PM - 11PM
                    </div>
                </div>
                <div class='row'>
                  *月曜日は休みでございます
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
                          <div class='col'>
                            <div class='row'><h1>SUBSCRIBE</h1></div>
                            <div class='row'>
                              <div class='col'>
                                  Chatshackの最新情報を知りたい方はこちら！プレオープンの招待、特別割引、キャンペーン情報、イベント招待など、お届けします！
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class='row'>
                          <input ref={first} class='form-control' minlength='1' placeholder='名'/>
                          <input ref={last} class='form-control' minlength='1' placeholder='姓'/>
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
              <div id='access' class='master-row mid'>
                <div class='row'>
                  <h1 class='col'>ACCESS</h1>
                </div>
                <div class='row'>
                  <div class='col'>
                    Kudanminami 2-chōme-4-12<br/> Chiyoda City<br/> Tokyo, Japan <br/>102-0074<br/>
                    Email: support@chatshack.jp
                  </div>
                  <div class='col'>
                    九段下駅から徒歩７分<br/>
                    市ヶ谷駅から徒歩８分<br/>
                    半蔵門駅から徒歩１０分<br/>
                    飯田橋駅から徒歩１３分<br/>
                  </div>
                </div>
                <div class='row'>
                    <Map/>
                </div>
              </div>
              <div id='faq'  class='master-row'>
                <div class='row'><h1 class='col'>FAQ</h1></div>
                  <div class='row'>
                    <div class='col slim center'>
                      <Accordion/>
                    </div>
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
                            <span class='subtitle'>Legal, Supply Chain, Food & Beverage, Funding, Communications</span>
                            Born in Japan. Speaks 3 languages. Lived in Canada and China. Likes travelling and has friends all over the world!
                        </div>
                        <div class='col slim'>
                            <img class='avatar' src={matt}></img>
                            <h2>MATT</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'> Research, Product, Branding & Marketing, Finance, HR, Technology</span>
                            Born in Canada. Speaks 1.5 languages. Lived in 5 countries. Has too many hobbies & interests - at least 5!
                        </div>
                    </div>
                </div>
            </div>
          </div>
          </div>
      )
    }
    const Accordion =()=>{
    const accordionData = [{
      title: '普通の英会話教室と何が違うの？',
      content: `普通の英会話教室と違うポイントたくさんありますがその中でも以下の３点が特徴となります。
    1.実際の会話中に英語を教えたり、気軽に英語の質問ができる雰囲気を提供します。
    2.入会が不必要な為、レッスン予約やテキスト代など必要ありません。来たいときに来れて帰りたいときに帰れます！
    3.安い！安くて知りたいことを知れるそんな環境を提供しています！入会金やテキスト代もなく気軽にご利用いただけます。`,
    },
    {
    title: '英会話バーでも英語が学べるの？',
    content: `もちろん英語力を向上していただけます。
    英語を学ぶ場所の提供が私たちの一番の役目です。CHTASHACKでの英会話は自由テーマで行われます。
    なので、英語に関する質問はいつでもできるし、インストラクターも例文や絵などで説明をしてくれます。
    また、バーといっても英会話を楽しむことを大事としているので、音の大きい音楽を流すなどはしません。`,
    },
    {
    title: '他にも安い英会話はありますが、割引などありますか？',
    content: `もちろん私たちより安い英会話教室は存在します！ただ、私たちはより自由に話しやすい環境を提供している自信があります。また、CHATSHACKには入会金や月謝などをお客様から頂戴しておりません。
    割引に関しては今後条件付きで行う予定ではあります！
    最新情報としてお客様へ共有する予定ですのでHPよりメールアドレスの登録をよろしくお願いいたします。`,
    },
    {
    title: '英会話中に飲食をすることは可能ですか？',
    content: `もちろんです！海外のカフェやバーを意識したメニューを提供しております！
    アルコール類はクラフトビールをメインとしハイボールやソフトドリンクもご用意しています。
    食べ物もナチョスやポテトフライなどの食べやすくて美味しいものを提供しています。
    英会話中にはぜひ食べ物や飲み物もお楽しみください！`,
    },
    {
    title: '予約は必要ですか？',
    content: `必要ありません！直接お越しください！`,
    }];



    return (
        <div class='accordion'>
        {accordionData.map(({ title, content }) => (
        <AccordionItem title={title} content={content} />
      ))}
        </div>
    );
    }
    const AccordionItem=({ title, content })=>{
    const [isActive, setIsActive] = useState(false);
    return (
      <div class='accordion-item'>
        <div class='accordion-title' onClick={() => setIsActive(!isActive)}>
          <h2>{title}</h2>
        </div>
        {isActive && <div class='accordion-content'>{content}</div>}
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
      lat:35.69344,
      lng:139.74439
    })
    },[])
    return (
    <div id='map'>
        {location?<GoogleMapReact bootstrapURLKeys={{key:'AIzaSyBX-HH0dhkemDet_G5TTZsR__uphcOEI6k'}} defaultCenter={location} defaultZoom={14}>
            <LocationPin lat={location.lat} lng={location.lng} text='ChatShack'/>
        </GoogleMapReact>:'loading'}
    </div>
    )

    }
    const LocationPin=({text})=>{
    return <div class='map-marker'><span class='material-icons'>location_on</span></div>
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


}

export default App;
