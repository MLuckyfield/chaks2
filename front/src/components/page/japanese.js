import React, { useState, useEffect ,useRef} from 'react';
import {axios} from "../../utilities/axios";
import AccessDisplay from '../nav/AccessDisplay'
import Signup from '../user/TrialRequest'
import Popup from '../utilities/popup'
import ReactPlayer from 'react-player/youtube'
import environment from '../../online_environment.jpg'
import banner from '../../banner.jpg'
import event_game from '../../event_game.jpg'
import blog_header from '../../blog_header.jpg'
import campaign_header from '../../campaign_header.jpg'
import discount from '../../discount.jpg'
import campaign from '../../images/sakura.jpg'
import atmos from '../../atmosphere.jpg'

const Japanese = ()=>{

      const email = useRef('');
      const first = useRef('');
      const last = useRef('');
      const password = useRef('');
      const [msg,setMsg] = useState()
      const [form,setForm] = useState(true)

      useEffect(()=>{
        if(localStorage.getItem('user')){}
        else{
          localStorage.removeItem('year')
          localStorage.removeItem('month')
          localStorage.removeItem('day')
          localStorage.removeItem('hour')
        }
      },[])
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
      return (
        <div>
        {localStorage.getItem('user')?'':(
          <div class='floating'><a href='#signup'>無料<br/>体験</a></div>
        )}
        <ReactPlayer
            url='https://www.youtube.com/watch?v=qgLZwUiLfAs'
            playing={true} volume={0} muted={true} width={'100%'} height={'60vh'}
            playIcon={
              <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center'}}>
                <div class='col'>
                  <h1 style={{margin:'2%'}}>楽しく身につく<br/>新しい形の英会話</h1>
                  <button style={{width:'50%',color:'white',backgroundColor:'black', margin:'2%',border:'1px solid black',fontWeight:'550'}}>コンセプトを見る</button>
                </div>
              </div>
            } light={banner}/>
            <div class='fixed-row' style={{backgroundImage: 'url('+campaign+')',backgroundSize:'cover',backgroundColor:'rgba(255,102,128,0.6)',color:'white'}}>
              <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0',display:'flex'}}>
                <div class='col w20'>
                  <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>新規入会<br/>キャンペーン</span>
                </div>
                <div class='col w80 align'>
                  <p>For a limited time</p>
                  <h1>Get ３０％ off your first month!</h1>
                  <p style={{marginBottom:'3%'}}>Promotional period: 6/1 to 6/30</p>
                  <Popup button={"詳細"} num={2} content={
                    <div class='col'>
                        <h1 style={{margin:'10% 0'}}>初月３０%割引</h1>
                        <p>4月中にご契約されるお客様には３０％割引が適用されます！</p>
                        <div class='col'>
                            <div class='fixed-row'>
                                <div class='col align'>
                                  <h2>割引例</h2>
                                  <ul>
                                    <li>４時間プラン：通常8,000円が3月限定で5,600円</li>
                                    <li>８時間プラン：通常16,000円が3月限定で11,200円</li>
                                    <li>１２時間プラン：通常24,000円が3月限定で16,800円</li>
                                  </ul>
                                </div>
                            </div>
                            <div class='fixed-row'>
                                <div class='col align'>
                                  <h2>学生限定</h2>
                                  <p>さらに！！学生様には追加で１０％割引が適用されます！</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  }/>
                  </div>
                </div>
            </div>
            <div id='concept' class='master-row' style={{background:'white',color:'white',paddingTop:'0'}}>
              <div class='col' style={{backgroundImage: 'url('+atmos+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',margin:'0',width:'100%'}}>
                  <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)',width:'100%',margin:'0'}}>
                  <div class='col slim center'>
                      <h2>2 Key Features of Premium</h2>
                      <h1 style={{padding:'5%',border:'1px solid white'}}>Japanese Conversation</h1>
                  </div>
                  <div class='up_row'>
                    <div class='col'>
                        <p>More</p>
                        <h1>EFFECTIVE</h1>
                        <p>Than a conversation cafe</p>
                        <div class='list'>
                          <div class='list_row'>
                            <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                            <div class='w80'>Trainined instructors</div>
                          </div>
                          <div class='list_row'>
                            <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                            <div class='w80'>Same level groups</div>
                          </div>
                          <div class='list_row'>
                            <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                            <div class='w80'>Small group sizes (max 4)</div>
                          </div>
                          <div class='list_row'>
                            <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                            <div class='w80'>Get feedback online after each lesson</div>
                          </div>
                        </div>
                    </div>
                    <div class='col'>
                      <p>More</p>
                      <h1>ENGAGING</h1>
                      <p>Than a language school</p>
                      <div class='list'>
                        <div class='list_row'>
                          <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                          <div class='w80'>予約不要</div>
                        </div>
                        <div class='list_row'>
                          <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                          <div class='w80'>30minute time blocks</div>
                        </div>
                        <div class='list_row'>
                          <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                          <div class='w80'>Cafe/Bar style ambience</div>
                        </div>
                        <div class='list_row'>
                          <div class='w20'><span class="custom_icon"><span class='material-icons'>done</span></span></div>
                          <div class='w80'>Enjoy craft beer on tap (after 6pm)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
              </div>
            </div>
              <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
                <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',color:'black'}}>
                  <div class='col border'>
                      <h1 style={{margin:'10% 0'}}>How It Works</h1>
                      <div class='row center align'>
                              <div class='col'>
                                <span class="custom_icon">1</span>
                                <p>Register for a </p>
                                <h2>Free Trial Lesson!</h2>
                              </div>
                              <div class='col'>
                                <span class="custom_icon">2</span>
                                <p>Decide how many hours to study/month</p>
                                <h2>Subscribe!</h2>
                              </div>
                              <div class='col'>
                                <span class="custom_icon">3</span>
                                <p>Easily book group timeslots</p>
                                <h2>Watch your Japanese grow with a new routine</h2>
                              </div>
                      </div>
                  </div>
                </div>
              </div>
              <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover',backgroundPosition:'center'}}>
                <div class='mini_overlay yellow'>
                    <div class='col' style={{width:'70%',alignItems:'normal'}}>
                            <h1 class='emphasize' style={{textAlign:'left'}}>1st HOUR<br/>0YEN!</h1>
                            <h1 style={{textAlign:'left'}}>First trial is free</h1>
                            <h2 style={{textAlign:'left'}}>Book a trial lesson!</h2>
                            <span style={{fontSize:'20px',border:'1px solid white',padding:'1% 3%',margin:'3% 0% 5% 0%',width:'max-content'}}>
                                通常料金: 30分￥1000<br/>
                                サブスクスタイル!<br/>
                                コーヒー・紅茶込み
                            </span>
                            <Popup button={"割引でお得!"} num={4} content={
                              <div class='col'>
                                  <h1 style={{margin:'10% 0'}}>お得な割引!</h1>
                                  <div class='col'>
                                      <div class='fixed-row' style={{alignItems:'flex-start'}}>
                                          <div class='col w20'>
                                            <span class='custom_icon'>5%</span>
                                          </div>
                                          <div class='col w80 align'>
                                            <h2>友人紹介割引</h2>
                                            <p>ご友人を紹介頂けた場合に本人様とそのご友人に５％の割引を適用します。<br/>
                                            最大２０％割引いたします！（４名まで紹介可能）<br/>
                                            ※契約時間が４時間以上の場合のみ適用<br/></p>
                                          </div>
                                      </div>
                                      <div class='fixed-row'>
                                          <div class='col w20'>
                                            <span class='custom_icon'>10%</span>
                                          </div>
                                          <div class='col w80 align'>
                                            <h2>学生割引</h2>
                                            <p>学生様にはすべての契約時間から１０％割引を適用いたします</p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                            }/>
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

              {localStorage.getItem('user')?'':(
                <Signup redirect={'/dash'} segment={'japanese'} message={'CHATSHACKの最新情報を知りたい方はこちら！特別割引、キャンペーン情報、イベント招待など、お届けします！登録することで先生からのフィードバックが見れたり、予約システムの利用も可能になります！'}/>
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

    export default Japanese
