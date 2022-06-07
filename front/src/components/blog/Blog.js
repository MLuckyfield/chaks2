import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import {Editor, EditorState} from 'draft-js'

const Blog = () => {

  //const [Blog, setBlog] = useState();
  //const [password, setPassword] = useState();
  const title = useRef('');
  const preview = useRef('');
  const [author, setAuthor] = useState(JSON.parse(localStorage.getItem('user')));
  const [editorState,setEditorState]=useState(()=> EditorState.createEmpty())
  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/content/new',
      {
        title: title.current.value,
        preview: preview.current.value,
        content: editorState,
        author: author,
        date: new Date(),
      })
      .then((res) => {
          setFeedback(res.data.message);
          window.location='/manage-blog';
          })
      .catch((err) => {
        console.log(err.response.data.message);
        // setFeedback(err.response.data.message);
        });
  }

  return(
      <div class='row'>
        <form class='login make_blog' onSubmit={onSubmit}>
                <h2>New Blog</h2>
                    <div class="form-group">
                      <input ref={title} type="text" class="form-control" placeholder="Title" required/>
                    </div>
                    <div class="form-group">
                      <textarea ref={preview} type="text" class="form-control" placeholder="Description" required/>
                    </div>

                    <div class="form-group">
                      <div class='editor'>
                      <Editor editorState={editorState} onChange={setEditorState} />
                      </div>
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder={`${author.first}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Blog</button>

                  </form>
                </div>
)
}

export default Blog;
