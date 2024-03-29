import React, { useRef, useState,useEffect } from 'react';
import {axios} from "../../utilities/axios";

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
  const likes = useRef(student.profile?student.profile.likes:'');
  const goals = useRef(student.profile?student.profile.goals:'');
  const personal = useRef(student.profile?student.profile.personal:'');
  const level = useRef(student.profile?student.profile.level:'');

  const [feedback, setFeedback] = useState();

  useEffect(()=>{
    // likes.current.value = student.profile.likes
    // goals.current.value = student.profile.goals
    // personal.current.value = student.profile.personal
    // level.current.value = student.profile.level
  },[])

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
          window.location.reload(true)
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
