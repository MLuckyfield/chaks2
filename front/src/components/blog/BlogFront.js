import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import banner from '../../banner.jpg'
import Carousel from '../utilities/carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BlogFront = () => {

  const [comments, setComments] = useState(null);
  const [items, setItems] = useState([{
    picture: banner,
    text:'Welcome to the CHATSHACK learning center',
    link:'/'
  }]);

  useEffect(() => {
    axios.get('/content/all')
      .then((res) => {
          setComments(res.data.data.reverse());
        })
      .catch(error => console.log("error"+error))
  },[])

  const loadBlog=(blog)=>{
      localStorage.setItem('blog',blog._id)
      const url = '/blog/'+blog._id+'/'+blog.title
      window.location=url
  }

  return(
    <div>
      <div class='nav-filler'>
      </div>
      <div class='carousel-wrapper'>
          <Carousel items={items}/>
      </div>
      <div class='master-row'>
        <h1>BLOG</h1>
        <div class='col'>
            {comments ? (comments.map(function(item, i){
                return (
                    <div class='header transparent blog_thumbnail' onClick={()=>{loadBlog(item)}} style={{backgroundImage: 'url('+banner+')'}}>
                        <div class='overlay'>
                            <div class='row'>
                              <div class='col'>
                                <h1 class='logo-basic'>{item.title}</h1>
                              </div>
                            </div>
                        </div>
                  </div>
                )
              })): 'Loading...'}
        </div>
        </div>
      </div>
)
}

export default BlogFront;
