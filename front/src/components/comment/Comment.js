import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";

const Comment = () => {

  //const [comment, setcomment] = useState();
  //const [password, setPassword] = useState();
  const comment = useRef('');
  const student = useRef(localStorage.getItem('student'));
  const author = useRef(localStorage.getItem('user'));

  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();


    axios.post('/comment/new',
      {
        comment: comment.current.value,
        student: student.current.value,
        author: author.current.value,
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
        <form class='Comment' onSubmit={onSubmit}>
                <h2>New Comment</h2>
                    <div class="form-group">
                      <input ref={comment} type="text" class="form-control" placeholder="comment" required/>

                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder={`${student.first} ${student.last}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="outline-first">Comment</button>

                  </form>
                </div>
)
}

export default Comment;
