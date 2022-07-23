import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {metaTags} from '../seo'
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'
import AccessDisplay from '../nav/AccessDisplay'
import moment from "moment"

const EventList = () => {

  const [comments, setComments] = useState(null);
  const [description,setDescription] = useState()
  const [keypoints,setKeypoints] = useState()

  useEffect(() => {
    metaTags('EVENTS','英語学習に使える無料の情報はこちらから！英語のスラングや、効率的な英語の勉強方法など様々な情報を発信しています！')
    axios.get('/event_info/all')
      .then((res) => {
        let formatted = res.data.data.reverse()
          setComments(formatted);
          setDescription(EditorState.createWithContent(convertFromRaw(formatted[0].description)))
          setKeypoints(EditorState.createWithContent(convertFromRaw(formatted[0].keypoints)))

        })
      .catch(error => console.log("error"+error))
  },[])
//<Carousel items={items}/>
  return(
      <div>
        {comments?(
          <div id='header' class='transparent' style={{backgroundImage: 'url('+comments[0].image+')'}}>
                <div class='overlay'>
                    <div class='row'>
                      <div class='col'>
                        <h1 class='logo-basic'>{comments[0].name}</h1>
                        <h3>{moment(comments[0].start).format('dddd, MMM DD')}</h3>
                      </div>
                    </div>
                </div>
          </div>
              <div class='col'>
                    <div class='col slim'>
                        <h1 class='col'>CONCEPT</h1>
                        <Editor editorState={description} readOnly={true}/>
                        <Editor editorState={keypoints} readOnly={true}/>
                    </div>
                    <div class='col_up slim'>
                        <h1 class='col' style={{border:'1px solid black'}}>DETAILS</h1>
                        {moment(comments[0].start).format('dddd, MMM DD')}, {moment(comments[0].start).format('h:mm a')} {moment(comments[0].end).format('h:mm a')}<br/>
                        入場料：¥{comments[0].entranceFee?comments[0].entranceFee:'0 (free!)'}<br/>
                        {comments[0].notes.map((note,i)=>{
                          return <span>note</span>
                        })}<br/>
                    </div>
                    <div class='col_up slim'>
                        <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                        {comments ? (comments.map(function(event, i){
                            if(i!=0){
                              return(
                                <div class='col'>
                                    <div class='fixed-row'>
                                      <img class='photo' src={event.image}></img>
                                      <div class='col' style={{borderLeft:'solid 3px black',paddingTop:'5%'}}>
                                        <h3>{event.name}!</h3>
                                        {moment(event.start).format('dddd, MMM DD')}
                                      </div>
                                    </div>
                                </div>
                              )
                            }  else{return <div></div>}
                          })): 'Loading Events...'}
                    </div>
              </div>
        ):'Loading Events...'}
        <AccessDisplay/>
      </div>
)
}

export default EventList;
