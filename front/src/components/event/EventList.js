import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {metaTags} from '../seo'
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'
import AccessDisplay from '../nav/AccessDisplay'
import moment from "moment"

const EventList = () => {

  const [comments, setComments] = useState();
  const [date, setDate] = useState();
  const [description,setDescription] = useState()
  const [keypoints,setKeypoints] = useState()

  useEffect(() => {
    metaTags('EVENTS','英語学習に使える無料の情報はこちらから！英語のスラングや、効率的な英語の勉強方法など様々な情報を発信しています！')
    axios.get('/event_info/all')
      .then((res) => {
          console.log(res)
          let formatted = res.data.data.reverse()
          console.log(formatted)
          console.log(typeof formatted)
          setDate(getDate(formatted[0].repeats));
          console.log('date ready')
          setComments(res.data.data);
          console.log('events ready')
          let readyDescription = formatted[0].description[0]
            readyDescription['entityMap']={}
          setDescription(EditorState.createWithContent(convertFromRaw(readyDescription)))
          console.log('description ready')
          let readyKeys = formatted[0].keypoints[0]
            readyKeys['entityMap']={}
          setKeypoints(EditorState.createWithContent(convertFromRaw(readyKeys)))

        })
      .catch(error => console.log("error"+error))
  },[])

  const getDate=(repeats)=>{
    const d = new Date(new Date().getYear(), new Date().getMonth() - 1, 7 * (repeats.week - 1) + 1);
    const w = d.getDay();
    d.setDate(d.getDate() + (7 + repeats.dow - w) % 7);
    return d;
  }
//<Carousel items={items}/>
  return(
      <div>
      {comments?
        <span>
        <div id='header' class='transparent' style={{backgroundImage: 'url('+comments[0].image+')'}}>
          <div class='overlay'>
              <div class='row'>
                <div class='col'>
                  <h1 class='logo-basic'>{comments[0].name}</h1>
                  <h3>{date?moment(date).format('dddd, MMM DD'):''}</h3>
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
                {moment(date).format('dddd, MMM DD')}, {moment(date).startOf('day').add(19,'hours').format('h:mm a')} {moment(date).startOf('day').add(23,'hours').format('h:mm a')}<br/>
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
                                {moment(date).format('dddd, MMM DD')}
                              </div>
                            </div>
                        </div>
                      )
                    }  else{return <div></div>}
                  })): 'Loading Events...'}
            </div>
        </div>
        </span>:''}
        <AccessDisplay/>
      </div>
)
}

export default EventList;
