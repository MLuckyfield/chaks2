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
      {student.role=='teacher'?(
        <TeacherSchedule target={student._id}/>
      ):(
        <form class='login' onSubmit={onSubmit} style={{width:'80%'}}>
          <h2>New Comment for {student.first} ({student.points?student.points.length:'0'}points left)</h2>
                  <h2>{student.reward} status</h2>
                      <div class='row'>
                        <div class='col' style={{background: '1px solid black'}} onClick={()=>{window.location='/update_profile'}}>
                          {student.profile?<span><b>Likes:</b> {student.profile.likes}<br/>
                          <b>Goals:</b> {student.profile.goals}<br/>
                          <b>Personal:</b> {student.profile.personal}<br/>
                          <b>Level:</b> {student.profile.level}<br/>
                          <br/></span>:'No profile added! Click here to add'}
                        </div>
                        <div class='col border'>
                          <h2>Fluency</h2>
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
      )}
      </div>
)
}

const TeacherSchedule=(props)=>{
  const [editActive,setEditActive]=useState(false)
  const day = useRef('');
  const start_hour=useRef('');
  const start_minute=useRef('');
  const end_hour=useRef('');
  const end_minute=useRef('');

  const onSubmit=(e)=>{
    e.preventDefault();
    let shift={
      day:day.current.value,
      start_hour:start_hour.current.value,
      start_minute:start_minute.current.value,
      end_hour:end_hour.current.value,
      end_minute:end_minute.current.value,
    }
    console.log('shift to be added',shift)
    axios.post('/user/update',{filter:{_id:props.target},
                               data:{'$push':{online_schedule:shift}}})
      .then((res) => {
          console.log('success',res.data.data)
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }

  return(
    <div>
      {editActive?(
        <form class='make_blog' onSubmit={onSubmit}>
            <div class="form-group make_blog">
              <select class='form-control' ref={day}>
                <option class='col slim feedback clickable' value={0}>Sunday</option>
                <option class='col slim feedback clickable' value={1}>Monday</option>
                <option class='col slim feedback clickable' value={2}>Tuesday</option>
                <option class='col slim feedback clickable' value={3}>Wednesday</option>
                <option class='col slim feedback clickable' value={4}>Thursday</option>
                <option class='col slim feedback clickable' value={5}>Friday</option>
                <option class='col slim feedback clickable' value={6}>Saturday</option>
              </select>
            </div>
            <div class="form-group make_blog">
              <input ref={start_hour} type="number" class="form-control" min='0' max='24' required/>
              <input ref={start_minute} type="number" class="form-control" min='0' max='60' required/>
            </div>
            <div class="form-group make_blog">
              <input ref={end_hour} type="number" class="form-control" min='0' max='24' required/>
              <input ref={end_minute} type="number" class="form-control" min='0' max='60' required/>
            </div>
            <button type="submit" class="solid-first">Submit</button>
        </form>
      ):(
        <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();console.log(editActive,!editActive);setEditActive(!editActive)}}>Add Day</div>
      )}
    </div>
  )
}
export default Comment;
