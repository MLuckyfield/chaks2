import React, { useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {useAuthDataContext} from "../auth-provider";

const Blog = () => {

  //const [Blog, setBlog] = useState();
  //const [password, setPassword] = useState();
  const title = useRef('');
  const preview = useRef('');
  const content = useRef('');
  const [author, setAuthor] = useState(JSON.parse(localStorage.getItem('user')));

  const [feedback, setFeedback] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/content/new',
      {
        title: title.current.value,
        preview: preview.current.value,
        content: content.current.value,
        author: author,
        date: new Date(),
      })
      .then((res) => {
          setFeedback(res.data.message);
          window.location='/blog';
          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }

  return(
      <div class='row'>
        <form class='login' onSubmit={onSubmit}>
                <h2>New Blog</h2>
                    <div class="form-group">
                      <textarea ref={title} type="text" class="form-control" placeholder="content" required/>
                    </div>
                    <div class="form-group">
                      <textarea ref={preview} type="text" class="form-control" placeholder="content" required/>
                    </div>
                    <div class="form-group">
                      <textarea ref={content} type="text" class="form-control" placeholder="content" required/>
                    </div>
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder={`${author.first} ${author.last}`} disabled/>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Blog</button>

                  </form>
                </div>
)
}

export default Blog;
