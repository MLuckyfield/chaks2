import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import ReactPlayer from 'react-player/youtube'

const TestProp = () => {

  return(
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=qgLZwUiLfAs' playing={true} volume={0} muted={true} width={'100%'} height={'60vh'} />
      <div id='intro' class='master-row' style={{background:'white'}}>
        <div class='col'>
            <div class='col slim center'>
                <h1>他の英会話教室とは一味違う</h1>
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
                      <div class='col'>他の英会話カフェではレベルが違ったり、人数が多くて英語を話す機会が少ないことがあります。

  当店では、グループはレベル別に分けられ、講師陣は全員が平等に英語を喋れるように会話をリードします。</div>
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
                      <div class='col'>予約は必要ありません。

  英会話をしたいときに来て、いつでも退店できるシステムです。</div>
                  </div>
            </div>
        </div>
      </div>
      <div class='col'>
        <div class='col slim center'>
            <h1>他の英会話教室とは一味違う</h1>
        </div>
        <div class='row'>
          <div class='col'>
            <div class='col' style={{height:'20%',backgroundColor:'#53cfe9',margin:'0',color:'white'}}>
              <h2>COMMITMENT</h2>
            </div>
            <div class='col' style={{height:'80%',backgroundColor:'#20bada',margin:'0',color:'white'}}>
              eaeiuthiuryctiuayn crayncieuwy eryeanryvny rhfyaegyr reyagrygue
            </div>
          </div>
          <div class='col'>
            <div class='col' style={{height:'20%',backgroundColor:'#4484c1',margin:'0',color:'white'}}>
              <h2>CONSISTENCY</h2>
            </div>
            <div class='col' style={{height:'80%',backgroundColor:'#3722aa',margin:'0',color:'white'}}>
              eaeiuthiuryctiuayn crayncieuwy eryeanryvny rhfyaegyr reyagrygue
            </div>
          </div>
          <div class='col'>
            <div class='col' style={{height:'20%',backgroundColor:'#f75c70',margin:'0',color:'white'}}>
              <h2>REWARD</h2>
            </div>
            <div class='col' style={{height:'80%',backgroundColor:'#dc4a5e',margin:'0',color:'white'}}>
              eaeiuthiuryctiuayn crayncieuwy eryeanryvny rhfyaegyr reyagrygue
            </div>
          </div>
        </div>
      </div>
    </div>
)
}

export default TestProp;
