import React, { useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import moment from "moment"
import QRCode from 'react-qr-code'

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
    <div class='master-row'>
        <div class='col border'>
            <h1>GRAMMAR</h1>
            <table>
              <tr>
                  <th>name</th>
                  <th>detail</th>
                  <th>complete</th>
              </tr>
                {grammar?
                grammar.map((material,i)=>{
                  return   (
                    <tr>
                      <th>{material.ref.name}</th>
                      <th>{material.ref.sub_category}</th>
                      <th>{material.complete?'done':'not yet'}</th>
                  </tr>)
                }):'none'}
            </table>
            <h1>IDIOMS</h1>
            <table>
              <tr>
                  <th>name</th>
                  <th>detail</th>
                  <th>complete</th>
              </tr>
                {idioms?<Accordion data={idioms} k={'sub_category'} test='hi' lol={'lol'}/>:'none'}
            </table>
        </div>
    </div>
  )
}
const Accordion =(props)=>{
const [accordion,setAccordion] = useState([])
const [incept,setIncept] = useState()

useEffect(()=>{
  console.log(props.data,props.k,props.test,props.lol,props)
  let unique = [...new Set((props.data.map((obj)=>{return obj.ref[props.k]})))]
  let temp =[]
  console.log('unique',unique)
  unique.forEach((item, i) => {
    let content=[]
    props.data.forEach((material, i) => {
      if(material.ref[props.k]==item){content.push(material.ref)}
    });
    temp.push({title:item,content:content})
  });
  console.log('ready',temp)
  if(temp[0].content instanceof Array){console.log('intercepting');setIncept(true)}
  setAccordion(temp)
},[])

return (
    <div class='accordion'>
          {accordion?incept?(
            accordion.map(({ title, content }) => (
               <Accordion data={content} key={'name'}/>
            ))
          ):accordion.map(({ title, content }) => (
              <AccordionItem title={title} content={content}/>
          )):'no data'}
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
    {isActive && <div class='accordion-content'>{content.name} {content.complete}</div>}
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
