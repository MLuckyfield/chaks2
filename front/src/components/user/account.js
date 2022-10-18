import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import QRCode from 'react-qr-code'
import Popup from '../utilities/popup'

const Account = () => {

  //const [Account, setAccount] = useState();
  //const [password, setPassword] = useState();
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('user')));
  const [account,setAccount]=useState()
  const [sessions,setSessions]=useState(0)
  const [count,setCount]=useState(0)
  const [reward,setReward]=useState()
  const [points,setPoints]=useState(0)
  const [msg,setMsg]=useState('')

  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/all', {params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          // res.data.data.forEach((item, i) => {
          //   item['inClass']=false
          // });
          // console.log(res.data.data)
          // setAccount(res.data.data[0])
          // console.log(res.data.data[0],res.data.data[0].first)
          let user = res.data.data[0]
          setAccount(user)
          res=user.statistics
          setCount(res)
          // console.log('Statistics for',res.length)
          let month = new Date().getMonth()
          let count = 0
          res.forEach((item, i) => {
            if(moment(item.start).month()==month){count++}
            // console.log(i,moment(item.start).month()+1,month,moment(item.start).month()+1==month)
          });
          // console.log('number',count)
          let temp = []
          temp['Standard']=[0,'Gold']
          temp['Gold']=[4,'Platinum']
          temp['Platinum']=[8,'Diamond']
          temp['Diamond']=[12]
          setReward(temp)
          // console.log('end of',moment().endOf('month').diff(moment(),'days'))
          let eligible = ''
          if(count<4){eligible='Standard'}
          if(count>=4 && count<8){eligible='Gold'}
          if(count>=8 && count<12){eligible='Platinum'}
          if(count>=12){eligible='Diamond'}
          setReward(eligible)
          let next = temp[eligible][1]
          let word = 'unlock'
          if(eligible==user.reward){word='keep'}
          if(count>=temp[user.reward][0]){
            setMsg(temp[next][0]-count +' more sessions for '+next+' status!');
            setSessions((count/temp[next][0])*100)}
          else{
            setMsg(temp[eligible][0]-count +' more sessions for '+eligible+' status!');
            setSessions((count/temp[eligible][0]*100))
          }
          setPoints(user.points?user.points.length*30:0)
        })
      .catch(error => console.log("error"+error))
  },[])

  const toPay=(e,product,countable)=>{
    e.preventDefault();
    console.log(product)
    axios.post('/payment/new',{user:student,product:product})
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

  const onSubmit=(e,action)=>{
    // console.log(action)
    axios.post('payment/update_sub', {params:{filter:{_id:student._id},fields:'first stripe plan'}})
      .then((res) => {
          console.log(res.data.data[0])
          setAccount(res.data.data[0])
        })
      .catch(error => console.log("error"+error))
  }
  return(
      <div class='master-row'>
          <div class='col border'>
              <h1>ACCOUNT</h1>
              {account?
              <div class='col'>
                Plan: {account.plan}  {account.plan.toLowerCase()!='standard'?moment(account.stripe.plan_start_date).format('dddd, MMM DD, YYYY'):''}<br/>
                {account.first=='M'?(account.plan=='premium'?<div class="btn" onClick={(e)=>{onSubmit(e,'upgrade')}}>Upgrade</div>:<div class="btn" onClick={(e)=>onSubmit(e,'downgrade')}>Downgrade</div>):''}
                Points: {points?points:'Loading...'}
              </div>
            :'Loading account...'}
          </div>
          {student.first=='student'?<Popup title={"継続購入について"} num={3} button={true} content={
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
            {student?<div class="btn" onClick={(e)=>{toPay(e,'price_1LpNGgBVAfieqaobxk8qoRR3',false)}}>購入</div>:<div class="btn" onClick={()=>window.location='/#signup'}>購入</div>}
            </div>
          }/>:''}
          {student.first=='Takeshi'?

          <div>
          Current Reward Level: <span style={{fontWeight:'bold'}}>{account?account.reward:'Loading'}</span><br/>
          <span>You are eligible for {reward}.</span><br/>
          <span>{msg} {moment().endOf('month').diff(moment(),'days')} days left</span>
            <div class="progress-container">
              <div class="progress" style={{width:`${sessions}%`}}></div>
            </div>
          </div>:''}
          VIP Rewards:
          <ul>
            <li>Diamond: <span>10%</span> off <span>everything</span> + 1 drink & 1 snack <span>FREE</span> at each event</li>
            <li>Platinum: <span>10%</span> off <span>lessons</span> + 1 snack <span>FREE</span> at each event</li>
            <li>Gold: <span>5%</span> off <span>lessons</span></li>
          </ul>
          <QRCode value={localStorage.getItem('user')}/>
      </div>
)
}

export default Account;
