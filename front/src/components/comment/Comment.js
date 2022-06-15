import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";

const Comment = () => {

  //const [comment, setcomment] = useState();
  //const [password, setPassword] = useState();
  const comment = useRef('');
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem('student')));
  const [author, setAuthor] = useState(JSON.parse(localStorage.getItem('user')));
  const [hours, setHours] = useState(()=>{
    let counter=0
    JSON.parse(localStorage.getItem('student')).statistics.map(function(item,i){
      counter+=moment(item.start).diff(moment(item.end), 'hours')
    })
    return counter
  });

  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/comment/new',
      {
        comment: comment.current.value,
        student: student,
        author: author,
      })
      .then((res) => {
          setFeedback(res.data.message);
          window.location='/dash';
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }

  return(
      <div class='row'>
        <form class='login' onSubmit={onSubmit}>
                <h2>New Comment for {student.first}</h2>
                  {student.profile}
                  {student.plan}
                  {student.email}
                  {student.hours}
                    <div class="form-group">
                      <textarea ref={comment} type="text" class="form-control" placeholder="comment" required/>

                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder={`${student.first} ${student.last}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Comment</button>

                  </form>
                </div>
)
}

export default Comment;
