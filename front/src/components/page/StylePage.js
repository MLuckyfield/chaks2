import banner from '../../banner.jpg'
import AccessDisplay from '../nav/AccessDisplay'


const CampaignPage = () => {


  return(
    <div>
      <div id='concept'  class='master-row dark'>
        <div class='row'><h1 class='col'>MISSION</h1></div>
        <div class='row'>
            <div class='col slim'>
              英会話教室よりもカジュアルに、クオリティーは英会話カフェより高く。<br/>英会話を楽しく、身近で、達成感のあるものにすること
            </div>
        </div>
      </div>
      <div class='col mid'><h1 class='col'>WHAT MAKES US DIFFERENT </h1>
        <div class='col slim'>
          <ol>
            <li>発音、リスニング、会話等伸ばしたいものを伸ばせる幅広いオリジナルエクササイズメニュー</li>
            <li>オリジナルのレッスンスタイルで、気になる文法や表現を分かりやすく楽しく学べます！ホワイトボードを用いて文法や表現など細かく講師が説明します！</li>
            <li>いつ来て、何を学んだのかオンラインで分かるので、成長を可視化できる！</li>
            <li>オンラインで先生からフィードバックがもらえる！毎回レッスン後は担当講師からのフィードバックがもらえます！</li>
          </ol>
        </div>
      </div>
      <div class='row'><h1 class='col'>私たちの英語学習に関する考え</h1></div>
      <div class='row'>
        <div class='col slim'>
          <ol>
            <li>新しいことを学ぶには、反復と挑戦が重要である。</li>
            <li>速く雑に学ぶより、遅くて正確に学ぶの方がよい。</li>
            <li>たまに大きな努力をするより、継続している方が良い。</li>
          </ol>
        </div>
      </div>      
      <AccessDisplay/>
    </div>
)
}

export default CampaignPage;
