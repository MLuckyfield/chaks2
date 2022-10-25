import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"

const TestProp = () => {


  return(
    <div>
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
                      <span class='material-icons'>sentiment_very_satisfied</span>
                      <h2>様々な英会話メニュー</h2>
                      <div class='col'>50以上の英会話トピック、10以上の英会話特訓ゲーム、自由な英会話など様々なメニューがあるので、いつでも英語学習を楽しめます。</div>
                  </div>
            </div>
            <div class='up_row'>
                  <div class='col'>
                      <span class='material-icons'>sports_bar</span>
                      <h2>国際交流イベント</h2>
                      <div class='col'>グループレッスンで英会話力を向上したら、あなたの英会話力を国際交流イベントでテストしてみましょう。</div>
                  </div>
                  <div class='col'>
                      <span class='material-icons'>schedule</span>
                      <h2>予約不要</h2>
                      <div class='col'>予約は必要ありません。

  英会話をしたいときに来て、いつでも退店できるシステムです。</div>
                  </div>
            </div>
            <div class='row'>
              <div class='col'><button class='solid-first cta' onClick={()=>window.location='/about'}>Mission</button></div>
              <div class='col'><button class='solid-first cta' onClick={()=>window.location='/blog/62bbf3e2f048ac1e59f2856a/私達と他の英会話教室の違いについて'}>他社との違い</button></div>
            </div>
        </div>
      </div>
      <div class='row'>
        <div class='col'>
          <div class='col' style={{height:'20%'}}>
            <h2>COMMITMENT</h2>
          </div>
          <div class='col' style={{height:'80%'}}>
            eaeiuthiuryctiuayn crayncieuwy eryeanryvny rhfyaegyr reyagrygue
          </div>
        </div>
        <div class='col'>
        </div>
        <div class='col'>
        </div>
      </div>
    </div>
)
}

export default TestProp;
