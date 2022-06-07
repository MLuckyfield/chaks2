import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const BlogFront = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios.get('/content/all')
      .then((res) => {
          setComments(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div>
      <div class='nav-filler'>
      </div>
      <div class='master-row'>
        <h1>Blog</h1>
        <div class='col'>
            {comments ? (comments.map(function(item, i){
                return (
                  <div class='col feedback'>
                      <div class=''><h3>{item.title}</h3></div>
                      <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                  </div>
                )

              })): 'Loading...'}
        </div>
        </div>
      </div>
)
}

export default BlogFront;
