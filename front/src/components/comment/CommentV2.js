import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import {checkPermission,getCurrentUser} from '../../utilities/helpers'
import * as constants from '../../utilities/constants'

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
  return(
    <div class='col feedback'>
        <div class='col'>
          {comment.status=='approved'?comment.comment:'Feedback in progress - please check within 24 hours!'
          }
        </div>
        <div class="chip">
          <img src={constants.PROFILES[`_${comment.author._id}`]} alt="Person" width="96" height="96"></img>
          {comment.author.first} {comment.author.last}
          <div style={{fontSize:'0.8em'}}>{moment(comment.createdAt).format('dddd MMM-DD')}</div>
        </div>
        {comment.status=='draft'&&checkPermission(user.role,constants.MANAGER)?<button onClick={(e)=>approveComment(comment._id,e)} class="solid-first">Approve</button>:''}
    </div>
)
}


export default Comment;
