import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'
import moment from "moment"

const BlogDisplay = () => {

  const [blog, setBlog] = useState(localStorage.getItem('blog'));

  useEffect(() => {
    axios.get('/content/all',{params:{filter:{_id:blog}}})
      .then((res) => {
          res = res.data.data[0]
          let item = {}
          item.title = res.title
          item.preview = res.preview
          console.log('2'+JSON.stringify(res.content[0]))
          item.content = EditorState.createWithContent(convertFromRaw(res.content[0]))
          console.log(item)
          // console.log(res)
          setBlog(item);
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
              <div class='editor'>

              </div>
            </div>
          </div>
        ):'Sorry there was a problem!'}
      </div>
      </div>
)
}

export default BlogDisplay;
