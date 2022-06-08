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
          res = EditorState.createWithContent(convertFromRaw(res.data.data))
          console.log(res.data.data)
          // console.log(convertFromRaw(res.data.data))
          // console.log(res)
          setBlog(res);
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
                <Editor editorState={blog} readOnly={true}/>
              </div>
            </div>
          </div>
        ):'Sorry there was a problem!'}
      </div>
      </div>
)
}

export default BlogDisplay;
