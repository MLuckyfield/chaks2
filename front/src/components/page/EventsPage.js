import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import banner from '../../banner.jpg'

const EventsPage = () => {

  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState();
  const email = useRef('');
  const password = useRef('');

  const [feedback, setFeedback] = useState();
  const { onEventsPage } = useAuthDataContext();

  const onSubmit = (e) => {
    e.preventDefault();


    // axios.post('/user/EventsPage',
    //   {
    //     email: email.current.value,
    //     password: password.current.value
    //   })
    //   .then((res) => {
    //       onEventsPage(res.data.result);
    //       })
    //   .catch((err) => {
    //     console.log(err);
    //     // setFeedback(err.response.data.message);
    //     });
  }

  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage: 'url('+banner+')'}}>
            <div class='overlay'>
                <div class='row'>
                  <div class='col'>
                    <h1 class='logo-basic'>INTERNATIONAL PARTY！ FRIDAY 6/24</h1>
                  </div>
                </div>
            </div>
      </div>
      <div id='merit' class='master-row mid'>
          <div class='row'>
                <div class='col slim'>
                    <h1 class='col'>CONEPT</h1>
                    <div class='col'>生の英会話を楽しめる！テキストを使わず、自由な会話をベースとしたスタイルなので、あなたの知りたいことや話したいことをテーマにして生の英会話を楽しめます。</div>
                </div>
                <div class='col slim'>
                    <h1 class='col'>DETAILS</h1>
                    <div class='col'>いつでも参加できる！好きな時間に来店し自由に英会話へ参加ができ、好きな時間に退出ができます！</div>
                </div>
          </div>
      </div>
    </div>
)
}

export default EventsPage;
