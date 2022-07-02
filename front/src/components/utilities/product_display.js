import React, {useState} from 'react'
import {axios} from "../../utilities/axios";
import AccessDisplay from '../nav/AccessDisplay'

const Product_Display = (props)=>{
  const [selected,setSelected]=useState();
  const [student, setStudent]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))._id:null)
  const [msg,setMsg] = useState()

  const onSubmit=(e,product,countable)=>{
    e.preventDefault();
    console.log(product)
    axios.post('/payment/new',{user:student,product:product,countable:countable})
      .then((res) => {
          console.log(res.data.data)
          window.location.href=res.data.data.url
          // setMsg([res.data.message,res.data.success]);
          })
      .catch((err) => {
        setMsg([err.message,err.success]);
        // setFeedback(err.response.data.message);
        });
  }
  return (
    <div>
      <div class='master-row'>
        <h1 class='col'>SERVICES</h1>
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
                    <li><strong>英会話カフェ</strong>（10時～18時）<br/>
¥1,000/30分<br/>（コーヒー、紅茶は飲み放題）</li>
                    <li><strong>英会話バー</strong>（18時～23時）<br/>
¥2,500/無制限<br/>（ワンドリンク付,最大８５０円!）</li>
                  </ul>
                </div>
                <div class="border">店頭でのお支払い</div>
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
                    <li><strong>利用可能時間</strong> 7時～10時</li>
                    <li><strong>レッスン時間</strong> 45分~</li>
                    <li style={{fontSize:'10px'}}><strong>※支払方法：ポイント制</strong> ポイントはマンツーマンレッスンを予約する際に利用します。100ポイントの購入から可能です。100ポイント=1レッスン</li>
                  </ul>
                </div>
                {student?<div class="btn" onClick={(e)=>{onSubmit(e,'price_1LDexPBVAfieqaobsYFR70Im',true)}}>購入</div>:<div class="btn" onClick={()=>window.location='/signup'}>購入</div>}
              </div>
            </div>
            <div class="plan ultimite">
              <div class="plan-inner">
              <div class="hot">週3回以上なら<br/>お得！</div>
                <div class="entry-title">
                  <h3>英会話放題</h3>
                  <div class="price">¥30,000<span>/月</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li>英語力の飛躍的向上を目指している方は通い放題コース！
通常の英会話カフェ＆バーでのグループレッスンを時間制限なしで受講し放題！
これから留学を考えている方や、外資系への転職を考えている人などへ向けたプランです！</li>
                    <li>
                        <strong>利用可能時間</strong> 10時～23時
                        <br/>
                        最終入店時間: 22時
                    </li>
                    <li><strong>レッスン時間</strong> 無制限~</li>
                  </ul>
                </div>
                {student?<div class="btn" onClick={(e)=>{onSubmit(e,'price_1LDexPBVAfieqaobsYFR70Im',true)}}>購入</div>:<div class="btn" onClick={()=>window.location='/signup'}>購入</div>}
              </div>
            </div>
          </div>
        </div>
        <div id='concept'  class='master-row dark'>
          <div class='row'><h1 class='col'>MISSION</h1>
              <div class='col slim'>
                英会話教室よりもカジュアルに、クオリティーは英会話カフェより高く。英会話を楽しく、身近で、達成感のあるものにすること。
              </div>
          </div>
        </div>
        <AccessDisplay/>
    </div>
  )
}

export default Product_Display;
