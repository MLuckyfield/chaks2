import React, {useState,useEffect} from 'react'
import {axios} from "../../utilities/axios";
import AccessDisplay from '../nav/AccessDisplay'
import Popup from './popup'
import {metaTags} from '../seo'

const Product_Display = (props)=>{
  const [selected,setSelected]=useState();
  const [student, setStudent]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))._id:null)
  const [msg,setMsg] = useState()

  useEffect(()=>{
    metaTags('プロダクト','ビジネス英語や、TOEFL対策などお客様の希望にあったレッスンができるマンツーマン英会話や、好きなだけ英語が話せる英会話カフェ通い放題コースの購入はこちらから！')
  })

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
            <div class="plan standard">
              <div class="plan-inner">
                <div class="entry-title">
                  <h3>マンツーマン</h3>
                  <div class="price">¥5,000<span>/45分</span>
                  </div>
                </div>
                <div class="entry-content">
                  <ul>
                    <li>予約不要で少人数のグループレッスン！ 入会費、テキスト代はなしで、来たいときに滞在した分だけの支払い！</li>
                    <li><strong>英会話カフェ</strong>（11時～19時）<br/>¥1,000/30分<br/>（コーヒー、紅茶は飲み放題）</li>
                    <li><strong>英会話バー</strong>（19時～22時）<br/></li>
                    <li>
                        <Popup title={"返金について"} num={4} content={
                          <div>
                            予約されたレッスンについては返金いたしかねますのでご了承ください。ただ、予約後のレッスン時間の変更は可能です。時間変更をご希望の方はお手数ですが、下記電話番号にお問い合わせください。050-3395-1289
                          </div>
                        }/>
                    </li>
                  </ul>
                </div>
                {student?<div class="btn" onClick={(e)=>{onSubmit(e,'price_1LpO9vBVAfieqaobUpRve6Ab',true)}}>購入</div>:<div class="btn" onClick={()=>window.location='/#signup'}>購入</div>}
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
                        <strong>利用可能時間</strong> 11時～22時
                        <br/>
                        最終入店時間: 21:30時
                    </li>
                    <li><strong>レッスン時間</strong> 無制限~</li>
                    <li>
                            <Popup title={"学生割について"} num={1} content={
                              <div>
                                学生割を希望のお客様はこちらの放題コース(30,000円)へご入会の上、ご来店の際にお名前と学生証の提示をお願い致します。<br/>学生証の確認が取れましたらで現金にて5,000円をお返しさせていただきます。
                              </div>
                            }/>
                            <Popup title={"継続購入について"} num={2} content={
                              <div>
                                こちらのサービスは自動で毎月継続購入されるサービスとなります。<br/>自動購入を停止されたい場合には大変お手数ではございますが、下記電話番号にお電話もしくは、店頭にてお申し付けくださいますようお願い致します。電話番号：05033951280
                              </div>
                            }/>
                    </li>
                  </ul>
                </div>
                <Popup title={"継続購入について"} num={3} button={true} content={
                  <div>
                  <h2><strong>CHATSHACK</strong> <br/>受講契約約款</h2>

                  <br/>(契約の成⽴）

                  <p><strong>第１条</strong><br/>

                  申込者（以下「甲」といいます。）は、本受講契約約款（以下「本約款」といいます。）の内容及び以下の条項を承 諾の上、CHATSHACK（以下「⼄」といいます。）に対して下記のコースの申込を⾏い、⼄がこれを承諾し、コースにかかる受講契約が成⽴します。

                  </p>

                  　　　　　　　　　　　　　　　　　<h3>CHATSHACK 英会話放題</h3>

                  <br/>(役務の提供及び対価の⽀払）

                  <p><strong>第２条</strong><br/>


                  １．⼄は、甲に対し、コースにおいて、下記記載の内容の役務を提供します。 <br/>

                    <p class='indent'>①英語⼒向上のための対⾯での英会話レッスン（英会話カフェ、英会話バー）の実施 <br/>

                    ②レッスン中のコーヒー、紅茶の提供<br/>

                    ２．甲は、⼄に対し、下記に定めるコース料⾦を⽀払うこととします。<br/></p>
                    <p class='indent'>
                    ①コース料⾦<br/>

                    英会話放題 （通常）<br/>

                    1か⽉ 税込 30,000 円　<br/>　　　　　　

                    英会話放題（学生割）<br/>

                    1か⽉ 税込 25,000 円<br/>

                    ②⽀払⽅法 <br/>

                    甲は、クレジットカード決済の⽅法により、コース料⾦を⽀払います。</p>
                   </p><br/>
                  　　

                  (レッスンの形態）<br/>

                  <p><strong>第３条</strong><br/>
                  レッスンの実施形態については、以下のとおりとします。<br/>

                  １．コース期間は入会日から1か月間となります。<br/>

                  ２．コース期間中は通常の英会話カフェ、英会話バーの営業通り、最大受講⽣４名までのグループを１名の講師が担当します。<br/>

                  ３．レッスンは、担当講師が対⾯で受講⽣グループに対し、英会話指導をするものです。<br/></p><br/>

                  (レッスンの実施場所）

                    <p><strong>第４条</strong><br/>
                   レッスンは、下記の施設で実施します。<br/>

                   東京都千代田区九段南2-4–12 アビスタ九段ビル201 CHATSHACK<br/></p><br/>

                  （コース期間の⾃動延⻑）

                  <p><strong>第５条</strong><br/>

                  １. 本契約のコース期間は、コース期間が満了する前に甲または⼄のいずれかからが本契約を終了する旨の申し出が電話にてない限り、⾃動的に１か⽉間延⻑されるものとし、以後も同様とします。<br/>

                  解約連絡先：050 3395 1280<br/>

                  ２．延⻑期間のコース料⾦は、下記のとおりとします。<br/>

                  延⻑期間１か⽉<br/>

                   ・英会話放題 （通常）<br/>

                  1か⽉ 税込 30,000 円　　　<br/>　　　　

                  ・英会話放題（学生割）<br/>

                  1か⽉ 税込 25,000 円</p><br/>

                  （中途解約）

                  <p><strong>第６条</strong><br/>

                  １．⼄は甲から契約の解除の申し出があった場合には、解除の申し出があった月の第２条第２項①のコース料金 税込 30,000 円、 学生料金 税込 25,000円を請求できるものとする<br/>

                  <br/>（譲渡禁⽌） </p>

                  <p><strong>第７条</strong><br/>

                  甲は、本契約上の地位もしくは本契約から⽣じる権利義務の全部または⼀部を、⼄の事前の承諾なくして第三者に譲渡することはできません。 </p>

                  <br/>（個⼈情報保護）

                  <p><strong>第８条</strong><br/>

                  1. 本契約に際し、⼄が収集した個⼈情報に関しては、法令により例外と認められた場合を除き、原則として以下の⽬的のみに利用します。<br/>

                    <p class='indent'>
                    ① 甲に対するサービスの案内、情報提供を⾏うため<br/>

                    ② 甲より照会を受けた内容に回答するため<br/></p><br/>

                  ２．本契約に際し、⼄が収集した個⼈情報に関しては、次の各号に定める場合を除き、第三者への提供は⾏いません。<br/>

                  　<p class='indent'>
                    ①法令の定めに従い、国または公共団体及びその委託を受けた第三者から個⼈情報の開⽰を求められた場合<br/>

                    ②個⼈の⽣命、⾝体、財産の保護のために必要があり、本⼈の同意を得ることが困難な場合 </p></p><br/>

                  （反社会的勢⼒でないことの表明保証）

                  <p><strong>第９条</strong><br/>

                  １．甲は、現在及び将来にわたって、次の各号のいずれに該当しないことを表明し確約します。<br/>

                   <p class='indent'>① 暴⼒団<br/>

                   ② 暴⼒団構成員・準構成員<br/>

                   ③ 暴⼒団関係企業<br/>

                   ④ その他反社会的な⾏為や反社会的な⾏為により利益を得ることを⽬的とする個⼈または団体及びその構成員</p><br/>

                  ２. 甲が前項の各号の⼀つに該当する場合には、⼄は何らの催告を要することなく本委任契約を解除することができま す。<br/>

                  ３．⼄が前項により解除した場合、⼄はそれにより甲に⽣じた損害の⼀切について賠償する義務を負わず、甲は⼄に⽣じた損害を全て賠償する責任を負います。 </p><br/>

                  (役務提供者の情報）

                  <p><strong>第１０条</strong><br/>

                  特定商取引法第４２条第２項第７号に定める、本契約の役務提供事業者の⽒名・住所等については下記のとおりです。<br/>

                    <p class='indent'>① 役務提供事業者<br/>

                    CHATSHACK<br/>

                    東京都千代田区九段南2-4-12 アビスタ九段ビル201<br/>

                    代表 八木俊祐　</p>
                  </p><br/>
                  {student?<div class="btn" onClick={(e)=>{onSubmit(e,'price_1LpNGgBVAfieqaobxk8qoRR3',false)}}>購入</div>:<div class="btn" onClick={()=>window.location='/#signup'}>購入</div>}
                  </div>
                }/>
              </div>
            </div>
          </div>
        </div>
        <div class='row border' style={{padding: '5%',margin:'5% auto', width:'fit-content'}}>
            <h1 class='col'>学生割</h1>
            学生の方にはすべての商品やサービスを２０％割引にて提供しています！
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
//live mode subscription: price_1LI0RpBVAfieqaobowDgpi3c
