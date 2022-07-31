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
          console.log('event date',formatted[0],formatted[0].repeats)
          console.log('data',getDate(formatted[0].repeats))
          setDate(getDate(formatted[0].repeats));
          console.log('date ready')
          setEvents(res.data.data);
          console.log('events ready')

        })
      .catch(error => console.log("error"+error))
  },[])

  const getDate=(repeats)=>{
    let count = 0;
    let year = new Date().getYear()+1900
    let month = new Date().getMonth()
    let date = new Date(year,month,1)
    console.log('starting with',year,month,date)
    console.log('approach',repeats.day,repeats.week)
    let list = []
     const findDays=(x,y)=>{
       console.log(new Date(x, y, 0).getDate())
       count=0
       list = []
       while (count < new Date(x, y, 0).getDate()){
         // console.log(date.getDay(),repeats.day,date.getDay()===repeats.day)
           if (date.getDay() === repeats.day){
             list.push(date)
           }
           date = new Date((year), month, (date.getDate() + 1));
           count++;
       }
     }
     findDays(year,month)
     // console.log(list, repeats.week-1)
     let adjusted = list[repeats.week-1];
     if (adjusted.getDate()<new Date().getDate()){//if event is in the past
       // console.log('rerun')
       findDays(year,month+1)
     }
     console.log('conclusion',list[repeats.week-1])
     return list[repeats.week-1]
  }
//<Carousel items={items}/>

  return(
      <div>
      {events?
        <span>
        <div id='header' class='transparent' style={{backgroundImage:'url('+getImage(events[0].image)+')'} }>
          <div class='overlay'>
              <div class='row'>
                <div class='col'>
                  <h1>{events[0].name}</h1>
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
                {moment(date).format('dddd, MMM DD')}, {moment(date).startOf('day').add(19,'hours').format('h:mm a')} ~ {moment(date).startOf('day').add(23,'hours').format('h:mm a')}<br/>
                入場料：¥{events[0].entranceFee?events[0].entranceFee:'0 (free!)'}<br/>
                {events[0].drinkRequired?'*ワンドリンクオーダー制':''}
            </div>
            <div class='col_up slim'>
                <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                <div class='accordion'>
                {events.length>1 ? (events.map(function(event, i){
                    if(i>0){
                      return(
                        <AccordionItem title={event.name} date={moment(getDate(event.repeats)).format('dddd, MMM DD')} description={events[0].description} image={event.image}/>
                      )
                    }
                  })): 'Coming soon!'}
                </div>
            </div>
        </div>
        </span>:''}
        <AccessDisplay/>
      </div>
)
}
const getImage=(url)=>{
  console.log(url)
  switch(url){
    case 'party':
      return party;
    case 'dj_night':
      return dj_night
    case 'event_game':
      return event_game;
    default:
      console.log('No image found')
  }
}
const AccordionItem=({ title, date, description,image })=>{
const [isActive, setIsActive] = useState(false);
return (

  <div class='accordion_item' style={{margin:'2%'}} onClick={() => setIsActive(!isActive)}>
          <div class='fixed-row'>
            <img class='photo' src={getImage(image)}></img>
            <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
              <h3>{title}</h3>
              {date}
            </div>
          </div>
    {isActive && <div class='accordion-content'></div>}
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
