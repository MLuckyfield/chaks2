import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Popup from '../utilities/popup'
import img_beginner_grammar from '../../images/beginner_grammar.jpg'
import img_intermediate_grammar from '../../images/grammar_intermediate.jpg'
import img_advanced_conversation from '../../images/conversation_advanced.jpg'
import img_intermediate_conversation from '../../images/conversation_intermediate.jpg'
import img_beginner_conversation from '../../images/conversation_beginner.jpg'
import img_business_english from '../../images/business_english.jpg'
import img_test_prep from '../../images/test_prep.jpg'
// import Accordion from '../utilities/accordion'
import {Editor, EditorState, convertToRaw,convertFromRaw, RichUtils} from 'draft-js'

const CourseManagement = () => {

  const [courses, setCourses]=useState()
  const [user,setUser]=useState(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{role:'',_id:1})

  //new course
  const name = useRef('');
  const image = useRef('');
  const price = useRef('');
  const [description,setDescription]=useState(()=> EditorState.createEmpty())
  const [addLesson,setAddLesson]=useState(()=> EditorState.createEmpty())
  const [lessons,setLessons]=useState([])
  const [lessonCount,setLessonCount]=useState(1)
  const [delivery,setDelivery]=useState([])
    //--
    const online_limit = useRef('')
    const online_day = useRef('')
    const online_month = useRef('')
    const online_start_hour = useRef('')
    const online_start_minute = useRef('')
    const online_end_hour = useRef('')
    const online_end_minute = useRef('')
    const online_repeats = useRef('')
    //--
    const offline_limit = useRef('')
    const offline_day= useRef('')
    const offline_month = useRef('')
    const offline_start_hour = useRef('')
    const offline_start_minute = useRef('')
    const offline_end_hour = useRef('')
    const offline_end_minute = useRef('')
    const offline_repeats = useRef('')

  const channels = ['online private','online group','in-person group']
  useEffect(()=>{
    axios.get('/program_course/all')
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  const deliverySetting=(e)=>{
    const {value, checked}=e.target
    console.log(value,'is',checked)
    if(checked){setDelivery([...delivery,value])}
    else{setDelivery(delivery.filter((e)=>e!==value))}
    console.log('delivery is',delivery)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    let temp = []
    delivery.forEach((channel, i) => {
      temp.push({
        channel:channel
      })
    });
    console.log('course options to be sent',temp)
    axios.post('/program_course/new',
      {
        name: name.current.value,
        thumbnail: image.current.value,
        description: convertToRaw(description.getCurrentContent()),
        lessons:lessons,
        delivery:temp,
        price:price.current.value,
        online_schedule:{
          repeats:online_repeats.current.value,
          timeslots:[{
            limit:online_limit.current.value,
            month:online_month.current.value,
            day:online_day.current.value,
            start_hour:online_start_hour.current.value,
            start_minute:online_start_minute.current.value,
            end_hour:online_end_hour.current.value,
            end_minute:online_end_minute.current.value,
          }],
        },
        offline_schedule:{
          repeats:offline_repeats.current.value,
          timeslots:[{
            limit:offline_limit.current.value,
            month:offline_month.current.value,
            day:offline_day.current.value,
            start_hour:offline_start_hour.current.value,
            start_minute:offline_start_minute.current.value,
            end_hour:offline_end_hour.current.value,
            end_minute:offline_end_minute.current.value,
          }],
        }
      })
      .then((res) => {
        window.location.reload();

          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  const markDescription = (command, editorState)=>{
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setDescription(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const markLesson = (command, editorState)=>{
    console.log('state',addLesson)
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setAddLesson(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const prepLesson=()=>{
    console.log('db',convertToRaw(addLesson.getCurrentContent()))
    setLessons(current=>[{
      id:lessonCount,
      content:convertToRaw(addLesson.getCurrentContent())
    },...current])
    setLessonCount(lessonCount+1)
    console.log('after',lessons)

  }
  return(
      <div class='col'>
        <h1>COURSE LIST ({courses?courses.length:'Loading...'})</h1>
        <div class='row' style={{justifyContent:'end'}}>
        {user.role=='manager'||user.role=='teacher'?
        <Popup button={"Create"} num={1} content={
          <form class='make_blog' onSubmit={onSubmit}>
                  <h2>New Course</h2>
                      <div class='col border'>
                      <h3>Profile & Content</h3>
                      <div class="form-group make_blog">
                        Course Name
                        <input ref={name} type="text" class="form-control" required/>
                      </div>
                      <div class="form-group make_blog">
                        Pricing
                        <input ref={price} type="text" class="form-control" required/>
                      </div>
                      <div class="form-group make_blog">
                        Thumbnail
                        <input ref={image} type="text" class="form-control"/>
                      </div>
                      <div class="form-group make_blog">
                        Description
                        <div class='editor'>
                        <Editor editorState={description} onChange={setDescription} handleKeyCommand={markDescription}/>
                        </div>
                      </div>
                      <hr/>
                      <div class="form-group make_blog">
                        Add Lesson
                        <div class='editor'>
                        <Editor editorState={addLesson} onChange={setAddLesson} handleKeyCommand={markLesson}/>
                        </div>
                        <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();prepLesson()}}>+</div>
                        {lessons?lessons.map((lesson,i)=>{
                          console.log('lesson',lessons.length,lesson.content)
                          return (
                            <div>
                              {lesson.id}
                              <EditorView content={lesson.content} readOnly={true}/>
                            </div>
                          )
                        }):''}
                      </div>
                      </div>
                      <div class='col border'>
                      <h3>Schedule & Delivery</h3>
                      <div class="form-group make_blog">
                          {channels.map((channel, i) => {
                            return <div class='fixed-row'>
                                      <input type='checkbox' value={channel} onChange={deliverySetting}/>
                                      <div>{channel}</div>
                                    </div>
                          })}
                      </div>
                        {delivery.includes('online group')?
                        <div class="form-group make_blog">
                        Online Group
                          <input ref={online_limit} type="number" class="form-control" min='0' max='10' placeholder='Max class size' required/>
                          <input ref={online_month} type="number" class="form-control" min='0' max='12' placeholder='Starting Month' required/>
                          <select class='form-control' ref={online_day}>
                            <option class='col slim feedback clickable' value={0}>Sunday</option>
                            <option class='col slim feedback clickable' value={1}>Monday</option>
                            <option class='col slim feedback clickable' value={2}>Tuesday</option>
                            <option class='col slim feedback clickable' value={3}>Wednesday</option>
                            <option class='col slim feedback clickable' value={4}>Thursday</option>
                            <option class='col slim feedback clickable' value={5}>Friday</option>
                            <option class='col slim feedback clickable' value={6}>Saturday</option>
                          </select>
                          <input ref={online_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={online_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={online_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={online_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={online_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>:''}
                        {delivery.includes('in-person group')?
                        <div class="form-group make_blog">
                          Offline Group
                          <input ref={offline_limit} type="number" class="form-control" min='0' max='10' placeholder='Max class size' required/>
                          <input ref={offline_month} type="number" class="form-control" min='0' max='12' placeholder='Starting Month' required/>
                          <select class='form-control' ref={offline_day}>
                            <option class='col slim feedback clickable' value={0}>Sunday</option>
                            <option class='col slim feedback clickable' value={1}>Monday</option>
                            <option class='col slim feedback clickable' value={2}>Tuesday</option>
                            <option class='col slim feedback clickable' value={3}>Wednesday</option>
                            <option class='col slim feedback clickable' value={4}>Thursday</option>
                            <option class='col slim feedback clickable' value={5}>Friday</option>
                            <option class='col slim feedback clickable' value={6}>Saturday</option>
                          </select>
                          <input ref={offline_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={offline_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={offline_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={offline_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={offline_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>:''}

                      </div>
                      <button type="submit" class="solid-first">Submit</button>
                    </form>
        }/>:''}
        </div>
        <div class='col'>
          {courses? (courses.map(function(course, i){
                return(
                  <AccordionItem course={course} user={user}/>
                )
            })): 'No Courses!'}
        </div>
      </div>
)
}

const AccordionItem=(props)=>{
  const [isActive, setIsActive] = useState(false);
  const [course,setCourse]=useState(props.course)
  const [user,setUser]=useState(props.user)
  const [enrolled,setEnrolled]=useState([])
  const [online_schedule,setOnline_Schedule]=useState()
  const [offline_schedule,setOffline_Schedule]=useState()

  useEffect(()=>{
      console.log('course list, user found')
        axios.get('/enrolled/all',{params:{filter:{course:course._id}}})
          .then((res) => {
              setEnrolled(res.data.data)
              let online_enrolled =[]
              let offline_enrolled =[]
              res.data.data.forEach((item, i) => {
                switch(item.delivery){
                  case 'in-person group':
                    if(item.status=='enrolled'){offline_enrolled.push(item)}
                  break;
                  case 'online group':
                  if(item.status=='enrolled'){online_enrolled.push(item)}
                  break;
                  default:
                }
              });
              console.log('enrolled',res.data.data,online_enrolled,offline_enrolled)
              calculateSchedule(course.online_schedule,online_enrolled,'online')
              calculateSchedule(course.offline_schedule,offline_enrolled,'offline')
              })
          .catch((err) => {
            console.log(err);
            });

  },[])
  const enroll=(channel)=>{
    console.log(user.first,'is enrolling in',course.name)
    axios.post('/payment/course',{
      product:channel.stripe,
    }).then((res) => {
      window.location.href=res.data.data.url
            })
        .catch((err) => {
          console.log(err);
          });
      // axios.post('/enrolled/new',{
      //     student:user._id,
      //     course:course._id,
      //     delivery:channel,
      //     status_date:new Date(),
      //     status:'enrolled'
      // }).then((res) => {
      //   window.location.reload()
      //         })
      //     .catch((err) => {
      //       console.log(err);
      //       });
  }
  const calculateSchedule=(schedule,attendance,type)=>{
    let current_month = new Date().getMonth()
    let starting_month = schedule.timeslots[0].month
    let repeats = schedule.repeats
    starting_month=moment(new Date(moment().year(),starting_month,1))
    current_month = moment(new Date(moment().year(),current_month,1))
    //if course is active
    if(starting_month.month()<current_month.month()){
      let gap = Math.abs(current_month.diff(starting_month,'months'))
      let cycles = Math.ceil(gap/repeats)
      starting_month.add(cycles*repeats,'months')
      console.log('condition triggered',starting_month.month(),current_month.month(),gap,cycles)
    }
    //find the first of day in month
    let firstday = starting_month
    firstday.endOf('month').isoWeekday(schedule.timeslots[0].day)
    while(firstday.date() > 7){
      firstday=firstday.subtract(7,'days')
    }
    //set time
    firstday.hours(schedule.timeslots[0].start_hour)
    firstday.minutes(schedule.timeslots[0].start_minute)
    let next_start={
      start:firstday.format('M/D'),
      time:firstday.format('ddd@HH:mm'),
      graduation:firstday.add(repeats*4,'weeks').format('M/D'),
      limit:schedule.timeslots[0].limit,
      attendance:attendance
    }
    if(type=='online'){setOnline_Schedule(next_start)}
    else{setOffline_Schedule(next_start)}
    console.log('calculate request',next_start)

  }
  const lockEnroll=(schedule,channel)=>{
    let isEnrolled=false
    enrolled.forEach((item, i) => {
      if(item.student._id==user._id){isEnrolled=true}
    });

    if(schedule.attendance.length>=schedule.limit
      || isEnrolled==true
      || user.role=='manager'
      || user.role=='teacher'){}
    else{
      if(user.role){
        return <div class='col'>
            {channel=='online private'?'￥10,000':course.price}
            <Popup button={"申し込む"} num={course._id} content={
              <div class='col'>
               {channel=='online group'?(
                 channel=='online private'?
                 <div class='col'>
                 このコースに申し込むと、オンラインプライベートレッスンでこのコースを選択することができます。
あなたのペースで楽しくしっかり学びたい方はこちらからコースの申し込みをしてください。
コース申し込み後、オンラインプライベートレッスンを予約する際にこのコースを選択することができます。
                 </div>
                 : <div class='col'>
                 <h1>CHATSHACKオンラインコース型レッスン受講規約</h1>


                  <h2>第１条（契約の成立）</h2>

                  1. コース型レッスン受講申込者（以下「利用者」という）は以下の条項を承諾のうえ、CHATSHACKのコース型レッスンに対して受講の申込みを行い、CHATSHACKはこれを承諾します。<br/>

                  2. 前項の定めにかかわらず、次の各号に掲げる事由に該当するときは、各要件を充たすことを条件として契約が成立するものとします。<br/>

                  ①利用者が未成年であるときは、親権者の同意があること。<br/>

                  ②レッスン料金の支払いは、クレジット契約が成立すること。<br/>

                  ③その他レッスン受講規約などに定められた条件を充たすこと。<br/>



                  <h2>第２条（拒否事由）</h2>

                  CHATSHACKは、次に定める事由のいずれかが認められるときは、申込みをお断りすることがあります。<br/>

                  ①前条各号に掲げる要件を充たさず、或いは充たさないことが判明したとき。<br/>

                  ②レッスンの定員に受入可能な余裕がない場合など、客観的に役務の提供が不可能なとき。<br/>

                  ③その他、CHATSHACKが不適当と認めたとき。<br/>



                  <h2>第３条（役務の提供及び対価の支払）</h2>

                  １．CHATSHACKは、利用者に対し、下記記載の内容の役務を提供します。<br/>

                  ①オンラインでのコース型英会話レッスンの実施<br/>

                  ②CHATSHACKオンラインシステムの提供<br/>



                  ２．利用者は、CHATSHACKに対し、下記に定める料⾦を⽀払うこととします。<br/>

                  ①レッスン料⾦<br/>

                  オンラインコース型英会話レッスン<br/>

                  １レッスン 税込 3,000円<br/>

                  ②⽀払⽅法<br/>

                  1.     利用者は、クレジットカード決済の⽅法により、コース型英会話レッスン料⾦を⽀払います。<br/>

                  2．CHATSHACKのコース型英会話レッスン料金体系例等<br/>

                  A. 料金（例）：１ヶ月コースレッスン12,000円(税込)（４レッスン）<br/>

                  ３ヶ月コースレッスン36,000円(税込)（１２レッスン）<br/>

                  B. 支払い方法：クレジットカード決済      <br/>

                  C. オンラインシステム利用料やアカウント利用料はレッスン料に含まれています。<br/>

                  ※一度支払ったレッスン料は、理由の如何を問わず返還致しかねます。ただし、CHATSHACKがやむを得ない理由に基づくものと認めた場合はこの限りではありません。<br/>



                  <h2>第４条（決済業務の委託）</h2>

                  クレジット決済<br/>

                  １．当社は、本サービスに関するクレジットカードによる決済業務を、ストライプジャパン株式会社（以下「ストライプ」という）に委託します。<br/>

                  ２．利用者は、ストライプが当サービス利用料金の決済を代行することを了承し、申込みページにて申し込みをするものとします。<br/>

                  ３．当社は、利用者のクレジットカードに関する一切の情報を保持しません。<br/>



                  <h2>第５条（レッスンの形態）</h2>

                  CHATSHACKのレッスンの実施形態については、以下のとおりとします。<br/>

                  ①オンラインコース型英会話レッスン<br/>

                  １．最大受講⽣５名までのグループを１名の講師が担当します。<br/>

                  ２．オンラインコース型英会話レッスンは、決まった日時に決まったテーマについて担当講師がCHATSHACKの定める通信手段を用いてオンラインにて受講⽣グループに対し、指導をするものです。<br/>


                  <h2>第６条（オンラインレッスンの通信環境）</h2>

                  １．利用者はCHATSHACKの定める通信手段を用いて、オンラインレッスンを利用することができます。<br/>

                  ２．前項の通信手段の利用に際し、下記の内容について同意しなければならないものとします。<br/>

                  ①当該通信手段の各規約、ガイドラインを遵守すること。<br/>

                  ②レッスンの開始までに、当該通信手段のアプリケーションをダウンロード、インストールし、機能等について確認すること。<br/>

                  ③当該通信手段のアプリケーションのダウンロード、インストール、設定、使用等について、すべて自己の責任において行うこと。<br/>

                  ④レッスンの開始後に発生した当該通信手段の機能の不具合等について、当社が一切責任を負わないこと。<br/>

                  ⑤当該通信手段のチャット機能などを通じて講師から送られてきたファイルを受信する場合または当ウェブ以外のURLを開く場合、すべて自己の責任で行うこと。<br/>

                  ⑥当該通信手段が提供するサービスに関する相談、問い合わせ等について、当社が一切対応する責任を負わないこと。<br/>



                  <h2>第７条（利用者の禁止事項）</h2>
                  １．利用者は、本申込みから生じる権利・義務の全部若しくは一部を第三者に譲渡し、担保に供し、又は承継させることはできません。<br/>

                  ２．レッスンで提供するテキスト等の複写、複製、転載、引用、配信（ネットワークに接続されたサーバーへのアップロードを含む。）、編集、翻案、改変、改竄、翻訳、第三者への開示等をすることはできません。<br/>



                  <h2>第８条（損害賠償）</h2>

                  CHATSHACKの施設又は業務の遂行に起因して、受講生等の第三者の生命、身体を害し、又は財産を損壊したことについて法律上の損害賠償責任を負うべき場合に、 CHATSHACK は相応の補償を行います。但し、CHATSHACKへの移動時などCHATSHACKの管理下にない間に発生した事故、CHATSHACKのレッスン受講生の能力又は技能が向上しないことに起因する損害、CHATSHACK内において生じた盗難及び紛失については、一切損害賠償の責めは負いません。また、CHATSHACKの管理下における受講生の行為に起因する偶然の事故については、法律上の損害賠償に基づき受講生及び、その保証人が解決にあたるものとします。<br/>



                  <h2>第９条（遵守義務）</h2>

                  1. 利用者は、CHATSHACKの定める規定、講師及びCHATSHACKのスタッフの指示や指導を遵守するものとします。<br/>

                  2. 利用者は、CHATSHACKの運営に対して妨害となる行為、CHATSHACKを誹謗中傷する行為、その他公序良俗に反する行為を行わないものとします。<br/>

                  3. 利用者は、所持品について、自己の責任において保持管理しなければならないものとします。<br/>



                  <h2>第１０条（CHATSHACKによる解除）</h2>

                  CHATSHACKは、利用者が前条１項又は２項の定めに違反して、改善を求めたにもかかわらず改善のない場合は、当該利用者に対してレッスンを停止し、契約を解除することができます。この場合、契約解除に伴うポイント料は、返還しないものとします。<br/>



                  <h2>第１１条（不可抗力による免責事項）</h2>

                  CHATSHACKは、戦争、暴動、自然災害、交通機関の遅延又は不通、講師の死亡・事故など不可抗力により役務の提供、遅滞、変更、中断、もしくは廃止、その他レッスンに関連して発生した利用者の損害について、一切の責任を負わないものとします。<br/>



                  <h2>第１２条（紛争の解決）</h2>

                  1. 本規約に定める事項について疑義が生じた場合、その他本規約に関して争いが生じた場合には、両者協議のうえ、解決するものとします。<br/>

                  2. 本契約に定めのない事項については、民法その他の法令によるものとします。<br/>

                 </div>
               ):
             <div class='col'>
             <h1>CHATSHACK対面コース型レッスン受講規約</h1>

              <h2>第１条（契約の成立）</h2>

              1. コース型レッスン受講申込者（以下「利用者」という）は以下の条項を承諾のうえ、CHATSHACKのコース型レッスンに対して受講の申込みを行い、CHATSHACKはこれを承諾します。<br/>

              2. 前項の定めにかかわらず、次の各号に掲げる事由に該当するときは、各要件を充たすことを条件として契約が成立するものとします。<br/>

              ①利用者が未成年であるときは、親権者の同意があること。<br/>

              ②レッスン料金の支払いは、クレジット契約が成立すること。<br/>

              ③その他レッスン受講規約などに定められた条件を充たすこと。<br/>

              <h2>第２条（拒否事由）</h2>

              CHATSHACKは、次に定める事由のいずれかが認められるときは、申込みをお断りすることがあります。<br/>

              ①前条各号に掲げる要件を充たさず、或いは充たさないことが判明したとき。<br/>

              ②レッスンの定員に受入可能な余裕がない場合など、客観的に役務の提供が不可能なとき。<br/>

              ③その他、CHATSHACKが不適当と認めたとき。<br/>



              <h2>第３条（役務の提供及び対価の支払）</h2>

              １．CHATSHACKは、利用者に対し、下記記載の内容の役務を提供します。<br/>

              ①対⾯でのコース型英会話レッスンの実施<br/>

              ②CHATSHACKオンラインシステムの提供<br/>



              ２．利用者は、CHATSHACKに対し、下記に定める料⾦を⽀払うこととします。<br/>

              ①レッスン料⾦<br/>

              対面コース型英会話レッスン<br/>

              １レッスン 税込 3,000円<br/>

              ②⽀払⽅法<br/>

              1.     利用者は、クレジットカード決済の⽅法により、コース型英会話レッスン料⾦を⽀払います。<br/>

              2．CHATSHACKのコース型英会話レッスン料金体系例等<br/>

              A. 料金（例）：１ヶ月コースレッスン12,000円(税込)（４レッスン）<br/>

              ３ヶ月コースレッスン36,000円(税込)（１２レッスン）<br/>

              B. 支払い方法：クレジットカード決済       <br/>

              C. オンラインシステム利用料やアカウント利用料はレッスン料に含まれています。<br/>

              ※一度支払ったレッスン料は、理由の如何を問わず返還致しかねます。ただし、CHATSHACKがやむを得ない理由に基づくものと認めた場合はこの限りではありません。<br/>



              <h2>第４条（決済業務の委託）</h2>

              クレジット決済<br/>

              １．当社は、本サービスに関するクレジットカードによる決済業務を、ストライプジャパン株式会社（以下「ストライプ」という）に委託します。<br/>

              ２．利用者は、ストライプが当サービス利用料金の決済を代行することを了承し、申込みページにて申し込みをするものとします。<br/>

              ３．当社は、利用者のクレジットカードに関する一切の情報を保持しません。<br/>



              <h2>第５条（レッスンの形態）</h2>

              CHATSHACKのレッスンの実施形態については、以下のとおりとします。<br/>

              ①対面コース型英会話レッスン<br/>

              １．最大受講⽣５名までのグループを１名の講師が担当します。<br/>

              ２．対面コース型英会話レッスンは、決まった日時に決まったテーマについて担当講師が対⾯で受講⽣グループに対し、指導をするものです。<br/>



              <h2>第６条（対面コース型英会話レッスンの実施場所）</h2>

              レッスンは、下記の施設で実施します。<br/>

              東京都千代田区九段南2-4–12 アビスタ九段ビル201 CHATSHACK<br/>



              <h2>第７条（利用者の禁止事項）</h2>

              １．利用者は、本申込みから生じる権利・義務の全部若しくは一部を第三者に譲渡し、担保に供し、又は承継させることはできません。<br/>

              ２．レッスンで提供するテキスト等の複写、複製、転載、引用、配信（ネットワークに接続されたサーバーへのアップロードを含む。）、編集、翻案、改変、改竄、翻訳、第三者への開示等をすることはできません。<br/>



              <h2>第８条（損害賠償）</h2>

              CHATSHACKの施設又は業務の遂行に起因して、受講生等の第三者の生命、身体を害し、又は財産を損壊したことについて法律上の損害賠償責任を負うべき場合に、 CHATSHACK は相応の補償を行います。但し、CHATSHACKへの移動時などCHATSHACKの管理下にない間に発生した事故、CHATSHACKのレッスン受講生の能力又は技能が向上しないことに起因する損害、CHATSHACK内において生じた盗難及び紛失については、一切損害賠償の責めは負いません。また、CHATSHACKの管理下における受講生の行為に起因する偶然の事故については、法律上の損害賠償に基づき受講生及び、その保証人が解決にあたるものとします。<br/>



              <h2>第９条（遵守義務）</h2>

              1. 利用者は、CHATSHACKの定める規定、講師及びCHATSHACKのスタッフの指示や指導を遵守するものとします。<br/>

              2. 利用者は、CHATSHACKの運営に対して妨害となる行為、CHATSHACKを誹謗中傷する行為、その他公序良俗に反する行為を行わないものとします。<br/>

              3. 利用者は、所持品について、自己の責任において保持管理しなければならないものとします。<br/>


              <h2>第１０条（CHATSHACKによる解除）</h2>

              CHATSHACKは、利用者が前条１項又は２項の定めに違反して、改善を求めたにもかかわらず改善のない場合は、当該利用者に対してレッスンを停止し、契約を解除することができます。この場合、契約解除に伴うポイント料は、返還しないものとします。<br/>


              <h2>第１１条（不可抗力による免責事項）</h2>

              CHATSHACKは、戦争、暴動、自然災害、交通機関の遅延又は不通、講師の死亡・事故など不可抗力により役務の提供、遅滞、変更、中断、もしくは廃止、その他レッスンに関連して発生した利用者の損害について、一切の責任を負わないものとします。<br/>


              <h2>第１２条（紛争の解決）</h2>

              1. 本規約に定める事項について疑義が生じた場合、その他本規約に関して争いが生じた場合には、両者協議のうえ、解決するものとします。<br/>

              2. 本契約に定めのない事項については、民法その他の法令によるものとします。<br/>

           </div>}
                <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();enroll(channel)}}>同意して決済へ進む</div>
              </div>
            }/>
        </div>
      }
    }
  }
  const getImage=(url)=>{
    // console.log(url)
    switch(url){
      case 'img_intermediate_grammar':
        return img_intermediate_grammar;
      case 'img_beginner_grammar':
        return img_beginner_grammar;
      case 'img_advanced_conversation':
        return img_advanced_conversation;
      case 'img_intermediate_conversation':
        return img_intermediate_conversation;
      case 'img_beginner_conversation':
        return img_beginner_conversation;
      case 'img_business_english':
        return img_business_english;
      case 'img_test_prep':
        return img_test_prep;
      default:
        console.log('No image found')
    }
  }
  //申込締切日＆
    return (
      <div class='accordion_item' style={{margin:'2%'}}>
              <div class='col'>
                <h1>{course.name}</h1>
                <div class='fixed-row'>
                  <img class='photo' src={getImage(course.thumbnail)}></img>
                  <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
                    <div class='row'>
                      {course.delivery?course.delivery.map((channel,i)=>{
                          return <span class='tag' style={channel.channel=='online private'?{backgroundColor:'tomato'}:channel.channel=='online group'?{backgroundColor:'#89CFF0'}:{backgroundColor:'lime'}}>{channel.channel}</span>
                      }):''}
                    </div>
                    <div class='fixed-row'>
                      <div class="btn" style={{position:'relative',width:'80%'}} onClick={() => setIsActive(!isActive)}>詳細</div>
                    </div>
                  </div>
                </div>
              </div>
        {isActive &&
          <div class='accordion-content'>
            <div class='col slim border'>
              <h2>コース詳細</h2>
              <EditorView content={course.description[0]} readOnly={true}/>
            </div>
            <div class='col border'>
              <h2>日程</h2>
              {enrolled.includes(course._id)?
                <div class='col' style={{backgroundColor:'#55DF80',fontWeight:'700',color:'white'}}>
                  YOU'RE ENROLLED!
                  <button style={{width:'50%',color:'white',backgroundColor:'black',fontWeight:'700'}} onClick={(e)=>{window.location='/clock_out'}}>FINISH</button>
                </div>
            :course.delivery?course.delivery.map((channel,i)=>{
              return (
                <div class='row'>
                  <h3>{channel.channel}</h3>
                  <div class='fixed-row'>
                    {channel.channel=='online private'?
                      <div class='fixed-row'>
                        <div class='col'>
                          いつでも受講可能！自分のペースで進めましょう！
                        </div>
                        {lockEnroll({attendance:[]},channel.channel)}
                      </div>
                    :channel.channel=='online group'?
                    <div class='fixed-row'>
                      <div class='col'>
                        コース開始日: {online_schedule.start}<br/>毎週の: {offline_schedule.time}<br/>コース卒業日: {online_schedule.graduation}
                      </div>
                      {lockEnroll(online_schedule,channel.channel)}
                    </div>
                    :<div class='fixed-row'>
                      <div class='col'>
                        コース開始日: {offline_schedule.start}<br/>毎週の: {offline_schedule.time}<br/>コース卒業日: {offline_schedule.graduation}
                       </div>
                       {lockEnroll(offline_schedule,channel.channel)}
                     </div>
                  }</div>
                </div>
              )
            }):''}
            </div>
            <div class='up_row'>
              <div class='col border'>
                <h2 style={{marginBottom:'5%'}}>コース内容</h2>
                <div class='fixed-row lesson' style={{marginTop:'0%'}}>
                  <div class='box'></div>
                  <div class='display'>
                    <h3>開始</h3>
                  </div>
                  <div class='connector'></div>
                </div>

                {course.lessons?course.lessons.sort((a,b)=>a.id-b.id).map((lesson,i)=>{
                  return (
                      <div class='fixed-row lesson'>
                        <div class='box'></div>
                        <div class='display'>
                          <div class='fixed-row'>
                            <h3>{lesson.id}</h3>
                            <EditorView content={lesson.content[0]} readOnly={true}/>
                          </div>
                        </div>
                        <div class='connector'></div>
                      </div>
                )
                }):''}
                <div class='fixed-row lesson'>
                  <div class='box'></div>
                  <div class='display'>
                    <h3>卒業</h3>
                  </div>
                </div>
              </div>
              {user.role=='teacher'||user.role=='manager'?
              <div class='col border'>
                <h2>Students</h2>
                {enrolled?enrolled.map((item,i)=>{
                  return (
                    <table>
                      <tr>
                        <td>{item.student.first}</td>
                        <td>{item.student.last}</td>
                        <td>{item.progress}</td>
                        <td><div class="btn" style={{position:'relative',width:'80%',backgroundColor:'lime',color:'white'}}>+</div></td>
                      </tr>
                    </table>
                  )
                })
                  :'No students enrolled!'}
              </div>
              :''}
            </div>
          </div>}
      </div>
    )
}
const EditorView = (props)=>{
  const [editorState,setEditorState] = useState()
  useEffect(()=>{
    props.content['entityMap']={}
    setEditorState(EditorState.createWithContent(convertFromRaw(props.content)))
  },[])

  return(
    <div class='row'>
      {editorState?(<div>
          <Editor editorState={editorState} readOnly={true}/>
      </div>):''}
    </div>
  )
}
export default CourseManagement;
