import Signup from "../user/Signup";
import CrossSell from "../page/Cross_Sell";
import background from '../../online_background.jpg'
import environment from '../../online_environment.jpg'
import ReactPlayer from 'react-player/youtube'
import discount from '../../online_discount.jpg'
import vincent from '../../vincent.jpg'
import bre from '../../bre.jpg'
import info from '../../output.png'
import campaign from '../../images/sakura.jpg'
import Popup from '../utilities/popup'

const Online_Landing = () => {

  return(
    <div>
    {localStorage.getItem('user')?'':(
      <div class='floating'><a href='#signup'>無料<br/>登録</a></div>
    )}
      <div id='header' class='transparent' style={{backgroundImage:'url('+background+')'} }>
        <div class='overlay'>
            <div class='row'>
              <div class='col'>
                <h1 style={{fontSize:'2em'}}>プレミアム<br/>オンライン<br/>英会話</h1>
                <h2>申込受付中</h2>
              </div>
            </div>
        </div>
      </div>
      <div class='fixed-row' style={{backgroundImage: 'url('+campaign+')',backgroundSize:'cover',backgroundColor:'rgba(255,102,128,0.6)',color:'white'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0',display:'flex'}}>
          <div class='col w20'>
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>新規入会<br/>キャンペーン</span>
          </div>
          <div class='col w80 align'>
            <p>今なら</p>
            <h1>初月３０％割引!</h1>
            <p style={{marginBottom:'3%'}}>期間限定 4月2日～4月30日</p>
            <Popup button={"詳細"} num={2} content={
              <div class='col'>
                  <h1 style={{margin:'10% 0'}}>初月３０%割引</h1>
                  <p>3月中にご契約されるお客様には３０％割引が適用されます！</p>
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
      <div id="concept" class='col slim'>
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
      <div id="values" class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',paddingTop:'10%',color:'black'}}>
          <h2>Why CHATSHACK ONLINE?</h2>
          <h1>６つの理由</h1>
          <div class='row' style={{marginTop:'5%'}}>
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
          <div class='col slim'>
            <h1 style={{margin:'10% 0'}}>選び抜かれた<br/>講師陣</h1>
            <p>合格率２％のテストに合格した講師のみを採用しています。
そんな選び抜かれた講師達がレッスンを提供いたします！</p>
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
      <div id='intro' class='row' style={{color:'white',backgroundImage: 'url('+discount+')',backgroundSize:'cover',backgroundPosition:'center'}}>
        <div class='mini_overlay yellow'>
            <div class='col' style={{width:'70%',alignItems:'normal'}}>
                    <h1 class='emphasize' style={{textAlign:'left'}}>30分<br/>0円!</h1>
                    <h1 style={{textAlign:'left'}}>初回無料</h1>
                    <h2 style={{textAlign:'left'}}>気軽に申し込むください!</h2>
                    <span style={{fontSize:'20px',border:'1px solid white',padding:'1% 3%',margin:'3% 0% 5% 0%',width:'max-content'}}>
                        通常料金: 30分￥2000<br/>
                        サブスクスタイル!<br/>
                    </span>
            </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.93)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw',color:'black'}}>
          <div class='col'>
            <h1 style={{margin:'10% 0'}}>利用までの流れ</h1>
            <p>申込受付中!</p>
          </div>
          <div class='fixed-row clean_center'>
            <span class="material-icons green ">looks_one</span>
              <div class='col align'>
                <p>下記より無料登録して</p>
                <h2>体験レッスンを申し込む</h2>
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
      <CrossSell/>
      {localStorage.getItem('user')?
        <div class="btn" style={{position:'relative'}} onClick={(e)=>{e.preventDefault();window.location='/private'}}>予約!</div>
        :<Signup redirect={'/private'}
                segment={'online'}
                message={'オンラインレッスンのリリース情報などはこちらから！特別割引やキャンペーン情報なども、お届けします！ご登録頂くと、オンラインレッスンリリース後に予約システムの利用が可能になります！'}/>
      }
    </div>
)}

export default Online_Landing;
