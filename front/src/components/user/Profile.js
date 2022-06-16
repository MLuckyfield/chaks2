import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const Profile = () => {

  //const [Profile, setProfile] = useState();
  //const [password, setPassword] = useState();

  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student')));
  // const [hours, setHours] = useState(()=>{
  //   let counter=0
  //   JSON.parse(localStorage.getItem('student')).statistics.map(function(item,i){
  //     counter+=moment(item.start).diff(moment(item.end), 'hours')
  //   })
  // });
  const profile = useRef(student.profile?student.profile:'');
  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/update',
      {
        filter: {_id:student._id},
        data: {profile:profile.current.value},
      })
      .then((res) => {
          setFeedback(res.data.message);
          // window.location='/dash';
          })
      .catch((err) => {
        setFeedback(err.response.data.message);
        });
  }

  return(
      <div class='row'>
        <form class='login' onSubmit={onSubmit}>
        <h2>{student.first}'s Profile</h2>
            <div class="form-group">
              <textarea ref={profile} type="text" class="form-control" placeholder={student.profile?student.profile:'Add comments about hobbies, personality, family, plans, etc'} required/>
            </div>
            <label>{feedback}</label>
            <button type="submit" class="solid-first">Profile</button>
          </form>
        </div>
)
}

export default Profile;
