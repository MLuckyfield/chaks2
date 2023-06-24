import moment from "moment"
import {axios} from "../../utilities/axios";
import {io} from 'socket.io-client';
import React, { useRef, useState, useEffect } from 'react';
import {endSession} from '../../utilities/helpers'

const socket = io();

const SessionTable = ()=>{
  const [comments, setComments] = useState();
  const [source,setSource] =useState()
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return JSON.parse(localStorage.getItem('user'))}
  })

  useEffect(() => {
    socket.on('startSession',(comment)=>{
      window.location.reload()
    })
    socket.on('endSession',(comment)=>{
      window.location.reload()
    })
    axios.get('comment/getInSession')
      .then((result)=>{
        result = result.data.data
         setComments(result)
         // dispatch(action.updateInSession(result))

      })
      .catch(error=>console.log('From sendTo teacher:',error))
  },[])

  const makeComment = (item)=>{
    console.log('raw',item)
    let temp = item
    delete temp.teacher
    console.log('after',JSON.stringify(temp))
      localStorage.setItem('student',JSON.stringify(temp))
      window.location='/student';
      // setTarget(item)
      // console.log(target)
  }
  return(
    <div class='col'>
      <h1>In Session ({comments?comments.length:''})</h1>
      <table>
        <tr>
          <th>first</th>
          <th>last</th>
          <th>teacher</th>
          <th>start</th>
          <th>status</th>
          <th> </th>
        </tr>
      {comments?comments.map((comment,i)=>{
        console.log('loading',comment._id,comments)
        return (<tr>
          <td>{comment.student.first}</td>
          <td>{comment.student.last}</td>
          <td>{'author' in comment?comment.author.first:''}</td>
          <td>{moment(new Date(comment.createdAt)).format("MMM Do HH:mm")}</td>
          <td>{comment.hasOwnProperty('end')?comment.status:<button onClick={()=>endSession(comment.student._id)} style={{backgroundColor:'red'}}>End</button>}</td>
          <td><button onClick={()=>makeComment(comment.student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
        </tr>)
      }):'None. :('}
      </table>

    </div>
  )
}
export default SessionTable;
