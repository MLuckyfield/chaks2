import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'
// import CircularProgressWithLabel from '@mui/material/CircularProgress'

const Statistics = (props)=>{

  const [progress,setProgress]=useState()
  const [grammar,setGrammar]=useState()
  const [idioms,setIdioms]=useState()
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
          let grammar =[]
          let idioms =[]
          res.data.data[0].progress.forEach((item, i) => {
            if(item.ref.category=='grammar'){grammar.push(item)}
            if(item.ref.category=='idiom'){idioms.push(item)}
          });
          setIdioms(idioms)
          setGrammar(grammar)
        })
      .catch(error => console.log("error"+error))
  },[])

  return (
    <div class='up_row'>
        <div class='col_up'>
            <h1>GRAMMAR ({grammar?grammar.length:''})</h1>
            {grammar?<Accordion k={'sub_category'} data={grammar}/>:'none'}
        </div>
        <div class='col_up'>
            <h1>IDIOMS ({idioms?idioms.length:''})</h1>
            {idioms?<Accordion k={'sub_category'} data={idioms}/>:'none'}
        </div>
    </div>
  )
}
const Accordion =(props)=>{
const [accordion,setAccordion] = useState([])
const [incept,setIncept] = useState(false)

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
               <AccordionItem incept={true} title={item.title} content={item.content}/>
            ))
          ):accordion.map(({ title, content }) => (
              <AccordionItem title={title} content={content}/>
          )):'no data'}
    </div>
);
}
const AccordionItem=({ title, content,incept })=>{
  const [isActive, setIsActive] = useState(false);
return (
    <div class='accordion_item'>
      {incept?
        <div class='accordion-title clickable' onClick={() => setIsActive(!isActive)}>
          <h2>{title} ({content.length})</h2>
        </div>:
        <div class='accordion-title'>
            <table style={{border:'none',width:'100%',height:'100%'}}>
                <tr style={{background:'none'}}>
                  <td>{title}</td> <td>{content[0].complete?<span style={{color:'green'}} class="material-icons">select_check_box</span>:<ProgressCircle value={0.1}/>}</td>}
                </tr>
            </table>
        </div>}
      {isActive && <div class='accordion-content'>{incept?<Accordion k={'name'} data={content}/>:<span>{content[0].ref.name} {content[0].complete}</span>}</div>}
    </div>

)
}

const ProgressCircle = (props)=>{
  return (
    <div class="circle-wrap">
        <div class="circle">
          <div class="mask full">
            <div class="fill" style={{transform:`rotate(${props.value*360}deg)`}}></div>
          </div>
          <div class="mask half">
            <div class="fill"></div>
          </div>
          <div class="inside-circle"> {props.value}% </div>
        </div>
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
