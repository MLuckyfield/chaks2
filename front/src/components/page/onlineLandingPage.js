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
                <a href="#signup" style={{textDecoration:'none',textAlign:'center',borderRadius:'50%',width:'70px',height:'70px',background:'black',color:'white'}}><span class="material-icons">expand_more</span></a>
              </div>
            </div>
        </div>
      </div>
      <div class='col slim'>
        <div class='col' style={{width:'50%'}}>
          <h1 style={{margin:'10% 0'}}>METHOD</h1>
          <h2>確実に英語を伸ばす</h2>
        </div>
        <div class='row'>
          <img style={{width:'90vw'}} src={info}></img>
        </div>
      </div>
      <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)'}}>
            <div class='col'>
                    <h1>楽しくて満足！</h1>
                    <div class='fixed-row'>
                      <span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span><span class='material-icons ratings_big'>star</span>
                    </div>
                    <div class='row'>
                      <div class='col'>「文法の間違いもしっかりと直してくれました」</div>
                      <div class='col'>「最初は緊張したのですが、先生や他の生徒の方は優しくて、
とても楽しかったです！」</div>
                      <div class='col'>「2時間いても飽きる事は全くありませんでした」</div>
                    </div>
            </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',paddingTop:'10%'}}>
          <h2>Why CHATSHACK ONLINE?</h2>
          <h1>６つの理由</h1>
          <div class='row'>
              <div class='col'>
                <div class='fixed-row align' style={{marginBottom:'10%'}}>
                  <span class="material-icons green" style={{fontWeight:'1000'}}>done</span><h2>選び抜かれた優秀な講師陣</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>マンツーマンにてしっかり指導</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>様々なオリジナル学習コース</h2>
                </div>
            </div>
            <div class='col'>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>成長を振り返れるフィードバック機能</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>ニーズに合わせたレッスン内容</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green " style={{fontWeight:'1000'}}>done</span><h2>自由に選べるレッスン時間</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='row dark'>
        <div class='col slim'>
          <div class='col slim' style={{width:'50%'}}>
            <h1 style={{margin:'10% 0'}}>選び抜かれた講師陣</h1>
            <h2>合格率２％のテストに合格した講師のみを採用しています。
そんな選び抜かれた講師達がレッスンを提供いたします！</h2>
          </div>
          <div class='up_row center' style={{marginTop:'0'}}>
            <div class='col'>
              <img class='avatar' src={vincent}></img>
              <h2>VINCENT</h2>
              <p>カナダ出身。TEFLの資格所持者。英会話講師歴３年。
英語とフランス語が話せます。
趣味は、クラフトビールとギターと人との交流！
</p>
            </div>
            <div class='col'>
              <img class='avatar' src={bre}></img>
              <h2>BRE</h2>
              <p>アメリカ出身。修士号取得中。
趣味は、映画と料理とウィスキーを飲むこと！
Can't wait to meet you!</p>
            </div>
          </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw'}}>
          <div class='col' style={{width:'50%'}}>
            <h1 style={{margin:'10% 0'}}>利用までの流れ</h1>
            <h2>（サービス提供開始は２０２３年２月を想定しています）</h2>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons green ">looks_one</span>
              <div class='col align'>
                <p>無料体験レッスンへ</p>
                <h2>申し込む</h2>
              </div>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons green ">looks_two</span>
              <div class='col align'>
                <p>1か月の利用時間を決めて</p>
                <h2>サブスク登録</h2>
              </div>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons green ">looks_3</span>
              <div class='col align'>
                <p>好きな時に予約して</p>
                <h2>英語力向上</h2>
              </div>
          </div>
        </div>
      </div>
      {localStorage.getItem('user')?
        <div class="btn" style={{position:'relative'}}>購入</div>
        :<Signup redirect={'/https://us9.list-manage.com/survey?u=803e460f5dec6935e2fc8e187&id=b6aaf771a8&attribution=false'}
                segment={'online'}
                message={'オンラインレッスンのリリース情報などはこちらから！特別割引やキャンペーン情報なども、お届けします！ご登録頂くと、オンラインレッスンリリース後に予約システムの利用が可能になります！'}/>
      }
    </div>
)}

export default Online_Landing;
