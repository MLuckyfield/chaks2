import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import banner from '../../banner.jpg'
import Carousel from '../utilities/carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {metaTags} from '../auth-provider'

const BlogFront = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    metaTags('ブログ','英語学習に使える無料の情報はこちらから！英語のスラングや、効率的な英語の勉強方法など様々な情報を発信しています！')
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
//<Carousel items={items}/>
  return(
    <div>
      <div class='master-row'>
        <h1>BLOG</h1>
        <div class='col'>
            <div id='header' class='transparent blog_thumbnail clickable' onClick={comments?()=>{loadBlog(comments[0])}:''} style={{backgroundImage: 'url('+banner+')', verticalAlign:'middle',display:'flex'}}>
                <div class='overlay'>
                    <div class='row'>
                      <div class='col'>
                        <h1 class='logo-basic'>{comments?comments[0].title:''}</h1>
                      </div>
                    </div>
            </div>
            </div>
            <div class='row'>
            {comments ? (comments.map(function(item, i){
                if(i!=0){
                  if(i%3==0){return (
                    <div class='col  clickable' onClick={()=>{loadBlog(item)}} style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                      <h1>{item.title}</h1>
                      <h3>{item.preview.slice(0,20)}</h3>
                    </div>
                  )}
                  else{
                    return (
                        <div class='row'>
                          <div class='col  clickable' onClick={()=>{loadBlog(item)}} style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                            <h1>{item.title}</h1>
                            <h3>{item.preview.slice(0,20)}</h3>
                          </div>
                        </div>
                    )
                  }
                }  else{return <div></div>}
              })): 'Loading...'}
              </div>
        </div>
        </div>
      </div>
)
}

export default BlogFront;
