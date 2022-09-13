
import React, { useState, useEffect ,useRef} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect } from 'react-router'
import Carousel from './components/utilities/carousel'
import MiniCarousel from './components/utilities/mini_carousel'
import axios from 'axios';
import Product_Display from './components/utilities/product_display'

//import components
import Login from './components/user/Login'
// import Signup from './components/user/Signup'
import Navbar from './components/nav/Navbar'
import AdminDash from './components/nav/AdminDash'
import SecureRoute from './components/nav/SecureRoute'
import AccessDisplay from './components/nav/AccessDisplay'
import StudentComments from './components/user/StudentComments'
import BlogPosts from './components/blog/BlogPosts'
import Blog from './components/blog/Blog'
import BlogFront from './components/blog/BlogFront'
import BlogDisplay from './components/blog/BlogDisplay'
import Social from './components/utilities/social'
import Booking from './components/utilities/booking'
import Popup from './components/utilities/popup'
import Account from './components/user/account'
// import Payment from './components/utilities/payment'
import Profile from './components/user/Profile'

import google_analytics from './components/google_analytics'
import google_ads from './components/google_ads'
import hotjar from './components/hotjar'

//import pages
import EventList from './components/event/EventList'
import Material_Admin from './components/user/admin'
import CreateEvent from './components/event/CreateEvent'
import CampaignPage from './components/page/CampaignPage'
import StylePage from './components/page/StylePage'
import Statistics from './components/user/statistics'
import {metaTags} from './components/seo'


//import styles
import './scss/main.scss'
import banner from './banner.jpg'
import shunsuke from './shunsuke.jpg'
import event_game from './event_game.jpg'
import matt from './matt.jpg'
import vincent from './vincent.jpg'
import sonja from './sonja.jpg'
import blog_header from './blog_header.jpg'
import campaign_header from './campaign_header.jpg'
import discount from './discount.jpg'

import {QrReader} from 'react-qr-reader'
import QRCode from 'react-qr-code'

const App = () => {

    useEffect(() => {
      metaTags('CHATSHACK','東京にある英会話カフェCHATSHACK。ネイティブスピーカーと一緒に英語を勉強できて、カフェで英会話を実践できます！オンライン英会話よりもリアルな‟生”の英会話を一緒に学びましょう！')

      const analytics_script = document.createElement('script');
      analytics_script.src = "https://www.googletagmanager.com/gtag/js?id=G-9GGD597BC3";
      analytics_script.async = true;
      document.head.appendChild(analytics_script);

      const analytics_script2 = document.createElement('script');
      analytics_script2.src = google_analytics;
      analytics_script2.async = true;
      document.head.appendChild(analytics_script2);

      const ads_script = document.createElement('script');
      ads_script.src = "https://www.googletagmanager.com/gtag/js?id=G-9GGD597BC3";
      ads_script.async = true;
      document.head.appendChild(ads_script);

      const ads_script2 = document.createElement('script');
      ads_script2.src = google_ads;
      ads_script2.async = true;
      document.head.appendChild(ads_script2);

      const heatmap = document.createElement('script');
      heatmap.src = hotjar;
      heatmap.async = true;
      document.head.appendChild(heatmap);

      // const socketio = document.createElement('script');
      // socketio.src = socket;
      // socketio.async = true;
      // document.head.appendChild(socketio);
    }, []);


    return (
      <Router>
        <Navbar/>
        <div class='nav-filler'>
        </div>
          <Route exact path="/" component={Front}/>
          <Route path="/events" component={EventList}/>
          <Route path="/campaigns" component={CampaignPage}/>
          <Route path="/about" component={StylePage}/>
          <Route exact path="/blog" component={BlogFront}/>
          <Route exact path="/blog/*" component={BlogDisplay}/>
          <Route path="/products" component={Product_Display}/>
          <Route path="/login" component={Login}/>
            <SecureRoute path="/dash" access={['user','teacher','manager','admin']} success={AdminDash} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/create-event" access={['manager','admin']} success={CreateEvent} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/account" access={['user','manager']} success={Account} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/student" access={['teacher','manager','admin']} success={StudentComments} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/manage-blog" access={['teacher','manager','admin']} success={BlogPosts} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/manage-event" access={['manager','admin']} success={EventList} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/new-blog" access={['teacher','manager','admin']} success={Blog} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/update_profile" access={['teacher','manager','admin']} success={Profile} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/reservations" access={['user','teacher','manager']} success={Booking} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/material_admin" access={['manager']} success={Material_Admin} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/statistics" access={['manager']} success={Statistics} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/qr-reader" access={['user','teacher','manager']} success={()=><QrReader ViewFinder={()=>{return <div class='qr_viewfinder'></div>}} scanDelay={1000} onResult={(result,error)=>{
              if(!!result){
                // alert(typeof result.text)
                localStorage.setItem('student',result.text)
                window.location='/student'
              }
              if(!!error){
              }
            }} constraints={{facingMode:'environment'}}/>} fail={()=><Redirect to='/login'/>}/>
            <SecureRoute path="/qr-code" access={['user','teacher','manager']} success={()=><QRCode value={localStorage.getItem('user')}/>} fail={()=><Redirect to='/login'/>}/>
      </Router>

    )

};

