import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Popup from '../utilities/popup'
// import Accordion from '../utilities/accordion'
import {Editor, EditorState, convertToRaw,convertFromRaw, RichUtils} from 'draft-js'


const CourseManagement = () => {

  const [courses, setCourses]=useState()
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))

  //new course
  const name = useRef('');
  const image = useRef('');
  const [description,setDescription]=useState(()=> EditorState.createEmpty())
  const [addLesson,setAddLesson]=useState(()=> EditorState.createEmpty())
  const [lessons,setLessons]=useState([])
  const [lessonCount,setLessonCount]=useState(1)
  const [delivery,setDelivery]=useState([])
    //--
    const online_day = useRef('')
    const online_month = useRef('')
    const online_start_hour = useRef('')
    const online_start_minute = useRef('')
    const online_end_hour = useRef('')
    const online_end_minute = useRef('')
    const online_repeats = useRef('')
    //--
    const offline_day= useRef('')
    const offline_month = useRef('')
    const offline_start_hour = useRef('')
    const offline_start_minute = useRef('')
    const offline_end_hour = useRef('')
    const offline_end_minute = useRef('')
    const offline_repeats = useRef('')

  const channels = ['online private','online group','in-person group']
  useEffect(()=>{
    axios.get('/program_course/all')
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  const deliverySetting=(e)=>{
    const {value, checked}=e.target
    console.log(value,'is',checked)
    if(checked){setDelivery([...delivery,value])}
    else{setDelivery(delivery.filter((e)=>e!==value))}
    console.log('delivery is',delivery)
  }
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/program_course/new',
      {
        name: name.current.value,
        thumbnail: image.current.value,
        description: convertToRaw(description.getCurrentContent()),
        lessons:lessons,
        delivery:delivery,
        online_schedule:{
          repeats:online_repeats.current.value,
          timeslots:[{
            month:online_month.current.value,
            day:online_day.current.value,
            start_hour:online_start_hour.current.value,
            start_minute:online_start_minute.current.value,
            end_hour:online_end_hour.current.value,
            end_minute:online_end_minute.current.value,
          }],
        },
        offline_schedule:{
          repeats:offline_repeats.current.value,
          timeslots:[{
            month:offline_month.current.value,
            day:offline_day.current.value,
            start_hour:offline_start_hour.current.value,
            start_minute:offline_start_minute.current.value,
            end_hour:offline_end_hour.current.value,
            end_minute:offline_end_minute.current.value,
          }],
        }
      })
      .then((res) => {
        window.location.reload();

          })
      .catch((err) => {
        console.log(err);
        // setFeedback(err.response.data.message);
        });
  }
  const markDescription = (command, editorState)=>{
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setDescription(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const markLesson = (command, editorState)=>{
    console.log('state',addLesson)
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setAddLesson(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const prepLesson=()=>{
    console.log('db',convertToRaw(addLesson.getCurrentContent()))
    setLessons(current=>[{
      id:lessonCount,
      content:convertToRaw(addLesson.getCurrentContent())
    },...current])
    setLessonCount(lessonCount+1)
    console.log('after',lessons)

  }
  return(
      <div class='col'>
        <h1>COURSE LIST</h1>
        <div class='row' style={{justifyContent:'end'}}>
        {user.role!='user'?
        <Popup button={"Create"} num={1} content={
          <form class='make_blog' onSubmit={onSubmit}>
                  <h2>New Course</h2>
                      <div class='col border'>
                      <h3>Profile & Content</h3>
                      <div class="form-group make_blog">
                        Course Name
                        <input ref={name} type="text" class="form-control" required/>
                      </div>
                      <div class="form-group make_blog">
                        Thumbnail
                        <input ref={image} type="text" class="form-control"/>
                      </div>
                      <div class="form-group make_blog">
                        Description
                        <div class='editor'>
                        <Editor editorState={description} onChange={setDescription} handleKeyCommand={markDescription}/>
                        </div>
                      </div>
                      <hr/>
                      <div class="form-group make_blog">
                        Add Lesson
                        <div class='editor'>
                        <Editor editorState={addLesson} onChange={setAddLesson} handleKeyCommand={markLesson}/>
                        </div>
                        <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();prepLesson()}}>+</div>
                        {lessons?lessons.map((lesson,i)=>{
                          console.log('lesson',lessons.length,lesson.content)
                          return (
                            <div>
                              {lesson.id}
                              <EditorView content={lesson.content} readOnly={true}/>
                            </div>
                          )
                        }):''}
                      </div>
                      </div>
                      <div class='col border'>

                      <h3>Schedule & Delivery</h3>
                      <div class="form-group make_blog">
                          {channels.map((channel, i) => {
                            return <div class='fixed-row'>
                                      <input type='checkbox' value={channel} onChange={deliverySetting}/>
                                      <div>{channel}</div>
                                    </div>
                          })}
                      </div>
                        {delivery.includes('online group')?
                        <div class="form-group make_blog">
                        Online Group
                          <input ref={online_month} type="number" class="form-control" min='0' max='24' placeholder='Starting Month' required/>
                          <select class='form-control' ref={online_day}>
                            <option class='col slim feedback clickable' value={0}>Sunday</option>
                            <option class='col slim feedback clickable' value={1}>Monday</option>
                            <option class='col slim feedback clickable' value={2}>Tuesday</option>
                            <option class='col slim feedback clickable' value={3}>Wednesday</option>
                            <option class='col slim feedback clickable' value={4}>Thursday</option>
                            <option class='col slim feedback clickable' value={5}>Friday</option>
                            <option class='col slim feedback clickable' value={6}>Saturday</option>
                          </select>
                          <input ref={online_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={online_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={online_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={online_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={online_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>:''}
                        {delivery.includes('in-person group')?
                        <div class="form-group make_blog">
                          Offline Group
                          <input ref={offline_month} type="number" class="form-control" min='0' max='24' placeholder='Starting Month' required/>
                          <select class='form-control' ref={offline_day}>
                            <option class='col slim feedback clickable' value={0}>Sunday</option>
                            <option class='col slim feedback clickable' value={1}>Monday</option>
                            <option class='col slim feedback clickable' value={2}>Tuesday</option>
                            <option class='col slim feedback clickable' value={3}>Wednesday</option>
                            <option class='col slim feedback clickable' value={4}>Thursday</option>
                            <option class='col slim feedback clickable' value={5}>Friday</option>
                            <option class='col slim feedback clickable' value={6}>Saturday</option>
                          </select>
                          <input ref={offline_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={offline_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={offline_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={offline_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={offline_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>:''}

                      </div>
                      <button type="submit" class="solid-first">Submit</button>
                    </form>
        }/>:''}
        </div>
        <div class='col'>
          {courses? (courses.map(function(course, i){
                return(
                  <AccordionItem course={course}/>
                )
            })): 'No Courses!'}
        </div>
      </div>
)
}

const AccordionItem=(props)=>{
  const [isActive, setIsActive] = useState(false);
  const [course,setCourse]=useState(props.course)
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  const [enrolled,setEnrolled]=useState()

  useEffect(()=>{
    if(user.role!='user'){
      axios.get('/enrolled/all',{params:{filter:{course:course._id}}})
        .then((res) => {
            setEnrolled(res.data.data)
            })
        .catch((err) => {
          console.log(err);
          });
    }
  },[])
  const enroll=()=>{
    console.log(user.first,'is enrolling in',course.name)
  }
  const calculateSchedule=(schedule)=>{
    let current_month = new Date().getMonth()+1
    let starting_month = schedule.timeslots[0].month
    let repeats = schedule.repeats
    let next_start = moment(new Date(moment().year(),starting_month,1))
    console.log('calc variables',current_month,starting_month,repeats)
    console.log('starting date',next_start)
    while(starting_month<=current_month){
      next_start.add(repeats,'months')
      starting_month+=repeats
      console.log('schedule calc',next_start,starting_month)
    }
    return <div class='row'>
              <div>Next Start: {next_start.format('M/D')}</div>
              <div>Graduation: {next_start.add(repeats,'months').format('M/D')}</div>
            </div>
  }
    return (
      <div class='accordion_item' style={{margin:'2%'}}>
              <div class='fixed-row'>
                <img class='photo' src={course.thumbnail}></img>
                <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
                  <h2>{course.name}</h2>
                  <div class='row'>
                    {course.delivery?course.delivery.map((channel,i)=>{
                        return <span class='tag' style={channel=='online private'?{backgroundColor:'tomato'}:channel=='online group'?{backgroundColor:'#89CFF0'}:{backgroundColor:'lime'}}>{channel}</span>
                    }):''}
                  </div>
                  <div class='fixed-row'>
                    <div class="btn" style={{position:'relative',width:'80%'}} onClick={() => setIsActive(!isActive)}>Details</div>
                  </div>

                </div>
              </div>
        {isActive &&
          <div class='accordion-content'>
            <div class='col slim border'>
              <h2>Description</h2>
              <EditorView content={course.description[0]} readOnly={true}/>
            </div>
            <div class='col border'>
              <h2>Schedule</h2>
              {course.delivery?course.delivery.map((channel,i)=>{
                return (
                  <div class='fixed-row'>
                    <h3>{channel}</h3>
                    <div class='col'>
                      {channel=='online private'?
                    'anytime! study at your own pace with full attention'
                      :channel=='online group'?
                      <div class='col'>
                        {calculateSchedule(course.online_schedule)}
                      </div>
                      :''
                    }</div>
                    {user.role=='user'?<div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();enroll()}}>Enroll</div>:''}
                  </div>
                )
              }):''}
            </div>
            <div class='row'>
              <div class='col border'>
                <h2>Lessons</h2>
                {course.lessons?course.lessons.map((lesson,i)=>{
                  console.log('loading lesson',i,lesson)
                  return (<div class='fixed-row'>
                    <span class="custom_icon">{lesson.id}</span>
                    <EditorView content={lesson.content[0]} readOnly={true}/>
                  </div>  )
                }):''}
              </div>
              {user.role!='user'?
              <div class='col'>
                {enrolled?enrolled.map((item,i)=>{
                  <table>
                    <tr>
                      <td>{item.student.first}</td>
                      <td>{item.student.last}</td>
                    </tr>
                  </table>
                })
                  :'No students enrolled!'}
              </div>
              :''}
            </div>
          </div>}
      </div>
    )
}
const EditorView = (props)=>{
  const [editorState,setEditorState] = useState()
  useEffect(()=>{
    props.content['entityMap']={}
    setEditorState(EditorState.createWithContent(convertFromRaw(props.content)))
    console.log('recieved',props.content)
  },[])

  return(
    <div class='row'>
      {editorState?(<div>
          <Editor editorState={editorState} readOnly={true}/>
      </div>):''}
    </div>
  )
}
export default CourseManagement;
