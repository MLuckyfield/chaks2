import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'
// import CircularProgressWithLabel from '@mui/material/CircularProgress'

const Statistics = (props)=>{

  const [progress,setProgress]=useState()
  const [grammar,setGrammar]=useState()
  const [grammar_progress,setGrammar_progress]=useState(0)
  const [idiom_progress,setIdiom_progress]=useState(0)
  const [idioms,setIdioms]=useState()
  const [speed,setSpeed]=useState()
  const [listening,setListening]=useState()
  const [level,setLevel]=useState()
  const [goals,setGoals]=useState([])
  const [user, setUser]=useState(JSON.parse(localStorage.getItem('user'))._id)
  useEffect(()=>{
    // console.log('loading account view for '+JSON.stringify(student))
    axios.get('user/progress', {params:{filter:{_id:user}}})
      .then((res) => {
          setProgress(res.data.data[0].progress)
          console.log(res.data.data)
          let grammar =[]
          let idioms =[]
          let grammar_track=0
          let idiom_track=0
          res.data.data[0].progress.forEach((item, i) => {
            if(item.ref.category=='grammar'){grammar.push(item);if(item.complete){grammar_track++}}
            if(item.ref.category=='idiom'){idioms.push(item);console.log(item.complete);if(item.complete){idiom_track++}}
          });
          matchGoals(res.data.data[0].progress,res.data.data[0].goals)
          setIdioms(idioms)
          setGrammar(grammar)
          // let fluency = res.data.data[0]
          // let speed = fluency.thinking.reduce((b,a)=>{return b+a})/fluency.thinking.length
          setSpeed(res.data.data[0].fluency.thinking/10)
          // let listening = fluency.listening.reduce((b,a)=>{return b+a})/fluency.listening.length
          setListening(res.data.data[0].fluency.listening/10)
          setGrammar_progress(grammar_track/grammar.length)
          setIdiom_progress(idiom_track/idioms.length)
          let ranking = (grammar_track/grammar.length+idiom_track/idioms.length+res.data.data[0].fluency.thinking/10+res.data.data[0].fluency.listening/10)/4
          if(ranking<=6){setLevel('B+')}
          if(ranking>6){setLevel('A')}
          if(ranking>7){setLevel('A+')}
          if(ranking>8){setLevel('S')}
          if(ranking>=10){setLevel('S+')}
          let rating = speed+listening+grammar_track/grammar_track.length+idiom_track/idiom_track.length
          if(rating>=0.9){setLevel('S')}
          if(rating>=0.8 && rating<0.9){setLevel('A')}
          if(rating>=0.7 && rating<0.8){setLevel('B')}
          if(rating>=0.6 && rating<0.7){setLevel('C')}
          if(rating<0.6){setLevel('D')}

        })
      .catch(error => console.log("error"+error))
  },[])

  //translate IDs saved in goals to a list to get names
  const matchGoals=(match,tobematched)=>{
    let temp = []
    if(tobematched){
      tobematched.forEach((goal, i) => {
        match.forEach((item, i) => {
          if(item.ref._id==goal.ref){
            temp.push(item)
          }
          });
        });
    }
    setGoals(temp)
  }
  const updateGoals =(e,id,tab)=>{
    e.preventDefault()
    let action = {'$push':{goals:{ref:id}}}
    if(tab=='$pull'){action={'$pull':{goals:{ref:id}}}}
    if(goals.length<3 || tab=='$pull'){
      axios.post('user/goals',{filter:{_id: user},data:action,goals:goals})
        .then((update)=>{
            console.log('new goals',update.data.data.goals,update)
            matchGoals(progress,update.data.data.goals)
            window.location.refresh()
        })
        .catch((err)=>{
          console.log('oops',err)
        })
    }
  }
  return (
    <div class='col'>
      <div class='row'>
        <div class='col border'>
          <h1>Fluency<span> Class: {level?level:'Loading...'}</span></h1>
          <ProgressBar title={'Speed'} percent={speed?speed:0}/>
          <ProgressBar title={'Listening'} percent={listening?listening:0}/>
          <ProgressBar title={'Correctness'} percent={grammar?grammar_progress:0}/>
          <ProgressBar title={'Naturalness'} percent={idioms?idiom_progress:0}/>
        </div>
      </div>
      <div class='container border'>
          <div class='col'>
            <div class='col'>
            <h1>Guided Course</h1>
            <h2 style={{marginTop:'10%'}}>Active Goals (Max 3)</h2>
              <table style={{border:'none',width:'100%',height:'100%'}}>
                  {goals?(
                    goals.length>0?(
                    goals.map((goal,i)=>{
                      return <tr style={{background:'none',verticalAlign:'middle',display:'table'}} ><td style={{width:'70%'}}>{goal.ref.name}</td><td style={{width:'15%'}}>{goal.ref.complete?<span style={{color:'green'}} class="material-icons">select_check_box</span>:goal.ref.success+goal.ref.fail>4?<ProgressCircle value={goal.ref.success/(goal.ref.fail+goal.ref.success)}/>:<ProgressCircle value={0}/>}</td><td  style={{width:'15%'}}><button class='round_button' style={{background:'none',borderColor:'red',color:'red',width:'20px',height:'20px'}} onClick={(e)=>{updateGoals(e,goal.ref._id,'$pull')}}>-</button></td></tr>
                    })):''
                  ):'You have not set any goals!'}
              </table>
            </div>
            <div class='up_row'>
                <div class='col_up'>
                    <h2>GRAMMAR ({grammar?grammar.length:''})</h2>
                    {<ProgressCircle value={grammar_progress} size={'big'}/>}
                    {grammar?<Accordion k={'sub_category'} data={grammar} goals={goals} updateGoals={updateGoals}/>:'Loading, please wait...'}
                </div>
                <div class='col_up'>
                    <h2>IDIOMS ({idioms?idioms.length:''})</h2>
                    {<ProgressCircle value={idiom_progress} size={'big'}/>}
                    {idioms?<Accordion k={'sub_category'} data={idioms} goals={goals} updateGoals={updateGoals}/>:'Loading, please wait...'}
                </div>
            </div>
          </div>
      </div>
    </div>
  )
}
const Accordion =(props)=>{
const [accordion,setAccordion] = useState([])
const [incept,setIncept] = useState(false)
const [limit,setLimit]=useState(props.goals)

useEffect(()=>{
  // console.log(props.data,props.k,props.test,props.lol,props)
  let unique = [...new Set((props.data.map((obj)=>{return obj.ref[props.k]})))]
  let temp =[]
  console.log('unique',unique)
  unique.forEach((item, i) => {
    let content=[]
    props.data.forEach((material, i) => {
      if(material.ref[props.k]==item){content.push(material)}
    });
    temp.push({title:item,content:content})
  });
  console.log('ready',temp)
  if(temp[0].content.length>1){console.log('intercepting');setIncept(true)}
  setAccordion(temp)
},[])

return (
    <div class='accordion'>
          {accordion?incept?(
            accordion.map((item,i) => (
               <AccordionItem incept={true} title={item.title} content={item.content} goals={limit} updateGoals={props.updateGoals}/>
            ))
          ):accordion.map(({ title, content, _id }) => (

              <AccordionItem title={title} content={content}  id={_id} goals={limit} updateGoals={props.updateGoals}/>
          )):'no data'}
    </div>
);
}
const AccordionItem=({ title, content,incept, id,goals, updateGoals})=>{

  const [isActive, setIsActive] = useState(false);
  const [limit, setLimit] = useState(goals);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  useEffect(()=>{
  },[])
return (
    <div class='accordion_item'>
      {incept?
        <div class='accordion-title clickable' onClick={() => setIsActive(!isActive)}>
          <h3>{title} ({content.length})</h3>
        </div>:
        <div class='accordion-title'>
            <table style={{border:'none',width:'100%',height:'100%'}}>
                <tr style={{background:'none',verticalAlign:'middle',display:'table'}} >
                  <td style={{width:'80%'}}>
                    <tr style={{background:'none',verticalAlign:'middle',display:'table'}}><td>{title}</td></tr>
                    {content[0].complete?'':<tr style={{background:'none',verticalAlign:'middle',display:'table'}}><td>{console.log('recieved',limit)}{limit.length<3?<button style={{background:'none',color:'brown',fontSize:'smaller',textDecoration:'underline',width:'50%',border:'none'}} onClick={(e)=>{updateGoals(e,content[0].ref._id,'$push')}}>Set Goal</button>:''}</td></tr>}
                  </td>
                  <td style={{width:'20%'}}>{content[0].complete?<span style={{color:'green'}} class="material-icons">select_check_box</span>:content[0].success+content[0].fail>4?<ProgressCircle value={content[0].success/(content[0].fail+content[0].success)}/>:<ProgressCircle value={0}/>}</td>
                </tr>
            </table>
        </div>}
      {isActive && <div class='accordion-content'>{incept?<Accordion k={'name'} data={content} goals={limit} id={id} updateGoals={updateGoals}/>:<span>{content[0].ref.name} {content[0].complete}</span>}</div>}
    </div>
)
}

