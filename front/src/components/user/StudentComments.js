import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";

const StudentComments = (props) => {

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
  },[props.student])

  return(
    <div class='master-row'>
      <h1>{props.name}</h1>
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
