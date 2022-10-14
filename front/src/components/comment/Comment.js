import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"

const Comment = () => {

  //const [comment, setcomment] = useState();
  //const [password, setPassword] = useState();
  const comment = useRef('');
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student')));
  const [author, setAuthor] = useState(JSON.parse(localStorage.getItem('user')));
  const [active,setActive]=useState(true)
  const [hours, setHours] = useState(()=>{
    if(JSON.parse(localStorage.getItem('student')).statistics){
      let counter=0
      JSON.parse(localStorage.getItem('student')).statistics.forEach((item, i) => {
        counter+=moment(item.end).diff(moment(item.start), 'minutes')
      });
      return counter}else{return ''}
  });

  const [feedback, setFeedback] = useState();
  const speed = useRef();
  const listening = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    setActive(false)
    axios.post('/comment/new',
      {
        comment: comment.current.value,
        student: student,
        author: author,
      })
      .then((res) => {
          console.log('done')
          // setFeedback(res.data.message);
          window.location.reload(true)
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  const updateFluency =(e,id,tab)=>{
    e.preventDefault()
    console.log('fluency values',speed.current.value,listening)
    let action = {'$set':{'fluency.thinking':Number(speed.current.value)}}
    if(tab=='listening'){action= {'$set':{'fluency.listening':Number(listening.current.value)}}}
    axios.post('user/goals',{filter:{_id: id},data:action})
      .then((update)=>{
          console.log('new goals',update.data.data.goals,update)
      })
      .catch((err)=>{
        console.log('oops',err)
      })
  }
  return(
      <div class='row'>
        <form class='login' onSubmit={onSubmit} style={{width:'80%'}}>
                <h2>New Comment for {student.first}</h2>
                    <div class='row'>
                      <div class='col' style={{background: '1px solid black'}} onClick={()=>{window.location='/update_profile'}}>
                        {student.profile?<span><b>Likes:</b> {student.profile.likes}<br/>
                        <b>Goals:</b> {student.profile.goals}<br/>
                        <b>Personal:</b> {student.profile.personal}<br/>
                        <b>Level:</b> {student.profile.level}<br/>
                        <br/></span>:'No profile added! Click here to add'}
                      </div>
                      <div class='col'>
                        Fluency - UNDER DEVELOPMENT DO NOT USE
                        Speed
                        <select class='form-control' ref={speed}>
                          <option value="5">slowest</option>
                          <option value="6">20% slower</option>
                          <option value="7">10% slower</option>
                          <option value="8">normal</option>
                          <option value="9">fast</option>
                        </select>
                        <button style={{color:'white'}} onClick={(e)=>updateFluency(e,student._id)}>Update</button>

                        Listening
                        <select class='form-control' ref={listening}>
                          <option value="5">slowest</option>
                          <option value="6">20% slower</option>
                          <option value="7">10% slower</option>
                          <option value="8">normal</option>
                          <option value="9">fast</option>
                        </select>
                        <button style={{color:'white'}} onClick={(e)=>updateFluency(e,student._id,'listening')}>Update</button>
                      </div>
                    </div>
                    <div class="form-group">
                      <textarea ref={comment} type="text" class="form-control" placeholder="Comment: make sure to include 1) encouragement (1+ things they did well) 2) key topics you discussed 3) improvement points/English things you explained" required/>
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder={`${student.first} ${student.last}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    {active?<button type="submit" class="solid-first">Comment</button>:'Please wait... (manually refresh after 5 seconds)'}
                  </form>
                </div>
)
}

export default Comment;
