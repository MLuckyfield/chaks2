import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const BlogPosts = () => {

  const [comments, setComments] = useState(null);
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('/blog/all')
      .then((res) => {
          setComments(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div class='master-row'>
      <h1>Blog Posts ({comments?comments.length:'None Yet!'})</h1>
      <div class='col'>
        <button onClick={()=>window.location='/new/blog'} class="solid-first">New Blog Post</button>
          {comments ? (comments.map(function(item, i){
              return (
                <div class='col feedback'>
                    <div class=''>{item.title}</div>
                    <div class=''>{item.author.first} {item.author.last}</div>
                    <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                </div>
              )

                  })): 'No data to display'}
      </div>
      </div>
)
}

export default BlogPosts;
