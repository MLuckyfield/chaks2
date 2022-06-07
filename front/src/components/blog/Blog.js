import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";
import {Editor, EditorState, convertToRaw, RichUtils} from 'draft-js'

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
        content: convertToRaw(editorState.content.getCurrentContent()),
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

  const handleKeyCommand = (command, editorState)=>{
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  return(
    <div>
    <div class='nav-filler'>
    </div>
      <div class='row'>
        <form class='make_blog' onSubmit={onSubmit}>
                <h2>New Blog</h2>
                    <div class="form-group make_blog">
                      <input ref={title} type="text" class="form-control" placeholder="Title" required/>
                    </div>
                    <div class="form-group make_blog">
                      <textarea ref={preview} type="text" class="form-control" placeholder="Description" required/>
                    </div>

                    <div class="form-group make_blog">
                      <div class='editor'>
                      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand}/>
                      </div>
                    </div>
                    <div class="form-group make_blog">
                      <input type="text" class="form-control" placeholder={`${author.first}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Blog</button>

                  </form>
                </div>
            </div>
)
}

export default Blog;
