import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {metaTags} from '../seo'
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'
import AccessDisplay from '../nav/AccessDisplay'
import moment from "moment"
import party from '../../event_party.jpg'
import dj_night from '../../dj_night.jpg'
import event_game from '../../event_game.jpg'

const EventList = () => {

  const [events, setEvents] = useState();
  const [date, setDate] = useState(new Date());
  const [keypoints,setKeypoints] = useState()

  useEffect(() => {
    metaTags('EVENTS','英語学習に使える無料の情報はこちらから！英語のスラングや、効率的な英語の勉強方法など様々な情報を発信しています！')
    axios.get('/event_info/all')
      .then((res) => {
          console.log(res)
          let formatted = res.data.data.reverse()
          console.log('data',new Date())
          // setDate(g);
          console.log('date ready')
          setEvents(res.data.data);
          console.log('events ready')

        })
      .catch(error => console.log("error"+error))
  },[])

  // const getImage=(url)=>{
  //   switch(url){
  //     case 'party':
  //       return party;
  //     case 'dj_night':
  //       return dj_night
  //     case 'event_game':
  //       return event_game;
  //     default:
  //
  //   }
  // }

  // const getDate=(repeats)=>{
  //   let count = 0;
  //   let date = new Date(new Date().getYear(),new Date().getMonth(),1)
  //    while (count < repeats.week){
  //        if (date.getDay() === repeats.dow){
  //            break;
  //        }
  //        date = new Date(date.getYear() + 1900, date.getMonth(), (date.getDate() + 1));
  //    }
     // console.log(date)
     // return date
    // const d = new Date(new Date().getYear(), new Date().getMonth() - 1, 7 * (repeats.week - 1) + 1);
    // const w = d.getDay();
    // d.setDate(d.getDate() + (7 + repeats.dow - w) % 7);
    // console.log('date',d)
    // return d;
  // }
//<Carousel items={items}/>

  return(
      <div>
      {events?
        <span>
        <div id='header' class='transparent' >
          <div class='overlay'>
              <div class='row'>
                <div class='col'>
                  <h1 class='logo-basic'>{events[0].name}</h1>
                  <h3>{date?moment(date).format('dddd, MMM DD'):''}</h3>
                </div>
              </div>
          </div>
        </div>
      <div class='col'>
            <div class='col slim'>
                <h1 class='col'>CONCEPT</h1>
                <EditorView content={events[0].description[0]} readOnly={true}/>
            </div>
            <div class='col_up slim'>
                <h1 class='col' style={{border:'1px solid black'}}>DETAILS</h1>
                {moment(date).format('dddd, MMM DD')}, {moment(date).startOf('day').add(19,'hours').format('h:mm a')} {moment(date).startOf('day').add(23,'hours').format('h:mm a')}<br/>
                入場料：¥{events[0].entranceFee?events[0].entranceFee:'0 (free!)'}<br/>
                {events[0].notes? events[0].notes.map((note,i)=>{
                  return <span>note</span>
                }):''}<br/>
            </div>
            <div class='col_up slim'>
                <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                {events.length>1 ? (events.map(function(event, i){
                    if(i>0){
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
                    }  else{return <div>Coming soon!</div>}
                  })): 'Loading Events...'}
            </div>
        </div>
        </span>:''}
        <AccessDisplay/>
      </div>
)
}
const EditorView = (props)=>{
  const [editorState,setEditorState] = useState(()=>{
    props.content['entityMap']={}
    return EditorState.createWithContent(convertFromRaw(props.content))
  })

  useEffect(()=>{
    console.log('content',props.content)
    // setEditorState()
      // props.content['entityMap']={}
  },[])

  return(
    <Editor editorState={editorState} readOnly={true}/>
  )
}
export default EventList;
