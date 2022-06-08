import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import moment from "moment"

const BlogDisplay = () => {

  const [blog, setBlog] = useState(localStorage.getItem('blog'));

  useEffect(() => {
    axios.get('/content/all',{params:{filter:blog}})
      .then((res) => {
          setBlog(res.data.data);
        })
      .catch(error => console.log("error"+error))
  },[])

  return(
    <div>
    <div class='nav-filler'>
    </div>
    <div class='master-row'>
        {blog?(
          <div class='col'>
            <h1>{blog.title}</h1>
            <div class='row'>
              {blog.preview}
            </div>
            <div class='row'>
              {blog.content}
            </div>
          </div>
        ):'Sorry there was a problem!'}
      </div>
      </div>
)
}

export default BlogDisplay;
