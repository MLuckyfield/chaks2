import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import Profile from "./Profile";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const StudentComments = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    let target = ''
    if (localStorage.getItem('student')){
      target = JSON.parse(localStorage.getItem('student'))
    }else{target=JSON.parse(localStorage.getItem('user'))}

    axios.get('/comment/all', {params:{filter:target._id}})
      .then((res) => {
          setComments(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div class='master-row'>
      <div class='row'>
        {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
        {JSON.parse(localStorage.getItem('user')).role=='manager'||JSON.parse(localStorage.getItem('user')).role=='admin'?<Profile/>:''}
      </div>
      <h1>Feedback ({comments?comments.length:'None Yet!'})</h1>
      <div class='col'>
          {comments ? (comments.map(function(item, i){
              return (
                <div class='col feedback'>
                    <div class=''>{item.comment}</div>
                    <div class=''>{item.author.first} {item.author.last}</div>
                    <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                </div>
              )

                  })): 'No data to display'}
      </div>
      </div>
)
}

export default StudentComments;
