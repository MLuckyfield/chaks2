import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
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
  const likes = useRef();
  const goals = useRef();
  const personal = useRef();
  const level = useRef();

  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/user/update',
      {
        filter: {_id:student._id},
        data: {
            profile:{
            likes:likes.current.value,
            goals:goals.current.value,
            personal:personal.current.value,
            level:level.current.value,
          }
        },
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
              <label>Likes</label>
              <textarea ref={likes} type="text" class="form-control" required/>
            </div>
            <div class="form-group">
            <label>Goals</label>
              <textarea ref={goals} type="text" class="form-control" required/>
            </div>
            <div class="form-group">
            <label>Personal</label>
              <textarea ref={personal} type="text" class="form-control" required/>
            </div>
            <div class="form-group">
            <label>Level</label>
              <select class='form-control' ref={level}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <label>{feedback}</label>
            <button type="submit" class="solid-first">Profile</button>
          </form>
        </div>
)
}

export default Profile;
