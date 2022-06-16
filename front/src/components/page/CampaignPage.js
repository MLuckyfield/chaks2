import banner from '../../banner.jpg'
import AccessDisplay from '../nav/AccessDisplay'


const CampaignPage = () => {


  return(
    <div>
      <div id='concept'  class='master-row' style={{background:'yellow',color:'white'}}>
        <div class='row'><h1 class='col'>初回無料！！</h1></div>
        <div class='row'>
            <div class='col slim'>
              <ol>
                <li>CHATSHACKのSNSをフォロー</li>
                <li>HPにてメールアドレスを登録</li>
                <li>間無制限のFREEトライアル！</li>
                ※飲食物の注文は別途費用が掛かります
                ※１回のみ利用可能
              </ol>
            </div>
        </div>
      </div>
      <div id='concept'  class='master-row dark'>
        <div class='row'><h1 class='col'>INSTAGRAM</h1></div>
        <div class='row'>
            <div class='col slim'>
              <ol>
                <li>@chatshackをフォロー</li>
                <li>@chatshackのタグを付けて投稿</li>
                <li>お好きなドリンクを１杯プレゼント！</li>
                ※クラフトビールはSサイズに限ります
                ※１回のみ利用可能
              </ol>
            </div>
        </div>
      </div>
      <div class='row'>
        <div class='col slim'>
          <ol>
            <li>入店時に友人と来たことを知らせる</li>
            <li>次回の注文時に使えるカードをもらう</li>
            <li>カードとお好きなドリンクを交換！</li>
            ※クラフトビールはSサイズに限ります
　　         ※１回のみ利用可能
          </ol>
        </div>
      </div>
      <AccessDisplay/>
    </div>
)
}

export default CampaignPage;
