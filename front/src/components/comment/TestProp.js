import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import ReactPlayer from 'react-player/youtube'
import atmos from '../../atmosphere.jpg'
import event_game from '../../event_game.jpg'

const TestProp = () => {

  return(
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=qgLZwUiLfAs' playing={false} volume={0} muted={true} width={'100%'} height={'60vh'} playIcon={<div class='mini_overlay' style={{height:'500px',width:'500px',zIndex:'10'}}>hello</div>}/>
      <div id='intro' class='master-row' style={{background:'white',color:'white',paddingTop:'0'}}>
        <div class='col' style={{backgroundImage: 'url('+atmos+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>
            <div class='mini_overlay col' style={{backgroundColor:'rgba(0,0,0,0.3)',width:'100%',margin:'0'}}>
            <div class='col slim center'>
                <h1 style={{padding:'5%',border:'1px solid white'}}>他の英会話教室とは一味違う</h1>
            </div>
            <div class='up_row'>
                  <div class='col'>
                      <span class='material-icons'>school</span>
                      <h2>しっかり学ぶ</h2>
                      <div class='col'>英会話講師経験のあるネイティブスピーカーがホワイトボードを使って正しい英語を 分かりやすく教えてくれます。</div>
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
      <div class='col border'>
        <div class='col slim center'>
            <h1>私達の価値観</h1>
        </div>
        <div class='row'>
          <div class='col' style={{width:'100%',padding:'0',margin:'0',marginTop:'1%'}}>
            <div class='col' style={{height:'20%',backgroundColor:'#53cfe9',margin:'0',color:'white',padding:'6%'}}>
              <h2>COMMITMENT</h2>
            </div>
            <div class='col' style={{height:'38vh',backgroundColor:'#20bada',margin:'0',color:'white',padding:'6%'}}>
              最初に、月に何時間勉強したいを決めて、コミット！
              <hr/>
              <p>
              中途半端に勉強するのではなく、「英語力の成長」を、自分に約束すること。</p>
            </div>
          </div>
          <div class='col'  style={{width:'100%',padding:'0',margin:'0',marginTop:'1%'}}>
            <div class='col' style={{height:'20%',backgroundColor:'#4484c1',margin:'0',color:'white',padding:'6%'}}>
              <h2>CONSISTENCY</h2>
            </div>
            <div class='col' style={{height:'38vh',backgroundColor:'#3722aa',margin:'0',color:'white',padding:'6%'}}>
              自分が好きな時に、自由にご来店、 習慣化を図ろう！
              <hr/>
              <p>
              １回で５時間勉強するより、５回１時間勉強する方がよい。</p>
            </div>
          </div>
          <div class='col' style={{width:'100%',padding:'0',margin:'0',marginTop:'1%'}}>
            <div class='col' style={{height:'20%',backgroundColor:'#f75c70',margin:'0',color:'white',padding:'6%'}}>
              <h2>REWARD</h2>
            </div>
            <div class='col' style={{height:'38vh',backgroundColor:'#dc4a5e',margin:'0',color:'white',padding:'6%'}}>
              英語力を向上しながら、 ボーナスリワードも ゲット！
              <hr/>
              <p>
              モティベーションを下げないように、リワードをもらって楽しく勉強を進める。</p>
            </div>
          </div>
        </div>
      </div>
      <div class='col dark' style={{width:'100%',margin:'0'}}>
        <h2 style={{padding:'5%'}}>+もっと楽しく！</h2>
        <div class='row'>
          <div class='col' style={{height:'50vh',backgroundImage: 'url('+event_game+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>
            <div class='mini_overlay' style={{backgroundColor:'rgba(188,151,151,0.7)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid white'}}>
              <div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                  <h2>EVENTS</h2>
                  <button class='solid-first cta' style={{margin:'5%'}} onClick={()=>window.location='/events'}>レッスン</button>
              </div>
            </div>
          </div>
          <div class='col' style={{height:'50vh',backgroundImage: 'url('+event_game+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>
            <div class='mini_overlay' style={{backgroundColor:'rgba(188,151,151,0.7)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid white'}}>
              <div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                  <h2>GUIDED COURSE</h2>
                  <span style={{height:'40px',margin:'5%',textAlign:'center'}}>文法、イディオム、７０以上のコースで勉強可能</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
)
}

export default TestProp;
