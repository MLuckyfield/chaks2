import Signup from "../user/Signup";
import background from '../../online_background.jpg'
import environment from '../../online_environment.jpg'
import ReactPlayer from 'react-player/youtube'
import discount from '../../discount.jpg'
import vincent from '../../vincent.jpg'
import bre from '../../bre.jpg'

const Online_Landing = () => {

  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage:'url('+background+')'} }>
        <div class='overlay'>
            <div class='row'>
              <div class='col'>
                <h2>やっと</h2>
                <h1>上級なオンライン英会話</h1>
                <h2>登場</h2>
                <a href="#signup" style={{textDecoration:'none',textAlign:'center',borderRadius:'50%',width:'70px',height:'70px',background:'black',color:'white'}}><span class="material-icons">expand_more</span></a>
              </div>
            </div>
        </div>
      </div>
      <div class='col slim'>
        <div class='fixed-row' style={{width:'50%'}}>
          <h1 style={{margin:'10% 0'}}>METHOD</h1>
        </div>
        <div class='row'>
          <div class='col'>
            INPUT
          </div>
          <div class='col'>
            OUTPUT
          </div>
        </div>
      </div>
      <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)'}}>
            <div class='col'>
                    <h1>安心で楽しい!</h1>
                    <div class='fixed-row'>
                      <span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span>
                    </div>
                    <div class='row'>
                      <div class='col'>「文法の間違いもしっかりと直してくれました」</div>
                      <div class='col'>「2時間いても飽きる事は全くありませんでした」</div>
                      <div class='col'>「2時間いても飽きる事は全くありませんでした」</div>
                    </div>
            </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',paddingTop:'10%'}}>
          <h1>６点の特徴</h1>
          <div class='row'>
              <div class='col'>
                <div class='fixed-row align' style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">done</span><h2>ネイティブスピーカー</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">done</span><h2>マンツーマンレッスン</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">done</span><h2>優秀な講師陣</h2>
                </div>
            </div>
            <div class='col'>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">done</span><h2>オンラインフィードバック</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">done</span><h2>自由なレッスン</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">done</span><h2>選べるレッスン時間</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='row dark'>
        <div class='col slim'>
          <div class='fixed-row' style={{width:'50%'}}>
            <h1 style={{margin:'10% 0'}}>TEACHERS</h1>
          </div>
          <div class='up_row center' style={{marginTop:'0'}}>
            <div class='col'>
              <img class='avatar' src={vincent}></img>
              <h2>VINCENT</h2>
              <p>Born in Canada. TEFL Certified. 3 years teaching experience. Speaks English and French. Loves craft beer, playing guitar, and learning about people!</p>
            </div>
            <div class='col'>
              <img class='avatar' src={bre}></img>
              <h2>BRE</h2>
              <p>Born in the U.S.! Masters degree student. Enjoys watching movies, cooking, and drinking whiskey. Can`t wait to meet you!</p>
            </div>
          </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.8)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw'}}>
          <div class='fixed-row' style={{width:'50%'}}>
            <h1 style={{margin:'10% 0'}}>ラクなご利用方法</h1>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons maroon ">looks_one</span>
              <div class='col align'>
                <p>３０分無料の体験レッスンを</p>
                <h2>申し込む</h2>
              </div>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons maroon ">looks_two</span>
              <div class='col align'>
                <p>一ヶ月に利用したい時間を決めて</p>
                <h2>サブスク登録</h2>
              </div>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons maroon ">looks_3</span>
              <div class='col align'>
                <p>好きな時に予約して</p>
                <h2>英語力向上</h2>
              </div>
          </div>
        </div>
      </div>
      {localStorage.getItem('user')?
        <div class="btn" style={{position:'relative'}}>購入</div>
        :<Signup redirect={'/online'} segment={'online'}/>
      }
    </div>
)}

export default Online_Landing;
