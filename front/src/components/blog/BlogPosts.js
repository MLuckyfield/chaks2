import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const BlogPosts = () => {

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
      <h1>Blog Posts ({comments?comments.length:'None Yet!'})</h1>
      <div class='row'>
        <button onClick={()=>window.location='/new-blog'} class="solid-first">New Blog Post</button>
          {comments ? (comments.map(function(item, i){
              return (
                <div class='col blog_thumbnail'>
                    <div class=''><h3>{item.title}</h3></div>
                    <div class=''>{item.author.first} {item.author.last}</div>
                    <div class=''>{moment(item.createdAt).format('dddd MMM-DD')}</div>
                </div>
              )

                  })): 'No data to display'}
      </div>
      </div>
      </div>
)
}

export default BlogPosts;
