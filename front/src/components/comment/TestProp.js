import React, { useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Lesson from '../utilities/lesson'
import points from '../../pic.png'
import atmos from '../../atmosphere.jpg'


const TestProp = () => {

  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})
  const [date,setDate] = useState(()=>{let time = new Date();time.setDate(time.getDate()+2);return time})
  const [day,setDay]=useState(()=>{let time = new Date();return time.getDay()})
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [days,setDays]=useState(()=>{let time = new Date(year,month,0);return time.getDate()})
  const [bookings,setBookings]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    let target = new Date(year,month,0)
    console.log('searching from', new Date(`${year}-${month}-1`),new Date(`${year}-${month}-${target.getDate()}`))
    //get all bookings for the month
    axios.get('/booking/all',{params:{filter:{createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${target.getDate()}`)}}}})
      .then((res) => {
        let data = res.data.data
        // console.log('bookings retrieved:',data)
        let bookings = []
        //create schedule array
        let startingDay = new Date(`${year}-${month}-1`).getDay()
        let endingDay = target.getDay()
        let count = 1
        for(let i=0;i<(days+startingDay+(6-endingDay));i++){
          let day_bookings = {bookings:[]}
          // console.log(i,year,month,target,count,startingDay,endingDay)

          if(i<startingDay || count>target.getDate()){day_bookings['day']=' '}
          else{
            day_bookings['day']=count
            let today = new Date(`${year}-${month}-${i-(7-startingDay)}`)
            data.forEach((booking, i) => {
              //if date of booking matches i create object and add to bookings
              console.log(i)
              if(today.getDate()==moment(booking.date).date()){
                day_bookings.bookings.push(booking)
              }
            });
            count++
          }
          bookings.push(day_bookings)
        }
        console.log('ready',bookings)
        setBookings(bookings)
      })
      .catch((err) => {
        console.log('calendar err',err);
        // setFeedback(err.response.data.message);
        });

  },[month])

  return(
    <div class='col'>
    <div class='row'>
    <h1>CHATSHACKレッスン受講規約</h1>

    <h2>第1条（契約の成立）</h2>
    1. レッスン受講申込者（以下「申込者」という）は以下の条項を承諾のうえ、CHATSHACKのレッスンに対して受講の申込みを行い、CHATSHACKはこれを承諾します。
    2. 前項の定めにかかわらず、次の各号に掲げる事由に該当するときは、各要件を充たすことを条件として契約が成立するものとします。
    ①申込者が未成年であるときは、親権者の同意があること。
    ②レッスン料金の支払いは、クレジット契約が成立すること。
    ③その他レッスン受講規約などに定められた条件を充たすこと。

    <h2>第2条（拒否事由）</h2>
    CHATSHACKは、次に定める事由のいずれかが認められるときは、申込みをお断りすることがあります。
    ①前条各号に掲げる要件を充たさず、或いは充たさないことが判明したとき。
    ②レッスンの定員に受入可能な余裕がない場合など、客観的に役務の提供が不可能なとき。
    ③その他、CHATSHACKが不適当と認めたとき。

    <h2>第3条（役務の提供及び対価の支払）</h2>
    1. CHATSHACKは、申込者に対し、下記記載の内容の役務を提供します。
    ①英語⼒向上のための対⾯での英会話レッスン（英会話カフェ、英会話バー）の実施
    ②レッスン中の飲み物の提供
    ③CHATSHACKオンラインシステムの提供

    ２．申込者は、CHATSHACKに対し、下記に定める料⾦を⽀払うこととします。
    ①レッスン料⾦
    英会話レッスン（英会話カフェ、英会話バー）
    1時間 税込 2,000 円　
    ②⽀払⽅法
    1. 	申込者は、クレジットカード決済の⽅法により、毎月レッスン料⾦を⽀払います。
    2. 	２ヶ月目以降のお支払いはご登録いただいたクレジットカードからの自動引き落としとなります。
    3．CHATSHACKのレッスン料金体系例等
    A. 月額料金（例）：月4時間プラン 8,000円(税込)
    月8時間プラン 16,000円(税込)
    月12時間プラン 24,000円(税込)
    B. 支払い方法：クレジットカード決済
    C.ドリンク代(コーヒー、紅茶のみ)やアカウント利用料はレッスン料に含まれています。
    ※一度支払ったレッスン料は、理由の如何を問わず返還致しかねます。ただし、CHATSHACKがやむを得ない理由に基づくものと認めた場合はこの限りではありません。

    <h2>第4条（レッスンの形態）</h2>
    CHATSHACKのレッスンの実施形態については、以下のとおりとします。
    １．最大受講⽣４名までのグループを１名の講師が担当します。
    ２．レッスンは、担当講師が対⾯で受講⽣グループに対し、英会話指導をするものです。

    <h2>第5条（レッスンの実施場所）</h2>
    レッスンは、下記の施設で実施します。
    東京都千代田区九段南2-4–12 アビスタ九段ビル201 CHATSHACK

    <h2>第６条（レッスン時間と消化期間）</h2>
    月のレッスン時間は基本的に1か月　　　時間とします。また、購入されたレッスン時間は購入日から２か月間有効となります。 （例：9月１日に月４時間プランに申し込みをした場合、11月１日までに4時間分のレッスンを消化する必要があります。）
    レッスン時間の変更を希望される場合は、変更を希望する月の前月15日までに通知するものとします。

    <h2>第７条（支払いの停止とアカウントの削除）</h2>
    支払いを停止する月の前月15日までにCHATSHACKへ申し出た場合に限り停止できるものとします。前月15日を過ぎた場合は翌々月からの扱いとなります。
    また、支払いを停止してから２か月後にアカウントを削除するものとします。それ以降もアカウントの維持を希望する場合にはアカウント維持費として500円(税込)/月をクレジットカード決済にて頂戴いたします。

    <h2>第８条（権利の譲渡の禁止）</h2>
    申込者は、本申込みから生じる権利・義務の全部若しくは一部を第三者に譲渡し、担保に供し、又は承継させることはできません。

    <h2>第９条（損害賠償）</h2>
    CHATSHACKの施設又は業務の遂行に起因して、受講生等の第三者の生命、身体を害し、又は財産を損壊したことについて法律上の損害賠償責任を負うべき場合に、 CHATSHACK は相応の補償を行います。但し、CHATSHACKへの移動時などCHATSHACKの管理下にない間に発生した事故、CHATSHACKのレッスン受講生の能力又は技能が向上しないことに起因する損害、CHATSHACK内において生じた盗難及び紛失については、一切損害賠償の責めは負いません。また、CHATSHACKの管理下における受講生の行為に起因する偶然の事故については、法律上の損害賠償に基づき受講生及び、その保証人が解決にあたるものとします。

    <h2>第１０条（遵守義務）</h2>
    1. 申込者は、CHATSHACKの定める規定、講師及びCHATSHACKのスタッフの指示や指導を遵守するものとします。
    2. 申込者は、CHATSHACKの運営に対して妨害となる行為、CHATSHACKを誹謗中傷する行為、その他公序良俗に反する行為を行わないものとします。
    3. 申込者は、所持品について、自己の責任において保持管理しなければならないものとします。

    <h2>第１１条（CHATSHACKによる解除）</h2>
    CHATSHACKは、申込者が前条１項又は２項の定めに違反して、改善を求めたにもかかわらず改善のない場合は、当該申込者に対してレッスンを停止し、契約を解除することができます。この場合、契約解除に伴うレッスン料は、返還しないものとします。

    <h2>第1２条（不可抗力による免責事項）</h2>
    CHATSHACKは、戦争、暴動、自然災害、交通機関の遅延又は不通、講師の死亡・事故など不可抗力により役務の提供、遅滞、変更、中断、もしくは廃止、その他レッスンに関連して発生した申込者の損害について、一切の責任を負わないものとします。

    <h2>第１３条（紛争の解決）</h2>
    1. 本規約に定める事項について疑義が生じた場合、その他本規約に関して争いが生じた場合には、両者協議のうえ、解決するものとします。
    2. 本契約に定めのない事項については、民法その他の法令によるものとします。

    ◆上記のCHATSHACKレッスン受講規約に同意の上、レッスンを受講します。

    </div>
    <div id='concept' class='master-row' style={{background:'white',color:'white',paddingTop:'0'}}>
      <div class='col' style={{backgroundImage: 'url('+atmos+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',margin:'0',width:'100%'}}>
          <div class='mini_overlay' style={{backgroundColor:'rgba(0,0,0,0.3)',width:'100%',margin:'0'}}>
          <div class='col slim center'>
              <h1 style={{padding:'5%',border:'1px solid white'}}>4点の特徴</h1>
          </div>
          <div class='up_row'>
                <div class='col'>
                    <p>英会話教室よりも</p>
                    <h2>気軽に</h2>
                    <div class='col'>
                      <div class='row'>
                        <span class="custom_icon">3</span>
                        予約不要
                      </div>
                      <div class='row'>
                        <span class="custom_icon">3</span>
                        予約不要
                      </div>
                      <div class='row'>
                        <span class="custom_icon">3</span>
                        予約不要
                      </div>
                      <div class='row'>
                        <span class="custom_icon">3</span>
                        予約不要
                      </div>
                    </div>
                </div>
                <div class='col'>
                    <span class='material-icons'>record_voice_over</span>
                    <h2>英語をたくさん話す</h2>
                    <div class='col'>
グループはレベル別に分けられ、講師陣は全員が平等に英語を喋れるように会話をリードします。</div>
                </div>
          </div>
          <div class='up_row'>
                <div class='col'>
                    <span class='material-icons'>trending_up</span>
                    <h2>成長を振り返る</h2>
                    <div class='col'>レッスン後には先生からのフィードバックがオンラインでもらえます。その日に何を学んだのかいつでも振り返ることができます。</div>
                </div>
                <div class='col'>
                    <span class='material-icons'>schedule</span>
                    <h2>予約不要</h2>
                    <div class='col'>自由に英会話をしたいときに来て、いつでも退店できるシステムです。</div>
                </div>
          </div>
          </div>
      </div>
    </div>
    <div style={{backgroundImage: 'url('+points+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>test</div>
      <div class='row'><button class='arrow' onClick={()=>{if(month-1<1){setMonth(1);setYear(year-1)}else{setMonth(month-1)}}}>{'<'}</button><h1>{month},{year}</h1><button class='arrow' onClick={()=>{if(month+1>12){setMonth(1);setYear(year+1)}else{setMonth(month+1)}}}>{'>'}</button></div>
      <div class='calendar'>
        <div class='labelBox border'>日</div>
        <div class='labelBox border'>月</div>
        <div class='labelBox border'>火</div>
        <div class='labelBox border'>水</div>
        <div class='labelBox border'>木</div>
        <div class='labelBox border'>金</div>
        <div class='labelBox border'>土</div>
        {bookings?bookings.map((item,i)=>{
          let today = new Date()
          console.log(today,moment(today).format('MM Do YY'),moment(new Date(year,month-1,item.day)).format('MM Do YY'))
          // manager bookings calendar
          if(user.role=='manager'){
            return (<div class={new Date(year,month-1,item.day).getDate()>=today.getDate()?'dayBox border':'dayBox border inactive'}>
                    {moment(new Date(year,month-1,item.day)).format('MM Do YY')==moment(today).format('MM Do YY')?<span class='day_tag' style={{color:'white',backgroundColor:'blue'}}>{item.day}</span>:<span class='day_tag'>{item.day}</span>}
                    {item.bookings.map((timeslot,y)=>{
                      console.log(moment.tz(timeslot.date,'Asia/Taipei'),moment.tz(timeslot.date,'JST'))
                      let temp = new Date(timeslot.date)
                      return <Lesson title={`${timeslot.teacher.first} | ${moment.tz(timeslot.date,'Asia/Taipei')._a[3]}:${moment.tz(timeslot.date,'Asia/Taipei')._a[4]}`} num={y+5} active={timeslot.status} content={
                        <div>
                          {timeslot.teacher.first} {timeslot.teacher.last}<br/>
                          {moment.tz(timeslot.date,'JST').format('HH:MM')} | {timeslot.status}
                        </div>
                      }/>
                    })}
                   </div>)
          }
          //user booking calendar
          else{
            return <div></div>
          }
        }):'Loading...'}
      </div>
    </div>
)
}

export default TestProp;
