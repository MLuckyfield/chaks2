import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import {useAuthDataContext} from "../auth-provider";

const StudentComments = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    let target = ''
    if (localStorage.getItem('student')){
      target = JSON.parse(localStorage.getItem('student'))
    }else{target=JSON.parse(localStorage.getItem('user'))}

    axios.get('/comment/all', {params:{filter:target._id}})
      .then((res) => {
          setComments(res.data.data);
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div class='master-row'>
    {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
      <h1>Feedback</h1>
      <div class='col'>

          {comments ? (comments.map(function(item, i){
              return (
                <div class='col'>
                    <div class=''>{item.createdAt}</div>
                    <div class=''>{item.comment}</div>
                    <div class=''>{item.author.first} {item.author.last}</div>
                </div>
              )

                  })): 'No data to display'}
      </div>
      </div>
)
}

export default StudentComments;