const ProgressCircle = (props)=>{

  useEffect(()=>{
    console.log('graphs',props.value, props.value*360)
  },[])
  return (
    <span style={{display:'flex',justifyContent:'center',margin:'20px 0px'}}>
    {props.size=='big'?(
      <div class="big-circle-wrap">
          <div class="big-circle">
            <div class="big-mask big-full">
              <div class="big-fill" style={{transform:`rotate(${(props.value)*360}deg)`}}></div>
            </div>
            <div class="big-mask big-half">
              <div class="big-fill"></div>
            </div>
            <div class="big-inside-circle"> {(props.value*100).toFixed(2)}% </div>
          </div>
        </div>
    ):(
      <div class="circle-wrap">
          <div class="circle">
            <div class="mask full">
              <div class="fill" style={{transform:`rotate(${props.value*360}deg)`}}></div>
            </div>
            <div class="mask half">
              <div class="fill"></div>
            </div>
            <div class="inside-circle"> {(props.value*100).toFixed(2)}% </div>
          </div>
        </div>
    )}</span>
  )
}

const ProgressBar = ({percent,title})=>{
  return (
    <table style={{border:'none',width:'100%',height:'100%'}}>
      <tr style={{background:'none',verticalAlign:'middle',display:'table'}} >
        <td style={{width:'30%'}}><h2>{title}</h2></td>
        <td style={{width:'70%'}}>
          <div class="progress-container">
            <div class="progress" style={{width:`${percent*100}%`}}></div>
          </div>
        </td>
      </tr>
    </table>
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
