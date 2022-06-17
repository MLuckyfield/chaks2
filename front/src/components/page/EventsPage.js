import girlsnight from '../../event_girlsnight.jpg'
import party from '../../event_party.jpg'

import AccessDisplay from '../nav/AccessDisplay'


const EventsPage = () => {


  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage: 'url('+party+')'}}>
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
                    クラフトビールを片手に英語を話して、国際交流を楽しみましょう！
                    国際色豊かなファストフードの提供もしています！<br/>
                    <div class='row'>
                      <div class='col'>
                        このパーティーに来るべき理由🎉
                        <ul class='normal'>
                          <li>- 外国人の友達が作れます！</li>
                          <li>- クラフトビールを楽しめます！</li>
                          <li>- 英語がもっと上手になります！</li>
                          <li>- そして週末を新しい出会いと一緒にお祝いできます！</li>
                        </ul>
                      </div>
                      <div class='col'>
                        <ul class='normal'>
                          <li>- すべてのビールが何杯飲んでも150円引き！</li>
                          <li>- 最大で９種類のビールを提供しています。</li>
                          <li>- 途中参加途中退場可能です！</li>
                          <li>- お友達と一緒でもおっけい！</li>
                        </ul>
                      </div>
                    </div>
                    *ワンドリンクオーダー制<br/>
                    *ビール以外にもハイボールやゆず蜜サワーなどご用意あります
                </div>
                <div class='col_up slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>DETAILS</h1>
                    <div class='col'>
                      割引後のビール料金:
                      <ul class='normal'>
                        <li>M size 700円</li>
                        <li>S size 350円</li>
                      </ul>
                    ◆5000円で飲み放題も可能です。
                    </div>
                </div>
                <div class='col_up slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                    <div class='col'>
                        LADIES NIGHT! Stay tuned for more information!
                        <div class='fixed-row'>
                          <div class='col' style={{backgroundImage: 'url('+girlsnight+')'}}></div>
                          <div class='col' style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>

                            <h3>Coming Soon!</h3>
                          </div>
                        </div>
                    </div>
                </div>
          </div>
      <AccessDisplay/>
    </div>
)
}

export default EventsPage;
