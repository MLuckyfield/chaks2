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
  const [isAttending, setIsAttending] = useState(false);
  const [keypoints,setKeypoints] = useState()
  const [user, setUser] = useState()

  useEffect(() => {
    metaTags('EVENTS','英語学習に使える無料の情報はこちらから！英語のスラングや、効率的な英語の勉強方法など様々な情報を発信しています！')
    axios.get('/event_info/all')
      .then((res) => {
          // console.log(res)
          let formatted = res.data.data
          formatted.forEach((event, i) => {
            let readyDate = getDate(event.repeats)
            event['date'] = readyDate
          });
          formatted.sort((a,b)=>Number(a.date)-Number(b.date))
          setDate(getDate(formatted[0].repeats));
          // console.log('date ready')
          setEvents(formatted);
          setIsAttending(attendance(formatted[0].attendees),'')
          // console.log('events ready')

        })
      .catch(error => console.log("error"+error))
  },[])
  const onSubmit=(e,id,rsvp)=>{
    // console.log('rsvp for',id,user)
    e.preventDefault();
    axios.post('/event_info/rsvp',{params:{filter:id,rsvp:user}})
      .then((res) => {
          setIsAttending(attendance(res.data.data.attendees),user)
          window.location.reload(true)
        })
      .catch(error => console.log("error"+error))
  }
  const getDate=(repeats)=>{
    let count = 0;
    let year = new Date().getYear()+1900
    let month = new Date().getMonth()
    let date = new Date(year,month,1)
    // console.log('starting with',year,month,date)
    // console.log('approach',repeats.day,repeats.week)
    let list = []
     const findDays=(x,y)=>{
       // console.log(new Date(x, y, 0).getDate())
       count=0
       list = []
       while (count < new Date(x, y, 0).getDate()){
         // console.log(date.getDay(),repeats.day,date.getDay()===repeats.day)
           if (date.getDay() === repeats.day){
             list.push(date)
           }
           date = new Date(x, y, (date.getDate() + 1));
           count++;
       }
     }
     findDays(year,month)
     // console.log(list, repeats.week-1)
     let adjusted = list[repeats.week-1];
     if (adjusted.getDate()<new Date().getDate()){//if event is in the past
       // console.log('rerun for',month, month+1)
       findDays(year,month+1)
     }
     // console.log('conclusion',list[repeats.week-1])
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
                  <h3>{moment(events[0].date).format('MM月D日')}</h3>
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
                {moment(date).format('MM月D日')}, {moment(date).startOf('day').add(19.5,'hours').format('h:mm a')} ~ {moment(date).startOf('day').add(23,'hours').format('h:mm a')}<br/>
                入場料：¥{events[0].entranceFee?events[0].entranceFee:'0 (free!)'}<br/>
                {events[0].drinkRequired?'*ワンドリンクオーダー制':''}
                {user?(
                  isAttending?<div class="border" style={{width:'100%',padding:'8px 30px'}}>Registered!</div>:<div class="relative-btn" onClick={(e)=>{onSubmit(e,events[0]._id)}}>RSVP</div>
                ):''}
            </div>

            <div class='col_up slim'>
                <h1 class='col' style={{border:'1px solid black'}}>UPCOMING EVENTS...</h1>
                <div class='accordion'>
                {events.length>1 ? (events.map(function(event, i){
                    if(i>0){
                      return(
                        <AccordionItem title={event.name} date={moment(event.date).format('MM月D日')} description={event.description[0]} image={event.image} id={event._id} attendees={[event.attendees]}/>
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
  // console.log(url)
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
const attendance=(list,user)=>{
  console.log(typeof list,list)
  let temp = localStorage.getItem('user')
  user = temp?JSON.parse(temp):temp;
  if(user){
    if(Array.isArray(list)){
      console.log('executing')
      if(list.length>1){
        list.forEach((person, i) => {
          if(person==user._id){return true}
        });
      }else{
          if(list==user._id){return true}
      }
    }
    if(list==user._id){return true}
  }    
    return false
}
const AccordionItem=(props)=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [isActive, setIsActive] = useState(false);
    const [isAttending, setIsAttending] = useState(false);

    useEffect(()=>{
      setIsAttending(attendance(props.attendees,user))
      // console.log('Attending?', user.role,props.attendees)
    },[])
    const onSubmit=(e,id,rsvp)=>{
      // console.log('rsvp for',id,user)
      e.preventDefault();
      axios.post('/event_info/rsvp',{params:{filter:id,rsvp:user}})
        .then((res) => {
            setIsAttending(attendance(res.data.data.attendees,user))
            window.location.reload(true)

          })
        .catch(error => console.log("error"+error))
    }

    return (
      <div class='accordion_item clickable' style={{margin:'2%'}} onClick={() => setIsActive(!isActive)}>
              <div class='fixed-row'>
                <img class='photo' src={getImage(props.image)}></img>
                <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
                  <h3>{props.title}</h3>
                  {props.date}
                </div>
              </div>
        {isActive &&
          <div class='accordion-content'>
            <div class='col slim'>
            <EditorView content={props.description} readOnly={true}/>
            {user?(
              isAttending?<div class="border" style={{width:'100%',padding:'8px 30px'}}>Registered!</div>:<div class="relative-btn" onClick={(e)=>{onSubmit(e,props.id)}}>RSVP</div>
            ):''}
            </div>
          </div>}
      </div>
    )
}
const EditorView = (props)=>{
  const [editorState,setEditorState] = useState(()=>{
    props.content['entityMap']={}
    return EditorState.createWithContent(convertFromRaw(props.content))
  })

  useEffect(()=>{
    // console.log('content',props.content)
    // setEditorState()
      // props.content['entityMap']={}
  },[])

  return(
    <Editor editorState={editorState} readOnly={true}/>
  )
}
export default EventList;
