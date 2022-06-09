
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import Carousel from 'react-responsive-carousel'
import axios from 'axios';

//import components
import Login from './components/user/Login'
import Signup from './components/user/Signup'
import Navbar from './components/nav/Navbar'
import AdminDash from './components/nav/AdminDash'
import SecureRoute from './components/nav/SecureRoute'
import AccessDisplay from './components/nav/AccessDisplay'
import AuthDataProvider from "./components/auth-provider";
import StudentComments from './components/user/StudentComments'
import BlogPosts from './components/blog/BlogPosts'
import Blog from './components/blog/Blog'
import BlogFront from './components/blog/BlogFront'
import BlogDisplay from './components/blog/BlogDisplay'
import microsoft_clarity from './components/microsoft_clarity'
//import styles
import './scss/main.scss'
import twitter from './sns_logos/twitter_dark.png'
import youtube from './sns_logos/yt_dark.png'
import instagram from './sns_logos/insta_dark.jpg'
import banner from './banner.jpg'
import shunsuke from './shunsuke.jpg'
import matt from './matt.jpg'
import nerea from './nerea.jpg'
import sonja from './sonja.jpg'

const App = () => {

    useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-KSPWEELDL9";
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = "microsoft_clarity";
    // script2.async = true;
    document.head.appendChild(script2);
    // return () => {
    //   document.head.removeChild(script);
    // }
  }, []);


    return (
      <Router>
        <Navbar/>
        <div class='nav-filler'>
        </div>
          <Route exact path="/" component={Front}/>
          <Route path="/signup" component={Signup}/>
          <Route exact path="/blog" component={BlogFront}/>
          <Route exact path="/blog/*" component={BlogDisplay}/>
          <AuthDataProvider>
            <SecureRoute path="/login" access={['user']} success={AdminDash} fail={Login}/>
            <SecureRoute path="/dash" access={['user','teacher','manager','admin']} success={AdminDash} fail={Login}/>
            <SecureRoute path="/student" access={['teacher','manager','admin']} success={StudentComments} fail={Login}/>
            <SecureRoute path="/manage-blog" access={['teacher','manager','admin']} success={BlogPosts} fail={Login}/>
            <SecureRoute path="/new-blog" access={['teacher','manager','admin']} success={Blog} fail={Login}/>
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
      const password = useRef('');
      const [msg,setMsg] = useState()

      const onSubmit = (e) => {
        e.preventDefault();

        axios.post('user/new',
          {
            email: email.current.value,
            first:first.current.value,
            password:password.current.value,
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


              <div id='header' class='transparent' style={{backgroundImage: 'url('+banner+')'}}>
                    <div id='overlay'>
                        <div class='row'>
                          <div class='col'>
                            <h1 class='logo-basic'>６月7日にオープン予定！</h1>
                          </div>
                        </div>
                    </div>
              </div>
              <div id='intro' class='master-row'>
              <div class='row '>
                <div class='col slim center'>
                    <div class='col slim center'>
                    <p/>こんな悩みはありませんか？
                    <h2>英語を話す自信がない, 正しい発音が分からない, 英語を話す機会が欲しい</h2>

                    </div>
                    <p/>
                    学校で英語を学んでも、英会話スクールに通っても、英語を話す自信を持つのは難しいと思います。
また、英語の読み書きには自信があっても、リスニングとスピーキングが苦手な方が多いと思います。


これらはきっと、気軽に楽しく英語を話す機会があれば解決できると私たちは思っています。
私たちは、そんな場所を提供しています。
                </div>
              </div>
              <div id='concept'  class='master-row dark'>
                <div class='row'><h1 class='col'>CONCEPT</h1></div>
                <div class='row'>
                  <div class='col slim center'>
                  CHATSHACKは、東京にある英会話カフェ＆英会話バーです。
当店では英会話は講師がリードし、気になる発音や文法などは１つ１つ説明するようにしています。
なので、英会話に自信がない人や正しい自然な英語を学びたい人はぜひお越しください！初心者も大歓迎！
                  </div>
                </div>
                <div class='row'>
                    <div class='col slim center border'>
                    AFTERNOON
                        <h2>ENGLISH + CAFE</h2>
                        <p/>雰囲気あるカフェスペースにて、英会話を楽しみましょう！会話は講師陣がリードするので、不安な方でも楽しくご利用いただけます！
                        <p/>FREE! coffee or tea
                        <p/>¥1,000/30分 （最大料金 ¥5,000円）
                        <p/>10AM - 6PM
                    </div>
                    <div class='col slim center border'>
                    EVENING
                        <h2>ENGLISH + BAR</h2>
                        <p/>国際色豊かなファストフードや季節のクラフトビールを片手に英会話を楽しみましょう！カフェよりもカジュアルで自由な雰囲気なので、気軽に楽しめます！
                        <p/>FREE! 1 drink （アルコールを含む）
                        <p/>¥2,500/時間制限なし
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
                            <div class='col'>生の英会話を楽しめる！テキストを使わず、自由な会話をベースとしたスタイルなので、あなたの知りたいことや話したいことをテーマにして生の英会話を楽しめます。</div>
                        </div>
                        <div class='col slim'>
                            <span class='material-icons'>more_time</span>
                            <div class='col'>いつでも参加できる！好きな時間に来店し自由に英会話へ参加ができ、好きな時間に退出ができます！</div>
                        </div>
                        <div class='col slim'>
                            <span class='material-icons'>savings</span>
                            <div class='col'>入会費、テキスト代が要らない！他社英会話教室には入会金やテキスト代等ありますが、当店は入場料の支払いのみでご参加いただけます！</div>
                        </div>
                  </div>
              </div>
              <div class='col'>
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
                          <input ref={first} class='form-control' minlength='1' placeholder='First Name'/>
                          <input ref={last} class='form-control' minlength='1' placeholder='Last Name'/>
                        </div>
                        <div class='row'>
                          <input ref={email} class='form-control' type='email' placeholder='Email'/>
                        </div>
                        <div class='row'>
                          <input ref={password} class='form-control' type='Password' placeholder='Password'/>
                        </div>
                          {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                          <div class='row'>
                              <button class='form-control solid-first' type="submit">Sign Up</button>
                          </div>
                    </div>
                  </form>
                </div>
                <div class='fixed-row'>
                  <div class='col'><img class='nav-logo' onClick={()=>window.location.href='https://instagram.com/chatshack/'} src={instagram} alt="English education and event information!"></img></div>
                  <div class='col'><img class='nav-logo' onClick={()=>window.location.href='https://twitter.com/CHATSHACK_Tokyo'} src={twitter} alt="Newest event and schedule information here!"></img></div>
                  <div class='col'><img class='nav-logo' onClick={()=>window.location.href='https://www.youtube.com/channel/UCjGUSfvKKj72blxyqusTRRg'} src={youtube} alt="English entertainment!"></img></div>
                </div>
              </div>
              <AccessDisplay/>
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
                            <span class='subtitle'>Legal, Supply Chain, Funding, Communications</span>
                            Born in Japan. Speaks 3 languages. Lived in Canada and China. Likes travelling and has friends all over the world!
                        </div>
                        <div class='col slim'>
                            <img class='avatar' src={matt}></img>
                            <h2>MATT</h2>
                            <h3>CO-FOUNDER</h3>
                            <span class='subtitle'> Research, Product, Branding, Finance, HR, IT</span>
                            Born in Canada. Went to 11 schools within 12 years in 5 countries. Has too many hobbies & interests - ask me!
                        </div>
                    </div>
                    <div class='row center'>
                        <div class='col slim'>
                            <img class='avatar' src={nerea}></img>
                            <h2>NEREA</h2>
                            <h3>INSTRUCTOR</h3>
                            Born in Spain. Lived in 4 countries. 12 years of English teaching experience with a Masters in Education. Loves travel, photography, wearing kimonos, and more!
                        </div>
                        <div class='col slim'>
                            <img class='avatar' src={sonja}></img>
                            <h2>SONJA</h2>
                            <h3>INSTRUCTOR</h3>
                            Born in the US. 2 years of English teaching experience. Avid Youtuber. Loves karaoke, dancing, cosplay and more!
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
      <div class='accordion_item'>
        <div class='accordion-title' onClick={() => setIsActive(!isActive)}>
          <h2>{title}</h2>
        </div>
        {isActive && <div class='accordion-content'>{content}</div>}
      </div>

    )
    }



export default App;
