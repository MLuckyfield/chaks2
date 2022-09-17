import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'

const Statistics = (props)=>{

  const [progress,setProgress]=useState()
  const [subjects,setSubjects]=useState()
  // const [time,setTime]=useState(new Date())
  // const [isConnected,setIsConnected]=useState()
  // socket.on("return", (arg) => {
  //   alert('recieved',arg); // world
  //   setTime(new Date())
  // });
  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/progress', {params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          setProgress(res.data.data[0].progress)
          console.log(res.data.data[0].progress)
          let unique = [...new Set(res.data.data[0].progress.map((obj)=>{return obj.ref.category}))]
          console.log('unique',unique)
          setSubjects(unique)
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <div class='master-row'>
        <div class='col border'>
            <h1>ACCOUNT</h1>
            <table>
              <tr>
                  <th>name</th>
                  <th>detail</th>
                  <th>complete</th>

              </tr>
                {progress?
                progress.map((material,i)=>{
                  console.log(material.complete,material)
                  return   (
                    <tr>
                      <th>{material.ref.name}</th>
                      <th>{material.ref.sub_category}</th>
                      <th>{material.complete}</th>
                  </tr>)
                }):'none'}
            </table>
        </div>
    </div>

  )
}
const Accordion =()=>{
const accordionData = [{
  title: '普通の英会話教室と何が違うの？',
  content: `普通の英会話教室と違うポイントたくさんありますがその中でも以下の３点が特徴となります。
1.実際の会話中に英語を教えたり、気軽に英語の質問ができる雰囲気を提供します。
2.入会が不必要な為、レッスン予約やテキスト代など必要ありません。来たいときに来れて帰りたいときに帰れます！
3.安い！安くて知りたいことを知れるそんな環境を提供しています！入会金やテキスト代もなく気軽にご利用いただけます。`,
},
{
title: '英会話バーでも英語が学べるの？',
content: `もちろん英語力を向上していただけます。
英語を学ぶ場所の提供が私たちの一番の役目です。CHTASHACKでの英会話は自由テーマで行われます。
なので、英語に関する質問はいつでもできるし、インストラクターも例文や絵などで説明をしてくれます。
また、バーといっても英会話を楽しむことを大事としているので、音の大きい音楽を流すなどはしません。`,
},
{
title: '他にも安い英会話はありますが、割引などありますか？',
content: `もちろん私たちより安い英会話教室は存在します！ただ、私たちはより自由に話しやすい環境を提供している自信があります。また、CHATSHACKには入会金や月謝などをお客様から頂戴しておりません。
割引に関しては今後条件付きで行う予定ではあります！
最新情報としてお客様へ共有する予定ですのでHPよりメールアドレスの登録をよろしくお願いいたします。`,
},
{
title: '英会話中に飲食をすることは可能ですか？',
content: `もちろんです！海外のカフェやバーを意識したメニューを提供しております！
アルコール類はクラフトビールをメインとしハイボールやソフトドリンクもご用意しています。
食べ物もナチョスやポテトフライなどの食べやすくて美味しいものを提供しています。
英会話中にはぜひ食べ物や飲み物もお楽しみください！`,
},
{
title: '予約は必要ですか？',
content: `必要ありません！直接お越しください！`,
}];



return (
    <div class='accordion'>
          {accordionData.map(({ title, content }) => (
            <AccordionItem title={title} content={content} />
          ))}
    </div>
);
}
const AccordionItem=({ title, content })=>{
const [isActive, setIsActive] = useState(false);
return (
  <div class='accordion_item clickable' onClick={() => setIsActive(!isActive)}>
    <div class='accordion-title'>
      <h2>{title}</h2>
    </div>
    {isActive && <div class='accordion-content'>{content}</div>}
  </div>

)
}
export default Statistics;

// CHATSHACK(以下「当社」)では、お預かりした個人情報について、以下のとおり適正かつ安全に管理・運用することに努めます。
// <br/>
// <p>１．利用目的
// 当社は、収集した個人情報について、以下の目的のために利用いたします。
// ①サービス実施、およびアフターサービスのため
// ②相談・お問い合わせへの回答のため
// ③商品・サービス・イベントの案内のため</p>
// <br/>
// <p>２．第三者提供
// 当社は、以下の場合を除いて、個人データを第三者へ提供することはしません。
// ①法令に基づく場合
// ②人の生命・身体・財産を保護するために必要で、本人から同意を得ることが難しい場合
// ③公衆衛生の向上・児童の健全な育成のために必要で、本人から同意を得ることが難しい場合
// ④国の機関や地方公共団体、その委託者などによる法令事務の遂行にあたって協力する必要があり、かつ本人の同意を得ることで事務遂行に影響が生じる可能性がある場合</p>
// <br/>
// <p>３．開示請求
// 貴殿の個人情報について、ご本人には、開示・訂正・削除・利用停止を請求する権利があります。手続きにあたっては、ご本人確認のうえ対応させていただきますが、代理人の場合も可能です。</p>
