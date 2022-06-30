import twitter from '../../sns_logos/twitter_dark.png'
import youtube from '../../sns_logos/yt_dark.png'
import instagram from '../../sns_logos/insta_dark.jpg'

const Product_Display = (props)=>{

  return (
          <div id="price">
            <div class="plan">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>グループ</h3>
                  <div class="price">¥330~<span>/60分</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li>予約不要で少人数のグループレッスン！
入会費、テキスト代はなしで、来たいときに滞在した分だけの支払い！</li>
                    <li><strong>レッスン時間</strong>30分~</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">店頭でのお支払い（カード払い可能）</a>
                </div>
              </div>
            </div>
            <div class="plan standard">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>マンツーマン</h3>
                  <div class="price">¥5,000<span>/45分</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li>マンツーマン英会話で朝活をしましょう！ビジネス英語、TOEFL対策などお客様の希望に沿ったレッスンを提供します！</li>
                    <li>利用可能時間：7時～10時</li>
                    <li><strong>レッスン時間</strong>45分~</li>
                    <li><strong>※支払方法：ポイント制</strong> ポイントはマンツーマンレッスンを予約する際に利用します。100ポイントの購入から可能です。100ポイント=1レッスン</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
            <div class="plan ultimite">
              <div class="plan-inner">
              <div class="hot">週3回以上ならお得！</div>
                <div class="entry-title">
                  <h3>英会話放題</h3>
                  <div class="price">¥30,000<span>/月</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li><strong>英語力の飛躍的向上を目指している方は通い放題コース！
通常の英会話カフェ＆バーでのグループレッスンを時間制限なしで受講し放題！
これから留学を考えている方や、外資系への転職を考えている人などへ向けたプランです！</strong></li>
                    <li>
                        利用可能時間：10時～23時
                        <br/>
                        最終入店時間:22時
                    </li>
                    <li><strong>レッスン時間</strong>無制限~</li>
                  </ul>
                </div>
                <div class="btn">
                  <a href="#">Order Now</a>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Product_Display;
