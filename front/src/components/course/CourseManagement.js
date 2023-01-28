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
    const online_start_hour = useRef('')
    const online_start_minute = useRef('')
    const online_end_hour = useRef('')
    const online_end_minute = useRef('')
    const online_repeats = useRef('')
    //--
    const offline_day= useRef('')
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
    console.loge(value,'is',checked)
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
        online_schedule:{
          repeats:online_repeats.current.value,
          timeslots:[{
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
        <h1>Course List</h1>
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
                      <h3>Schedule & Delivery</h3>
                      {console.log('channels',channels)}
                      {channels.forEach((channel, i) => {
                        return <div class='fixed-row'>
                                  <input type='checkbox' value={channel} onChange={deliverySetting}/>
                                  <label>{channel}</label>
                                </div>
                      })
                      }
                      <div class='col border'>
                        Online
                        <div class="form-group make_blog">
                          <input ref={online_day} type="number" class="form-control" min='0' max='24' placeholder='Day' required/>
                          <input ref={online_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={online_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={online_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={online_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={online_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>
                        Offline
                        <div class="form-group make_blog">
                          <input ref={online_day} type="number" class="form-control" min='0' max='24' placeholder='Day' required/>
                          <input ref={offline_start_hour} type="number" class="form-control" min='0' max='24' placeholder='Start Hour' required/>
                          <input ref={offline_start_minute} type="number" class="form-control" min='0' max='60' placeholder='Start Minute' required/>
                          <input ref={offline_end_hour} type="number" class="form-control" min='0' max='24' placeholder='End Hour' required/>
                          <input ref={offline_end_minute} type="number" class="form-control" min='0' max='60' placeholder='End Minute' required/>
                          <input ref={offline_repeats} type="number" class="form-control" min='0' max='60' placeholder='Repeats X months' required/>
                        </div>
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
    console.log(user.first,user.last,'is enrolling in',course.name)
  }
    return (
      <div class='accordion_item clickable' style={{margin:'2%'}} onClick={() => setIsActive(!isActive)}>
              <div class='fixed-row'>
                <img class='photo' src={course.thumbnail}></img>
                <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
                  <h2>{course.name}</h2>
                  {course.delivery?course.delivery.map((channel,i)=>{
                      return <span>{channel}</span>
                  }):''}
                  {console.log('display button?',use.role,user.role=='user')}
                  {user.role=='user'?
                    <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();enroll()}}>Enroll</div>:''}
                </div>
              </div>
        {isActive &&
          <div class='accordion-content'>
            <div class='col slim'>
              <EditorView content={course.description[0]} readOnly={true}/>
            </div>
            <div class='row'>
              <div class='col'>
                {course.lessons?course.lessons.map((lesson,i)=>{
                  console.log('loading lesson',i,lesson)
                  return (<div class='col slim'>
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
