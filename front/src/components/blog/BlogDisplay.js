import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'
import moment from "moment"
import AccessDisplay from '../nav/AccessDisplay'
import Social from '../../utilities/social'

const BlogDisplay = () => {

  const [blog, setBlog] = useState(window.location.pathname.slice(0,5)==='/blog'?window.location.pathname.slice(6,30):localStorage.getItem('blog'));
  const [editorState,setEditorState] = useState()
  useEffect(() => {
    axios.get('/content/all',{params:{filter:{_id:blog}}})
      .then((res) => {
        window.location.pathname.slice(0,5)
          res = res.data.data[0]
          let item = {}
            item.title = res.title
            item.preview = res.preview
            let adjusted = res.content[0]
              adjusted['entityMap']={}
            // item.content = adjusted
          // const contentState = convertFromRaw(res.content[0])
          console.log(adjusted)
          setEditorState(EditorState.createWithContent(convertFromRaw(adjusted)))
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
    <div class='row'>
        <div class='col w80'>
        {blog?(
          <div class='col'>
            <h1 style={{fontSize:'4em',color:'#BC9797'}}>{blog.title}</h1>
            <div class='row'>
              {blog.preview}
            </div>
            <div class='row'>
              {editorState?(<div>
                  <Editor editorState={editorState} readOnly={true}/>
              </div>):''}
            </div>
          </div>
        ):'Sorry there was a problem!'}
        </div>
        <Social data={'tiny-logo'}/>
        <div class='col w20 border'>
            <h3>FREE LEARNING RESOURCES</h3>
            Welcome to the CHATSHACK blog! You can find free advice and resources for learning English.
        </div>
      </div>
      <AccessDisplay/>
      </div>
)
}

export default BlogDisplay;
