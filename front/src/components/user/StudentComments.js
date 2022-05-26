import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/Comment";
import {useAuthDataContext} from "../auth-provider";

const StudentComments = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    let target = ''
    if (localStorage.getItem('student')){
      target = localStorage.getItem('student')
    }else{target=JSON.parse(localStorage.getItem('user'))}

    axios.get('/comment/all', {params:{filter:target}})
      .then((res) => {
          setComments(res.data.data);
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div class='master-row'>
    {JSON.parse(localStorage.getItem('user')).role=='teacher'||JSON.parse(localStorage.getItem('user')).role=='manager'?<Comment/>:''}
      <h1>Feedback</h1>
      <div class='row'>
        <table>

          {comments ? (comments.map(function(item, i){
              return (
                <tr>
                  <td>{item.author}</td>
                  <td>{item.comment}</td>
                </tr>
              )

                  })): 'No data to display'}
        </table>
      </div>
      </div>
)
}

export default StudentComments;
