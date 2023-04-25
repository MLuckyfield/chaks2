import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import {checkPermission,getCurrentUser} from '../../utilities/helpers'
import * as constants from '../../utilities/constants'
import Popup from '../utilities/popup'

const Comment = (props) => {

  const [comment, setcomment] = useState(props.comment);
  const commentContent = useRef({value:''});
  const [active,setActive]=useState(true)
  const [user,setUser]=useState(getCurrentUser())

  useEffect(()=>{
    console.log('comment recieved',props.comment.hasOwnProperty('comment'),comment, commentContent)
    commentContent.current.value=props.comment.hasOwnProperty('comment')?props.comment.comment:''
  },[])

  const draftComment = (commentId, e) => {
    e.preventDefault();
    setActive(false)
    axios.post('/comment/draftComment',
      {
        commentId:commentId,
        comment: commentContent.current.value,
      })
      .then((res) => {
          console.log('done')
          // setFeedback(res.data.message);
          window.location.reload()
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  const approveComment = (commentId, e) => {
    e.preventDefault();
    setActive(false)
    axios.post('/comment/approveComment',
      {
        commentId:commentId,
        comment: commentContent.current.value,
      })
      .then((res) => {
          console.log('done')
          // setFeedback(res.data.message);
          window.location.reload()
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  const reassignTeacher = (teacherId, e) => {
    e.preventDefault();
    axios.post('/comment/reassignTeacher',
      {
        commentId:comment._id,
        teacherId: teacherId,
      })
      .then((res) => {
          console.log('done')
          // setFeedback(res.data.message);
          window.location.reload()
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  return(
    <div class='col feedback'>
        <div class='col'>
          {comment.status=='approved'?comment.comment:
          (
            checkPermission(user.role,constants.TEACHER)?
            <form onSubmit={(e)=>draftComment(comment._id,e)} style={{width:'80%'}}>
            <h2>New Comment</h2>
            <h3>{comment.status}</h3>
            <div>
              <textarea ref={commentContent} type="text" class="form-control" placeholder="Comment: make sure to include 1) encouragement (1+ things they did well) 2) key topics you discussed 3) improvement points/English things you explained" required/>
            </div>
            <div>
              <input type="text" class="form-control" placeholder={`${props.student.first} ${props.student.last}`} disabled/>
            </div>
            {active?<button type="submit"  class="solid-first">Comment</button>:'Please wait... (manually refresh after 5 seconds)'}
            </form>
            :'Feedback in progress - please check within 24 hours!'
          )}
        </div>
        {comment.status=='draft'&&checkPermission(user.role,constants.MANAGER)?
        <div class='col'>
          <button onClick={(e)=>approveComment(comment._id,e)} class="solid-first">Approve</button>
        </div>:''}
        {comment.status=='pending'&&checkPermission(user.role,constants.MANAGER)?
        <div class='col'>
          <Popup button={"Reassign"} num={4} content={
            <div class='col'>
              {Object.keys(constants.PROFILES).map((teacherId,i)=>{
                 return <button onClick={()=>reassignTeacher(teacherId.slice(1)} class='button'>{constants.PROFILES[teacherId].name}</button>

              })}
              
            </div>
          }/>
        </div>:''}
        <div class="chip">
          <img src={constants.PROFILES[`_${comment.author._id}`].image} alt="Person" width="96" height="96"></img>
          {comment.author.first} {comment.author.last}
        </div>
        <div style={{fontSize:'0.8em'}}>{moment(comment.createdAt).format('dddd MMM-DD')}</div>

    </div>
)
}


export default Comment;
