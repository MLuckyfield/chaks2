import React, { useEffect, useState} from 'react';
import Signup from "../user/Signup";
import background from '../../online_background.jpg'

const Online_Landing = () => {

  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage:'url('+background+')'} }>
        <div class='overlay'>
            <div class='row'>
              <div class='col'>
                <h2>CHATSHACK is now</h2>
                <h1>ONLINE</h1>
              </div>
            </div>
        </div>
      </div>
      <div class='row'>
          <div class='col'>
            <div class='fixed-row'>
              <span class="material-icons green align">task_alt</span><h2>ネイティブスピーカー</h2>
            </div>
            <div class='fixed-row'>
              <span class="material-icons green align">task_alt</span><h2>マンツーマンレッスン</h2>
            </div>
            <div class='fixed-row'>
              <span class="material-icons green align">task_alt</span><h2>優秀な講師陣</h2>
            </div>
          </div>
        </div>
        <div class='col'>
          <div class='fixed-row'>
            <span class="material-icons green align">task_alt</span><h2>オンラインフィードバック</h2>
          </div>
          <div class='fixed-row'>
            <span class="material-icons green align">task_alt</span><h2>自由なレッスン</h2>
          </div>
          <div class='fixed-row'>
            <span class="material-icons green align">task_alt</span><h2>選べるレッスン時間</h2>
          </div>
        </div>
      </div>
      <div class='col'>
        <div class='col'>
          <span class="material-icons green align">looks_1</span><h2>step 1</h2>
          <p>blah blah</p>
        </div>
        <div class='col'>
          <span class="material-icons green align">looks_2</span><h2>step 2</h2>
          <p>blah blah</p>
        </div>
        <div class='col'>
          <span class="material-icons green align">looks_3</span><h2>step 3</h2>
          <p>blah blah</p>
        </div>
      </div>
      <Signup redirect={'/online'}/>
    </div>
)
}

export default Online_Landing;
