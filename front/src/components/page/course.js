import Signup from "../user/Signup";
import background from '../../online_background.jpg'
import environment from '../../online_environment.jpg'
import ReactPlayer from 'react-player/youtube'
import discount from '../../discount.jpg'
import vincent from '../../vincent.jpg'
import bre from '../../bre.jpg'
import info from '../../output.png'

const Online_Landing = () => {

  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage:'url('+background+')'} }>
        <div class='overlay'>
            <div class='row'>
              <div class='col'>
                <h1 style={{fontSize:'2em'}}>プレミアム<br/>オンライン<br/>英会話</h1>
                <h2>Coming soon!</h2>
              </div>
            </div>
        </div>
      </div>
      <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)'}}>
            <div class='col border'>
                    <h1>コース型レッスンとは</h1>
                    <p>毎週決まった日時に決まったテーマを中心にレッスンをいたします！

コースの種類は、文法（初級～中級）、日常英会話（初級～上級）、ビジネス英語、TOEIC対策コースなどがあります。

日時はコースによって違いますので、以下よりご確認ください！</p>
            </div>
        </div>
      </div>
      <div id="values" class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',paddingTop:'10%',color:'black'}}>
          <h2>Why CHATSHACK Courses?</h2>
          <h1>3つのメリット</h1>
          <div class='row' style={{marginTop:'5%'}}>
              <div class='col'>
                <div class='fixed-row align' style={{marginBottom:'10%'}}>
                  <span class="material-icons green" style={{fontWeight:'1000'}}>done</span><h2>決まった日時にレッスンを行うのでコミットしやすい！</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>自分の弱点を集中的に克服できる！</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>レッスンの内容が週ごとにレベルアップするので、成長を実感できる！</h2>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',color:'black'}}>
          <div class='col border'>
              <h1 style={{margin:'10% 0'}}>楽しむ方法は簡単</h1>
              <div class='row center align'>
                      <div class='col'>
                        <span class="custom_icon">1</span>
                        <p>下記より無料登録を行ってください</p>
                      </div>
                      <div class='col'>
                        <span class="custom_icon">2</span>
                        <p>登録後、右上のコース詳細ページより、受講したいコースやコース日をご確認ください</p>
                      </div>
                      <div class='col'>
                        <span class="custom_icon">3</span>
                        <p>受講したいコースの "申し込み" をクリックし、受講規約をご確認の上、決済を完了してください</p>
                      </div>
                      <div class='col'>
                        <span class="custom_icon">4</span>
                        <p>レッスンのお時間になりましたら、コース詳細ページより"レッスンへ参加"をクリックし、ZOOMにてレッスンへご参加ください</p>
                      </div>
              </div>
          </div>
        </div>
      </div>
      {localStorage.getItem('user')?''
        :<Signup redirect={'/dash'} segment={'offline'} message={'CHATSHACKの最新情報を知りたい方はこちら！特別割引、キャンペーン情報、イベント招待など、お届けします！登録することで先生からのフィードバックが見れたり、予約システムの利用も可能になります！'}/>
      }
    </div>
)}

export default Online_Landing;
