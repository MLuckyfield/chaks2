import girlsnight from '../../event_girlsnight.jpg'
import party from '../../event_party.jpg'
import dj_night from '../../dj_night.jpg'
import event_game from '../../event_game.jpg'


import AccessDisplay from '../nav/AccessDisplay'


const EventsPage = () => {


  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage: 'url('+event_game+')'}}>
            <div class='overlay'>
                <div class='row'>
                  <div class='col'>
                    <h1 class='logo-basic'>GAMES NIGHT!</h1>
                    <h3>WEDNESDAY 7/6</h3>
                  </div>
                </div>
            </div>
      </div>
          <div class='col'>
                <div class='col slim'>
                    <h1 class='col'>CONCEPT</h1>
                    ゲームを通して国際交流を楽しみましょう🎲
                    イベント中は日本産のクラフトビールや様々な国のファストフードをご提供しています🌭
                    *ビール以外にもハイボールやゆず蜜サワーなどご用意あります
                    <br/><br/>
                    ◆このイベントに来るべき理由🎉
                    ・外国人の友達が作れます！
                    ・ダーツやボードゲームを楽しめます！
                    ・ゲームを通して英語がもっと上手になります！
                    ・クラフトビールや美味しい料理も楽しめます！
                    <br/>
                    🌟途中参加途中退場可能です！ お友達と一緒でもおっけい！

                </div>
                <div class='col_up slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>DETAILS</h1>
                    19:30時～23時<br/>
                    入場料：¥1,000<br/>
                    *ワンドリンクオーダー制<br/>
                </div>
                <div class='col_up slim'>
                    <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                    <div class='col'>
                        <div class='fixed-row'>
                          <img class='photo' src={party}></img>
                          <div class='col' style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                            <h3>Beer Party!</h3>
                            7/15
                          </div>
                        </div>
                    </div>
                    <div class='col'>
                        <div class='fixed-row'>
                          <img class='photo' src={girlsnight}></img>
                          <div class='col' style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                            <h3>Ladies Night!</h3>
                            7/20
                          </div>
                        </div>
                    </div>
                    <div class='col'>
                        <div class='fixed-row'>
                          <img class='photo' src={dj_night}></img>
                          <div class='col' style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                            <h3>DJ Night!</h3>
                            7/29
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
