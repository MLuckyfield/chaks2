import banner from '../../banner.jpg'

const EventsPage = () => {


  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage: 'url('+banner+')'}}>
            <div class='overlay'>
                <div class='row'>
                  <div class='col'>
                    <h1 class='logo-basic'>INTERNATIONAL PARTY！ FRIDAY 6/24</h1>
                  </div>
                </div>
            </div>
      </div>
      <div id='merit' class='master-row mid'>
          <div class='row'>
                <div class='col slim'>
                    <h1 class='col'>CONCEPT</h1>
                    <div class='col'>クラフトビールを片手に英語を話して、国際交流を楽しみましょう！
国際色豊かなファストフードの提供もしています！<br/>
                    このパーティーに来るべき理由🎉
                    ・外国人の友達が作れます！
                    ・クラフトビールを楽しめます！
                    ・英語がもっと上手になります！
                    ・そして週末を新しい出会いと一緒にお祝いできます！<br/>
                    ✔️すべてのビールが何杯飲んでも150円引き！
                    ✔最大で９種類のビールを提供しています。
                    ✔途中参加途中退場可能です！ お友達と一緒でもおっけい！<br/>
                    *ワンドリンクオーダー制
                    *ビール以外にもハイボールやゆず蜜サワーなどご用意あります
                </div>
                </div>
                <div class='col slim'>
                    <h1 class='col'>DETAILS</h1>
                    <div class='col'>
                    割引後のビール料金
                    M size 700円
                    S size 350円
                    ◆5000円で飲み放題も可能です。
                    </div>
                </div>
          </div>
      </div>
    </div>
)
}

export default EventsPage;
