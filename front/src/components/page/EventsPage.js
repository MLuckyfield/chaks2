import banner from '../../banner.jpg'
import AccessDisplay from '../nav/AccessDisplay'


const EventsPage = () => {


  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage: 'url('+banner+')'}}>
            <div class='overlay'>
                <div class='row'>
                  <div class='col'>
                    <h1 class='logo-basic'>INTERNATIONAL BEER PARTY！</h1>
                    <h3>FRIDAY 6/24</h3>
                  </div>
                </div>
            </div>
      </div>
          <div class='col'>
                <div class='col slim'>
                    <h1 class='col'>CONCEPT</h1>
                    <div class='col'>
                    クラフトビールを片手に英語を話して、国際交流を楽しみましょう！
                    国際色豊かなファストフードの提供もしています！<br/>
                    <p>このパーティーに来るべき理由🎉<br/>
                    ・外国人の友達が作れます！<br/>
                    ・クラフトビールを楽しめます！<br/>
                    ・英語がもっと上手になります！<br/>
                    ・そして週末を新しい出会いと一緒にお祝いできます！</p>
                    <p>
                    ✔️すべてのビールが何杯飲んでも150円引き！<br/>
                    ✔最大で９種類のビールを提供しています。<br/>
                    ✔途中参加途中退場可能です！ お友達と一緒でもおっけい！</p>
                    *ワンドリンクオーダー制<br/>
                    *ビール以外にもハイボールやゆず蜜サワーなどご用意あります
                    </div>
                </div>
                <div class='col slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>DETAILS</h1>
                    <div class='col'>
                    割引後のビール料金:
                    <p>M size 700円<br/>
                    S size 350円<br/>
                    ◆5000円で飲み放題も可能です。</p>
                    </div>
                </div>
                <div class='col slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                    <div class='col'>
                    LADIES NIGHT! Stay tuned for more information!
                    </div>
                </div>
          </div>
      <AccessDisplay/>
    </div>
)
}

export default EventsPage;