const Front = ()=>{

      const [text, setText] = useState([
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'このような悩みありませんか？高校や大学で英語を学んでも、高い英会話スクールに通っていたとしても、英語を話すことに自信を持つのは難しいでしょう。また、英語の読み書きには自信があっても、リスニングとスピーキングが苦手な方が多いかと思います。きっとそれは、気軽に楽しく英語を話す機会が少ないからなのではないでしょうか？語学交流アプリなどを利用して外国人の友人を作り、英語を話す機会を作ったとしても、きっと彼らはあなたの英語の間違いを１つ１つ丁寧に指摘や修正はしてくれないでしょう。'
      ])
      const [items, setItems] = useState([{
        picture: banner,
        text:<span>英会話<br/>カフェ&バー</span>,
        subtext:'英会話教室よりもカジュアルに、クオリティーは英会話カフェより高く',
        link:null,
        active:true
      },{
        picture: event_game,
        text:'イベント',
        subtext:'国際交流パーティーやLADIES NIGHT英会話などの最新情報!',
        link:'/events',
        active:false
      },{
        picture: blog_header,
        text:'ブログ',
        subtext:'英語学習をより効率的にする情報を無料で!',
        link:'/blog',
        active:false
      },{
        picture: campaign_header,
        text:'キャンペーン',
        subtext:'お得に英会話を楽しめるキャンペーン情報',
        link:'/campaigns',
        active:false
      }]);

      const mini_carousel=[{
        reviewer:'',
        review:'文法の間違いもしっかりと直してくれました。アットホームなので1人でも気兼ねなく通えます。Poutineというカナダの料理がとても美味しかったです！'
      },{
        reviewer:'',
        review:'フレンドリーな雰囲気で楽しく過ごせました！最初は緊張したのですが、先生や他の生徒の方は優しくて、会話を通して知らない英語を教えてもらい、とても刺激になりました！'
      },{
        reviewer:'',
        review:'正直何時間もいると飽きるかなぁといく前は思いましたが、先生が色々なミニゲームやトピックスを振ってくれるので、2時間いても飽きる事は全くありませんでした。'
      },{
        reviewer:'',
        review:'楽しい雰囲気で過ごせる🍮ご飯も美味しくて英語も学べる良いところ！'
      }]
      const email = useRef('');
      const first = useRef('');
      const last = useRef('');
      const password = useRef('');
      const [msg,setMsg] = useState()
      const [form,setForm] = useState(true)

      const onSubmit = (e) => {
        e.preventDefault();
        setForm(false)
        axios.post('user/new',
          {
            email: email.current.value,
            first:first.current.value,
            password:password.current.value,
            last:last.current.value,
          })
          .then((res) => {
            console.log('response'+res)
            localStorage.setItem('user', JSON.stringify(res.data.result));
            setMsg([res.data.message,res.data.success]);
            window.location='/dash'
          })
          .catch((err) => {
            setForm(true)
            setMsg([err.message,err.success]);
          });
      }
      // <div id='intro' class='master-row'>
      //   <div class='col'>
      //       <div class='col slim center'>
      //       <p/>こんな悩みはありませんか？
      //       <h2>英語を話す自信がない, 正しい発音が分からない, 英語を話す機会が欲しい</h2>
      //
      //       </div>
      //       <p/>
      //       学校で英語を学んでも、英会話スクールに通っても、英語を話す自信を持つのは難しいと思います。
      // また、英語の読み書きには自信があっても、リスニングとスピーキングが苦手な方が多いと思います。
      //
      //
      // これらはきっと、気軽に楽しく英語を話す機会があれば解決できると私たちは思っています。
      // 私たちは、そんな場所を提供しています。
      //       <div class='row'>
      //         <div class='col'><button class='solid-first cta' onClick={()=>window.location='/about'}>Mission</button></div>
      //         <div class='col'><button class='solid-first cta' onClick={()=>window.location='/blog/62bbf3e2f048ac1e59f2856a/私達と他の英会話教室の違いについて'}>他社との違い</button></div>
      //       </div>
      //   </div>
      // </div>

      // <div id='merit' class='master-row mid'>
      //     <div class='row'><h1 class='col'>MERIT</h1></div>
      //     <div class='up_row'>
      //           <div class='col slim'>
      //               <span class='material-icons'>school</span>
      //               <div class='col'>生の英会話を楽しめる！テキストを使わず、自由な会話をベースとしたスタイルなので、あなたの知りたいことや話したいことをテーマにして生の英会話を楽しめます。</div>
      //           </div>
      //           <div class='col slim'>
      //               <span class='material-icons'>more_time</span>
      //               <div class='col'>いつでも参加できる！好きな時間に来店し自由に英会話へ参加ができ、好きな時間に退出ができます！</div>
      //           </div>
      //           <div class='col slim'>
      //               <span class='material-icons'>savings</span>
      //               <div class='col'>入会費、テキスト代が要らない！他社英会話教室には入会金やテキスト代等ありますが、当店は入場料の支払いのみでご参加いただけます！</div>
      //           </div>
      //     </div>
      // </div>
      return (
        <div>
          <Carousel items={items}/>
              <div id='intro' class='row mid'>
                <div class='col'>
                    <div class='col slim center'>
                        <h2>英会話教室よりもカジュアルに、<br/>クオリティーは英会話カフェより高く</h2>
                    </div>
                </div>
              </div>
              <div id='intro' class='master-row' style={{background:'white'}}>
                <div class='col'>
                    <div class='col slim center'>
                        <h1>他の英会話教室とは一味違う</h1>
                    </div>
                    <div class='up_row'>
                          <div class='col'>
                              <span class='material-icons'>school</span>
                              <h2>しっかり学ぶ</h2>
                              <div class='col'>英会話講師経験のあるネイティブスピーカーがホワイトボードを使って正しい英語を 分かりやすく教えてくれます。</div>
                          </div>
                          <div class='col'>
                              <span class='material-icons'>record_voice_over</span>
                              <h2>英語をたくさん話す</h2>
                              <div class='col'>他の英会話カフェではレベルが違ったり、人数が多くて英語を話す機会が少ないことがあります。

当店では、グループはレベル別に分けられ、講師陣は全員が平等に英語を喋れるように会話をリードします。</div>
                          </div>
                    </div>
                    <div class='up_row'>
                          <div class='col'>
                              <span class='material-icons'>trending_up</span>
                              <h2>成長を振り返る</h2>
                              <div class='col'>レッスン後には先生からのフィードバックがオンラインでもらえます。その日に何を学んだのかいつでも振り返ることができます。</div>
                          </div>
                          <div class='col'>
                              <span class='material-icons'>sentiment_very_satisfied</span>
                              <h2>様々な英会話メニュー</h2>
                              <div class='col'>50以上の英会話トピック、10以上の英会話特訓ゲーム、自由な英会話など様々なメニューがあるので、いつでも英語学習を楽しめます。</div>
                          </div>
                    </div>
                    <div class='up_row'>
                          <div class='col'>
                              <span class='material-icons'>sports_bar</span>
                              <h2>国際交流イベント</h2>
                              <div class='col'>グループレッスンで英会話力を向上したら、あなたの英会話力を国際交流イベントでテストしてみましょう。</div>
                          </div>
                          <div class='col'>
                              <span class='material-icons'>schedule</span>
                              <h2>予約不要</h2>
                              <div class='col'>予約は必要ありません。

英会話をしたいときに来て、いつでも退店できるシステムです。</div>
                          </div>
                    </div>
                    <div class='row'>
                      <div class='col'><button class='solid-first cta' onClick={()=>window.location='/about'}>Mission</button></div>
                      <div class='col'><button class='solid-first cta' onClick={()=>window.location='/blog/62bbf3e2f048ac1e59f2856a/私達と他の英会話教室の違いについて'}>他社との違い</button></div>
                    </div>
                </div>
              </div>
              <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover'}}>
                <div class='mini_overlay' style={{backgroundColor:'238,188,33,0.7'}}>
                    <div class='col' style={{width:'70%'}}>
                            <h1 class='emphasize'>1時間<br/>0円!</h1>
                            <h1>初回無料！</h1>
                            <span style={{fontSize:'10px'}}>
                                ※飲食物の注文は別途費用が掛かります<br/>
                                ※１回のみ利用可能
                            </span>
                    </div>
                </div>
              </div>
              <div class='col'>
                  <div class='up_row'>
                    <div class='col'>
                      <div class='fixed-row'><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span></div>
                      <span class='review'>「文法の間違いもしっかりと直してくれました。アットホームなので1人でも気兼ねなく通えます。Poutineというカナダの料理がとても美味しかったです！」</span>
                    </div>
                    <div class='col'>
                      <div class='fixed-row'><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span></div>
                      <span class='review'>「フレンドリーな雰囲気で楽しく過ごせました！最初は緊張したのですが、先生や他の生徒の方は優しくて、会話を通して知らない英語を教えてもらい、とても刺激になりました！」</span>
                    </div>
                    <div class='col'>
                      <div class='fixed-row'><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span></div>
                      <span class='review'>「正直何時間もいると飽きるかなぁといく前は思いましたが、先生が色々なミニゲームやトピックスを振ってくれるので、2時間いても飽きる事は全くありませんでした。」</span>
                    </div>
                    <div class='col'>
                      <div class='fixed-row'><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span><span class='material-icons ratings'>star</span></div>
                      <span class='review'>「楽しい雰囲気で過ごせる🍮ご飯も美味しくて英語も学べる良いところ！」</span>
                    </div>
                  </div>
                  <div class='row'>Google Reviews</div>
              </div>
              <div id='concept'  class='master-row dark'>
                <div class='row'><h1 class='col'>CONCEPT</h1></div>
                <div class='row'>
                  <div class='slim center'>
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
                        <p/>¥1,000/30分
                        <p/>11AM - 6PM
                    </div>
                    <div class='col slim center border'>
                    EVENING
                        <h2>ENGLISH + BAR</h2>
                        <p/>国際色豊かなファストフードや季節のクラフトビールを片手に英会話を楽しみましょう！カフェよりもカジュアルで自由な雰囲気なので、気軽に楽しめます！
                        <p/>FREE! 1 drink （アルコールを含む, 最大８５０円）
                        <p/>¥2,500/時間制限なし
                        <p/>6PM - 10PM (最終入店時間: 9:30PM)
                    </div>
                </div>
                  <div class='col'>
                      *月曜日は休みでございます<br/>
                      *日曜日は１3時からでございます
                      <button class='solid-first cta' onClick={()=>window.location='/products'}>レッスン</button>
                  </div>
                <div class='row'><p/></div>
              </div>
              {localStorage.getItem('user')?'':(
                <div id='signup' class='col'>
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
                            <input ref={first} class='form-control' minlength='1' placeholder='First Name'  required/>
                            <input ref={last} class='form-control' minlength='1' placeholder='Last Name'  required/>
                          </div>
                          <div class='row'>
                            <input ref={email} class='form-control' type='email' placeholder='Email'  required/>
                          </div>
                          <div class='row'>
                            <input ref={password} class='form-control' type='Password' placeholder='Password' required/>
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
                                {form?<button class='form-control solid-first' type="submit">Sign Up</button>:'Loading...'}
                            </div>
                      </div>
                    </form>
                  </div>
                  <Social data={'tiny-logo'}/>
                </div>
              )}
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
                    <div class='up_row center'>
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
                    <div class='up_row center'>
                        <div class='col slim'>
                            <img class='avatar' src={vincent}></img>
                            <h2>VINCENT</h2>
                            <h3>INSTRUCTOR</h3>
                            Born in Canada. Speaks English and French. Loves craft beer, playing guitar, and learning about people!
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
      <div class='accordion_item clickable' onClick={() => setIsActive(!isActive)}>
        <div class='accordion-title'>
          <h2>{title}</h2>
        </div>
        {isActive && <div class='accordion-content'>{content}</div>}
      </div>

    )
    }



export default App;
