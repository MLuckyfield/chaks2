import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Popup from '../utilities/popup'
// import Accordion from '../utilities/accordion'
import {Editor, EditorState, convertToRaw,convertFromRaw, RichUtils} from 'draft-js'


const CourseManagement = () => {

  const [courses, setCourses]=useState()

  //new course createConnection
  const name = useRef('');
  const image = useRef('');
  const [description,setDescription]=useState(()=> EditorState.createEmpty())
  const [addLesson,setAddLesson]=useState(()=> EditorState.createEmpty())
  const [lessons,setLessons]=useState([])
  const [lessonCount,setLessonCount]=useState(1)
  useEffect(()=>{
    axios.get('/program_course/all')
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('/program_course/new',
      {
        name: name.current.value,
        thumbnail: image.current.value,
        description: convertToRaw(description.getCurrentContent()),
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
        <h1>Course Management</h1>
        <div class='row' style={{justifyContent:'end'}}>
        <Popup button={"Create"} num={1} content={
          <form class='make_blog' onSubmit={onSubmit}>
                  <h2>New Course</h2>
                      <div class="form-group make_blog">
                        Course Name
                        <input ref={name} type="text" class="form-control" placeholder="Event Name" required/>
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
                        {lessons?lessons.map(function(lesson,i){
                          console.log('lesson',lesson)
                          return <div>
                              {lesson.id}
                              <EditorView content={lesson.content} readOnly={true}/>
                          </div>
                        }):''}
                      </div>
                      <button type="submit" class="solid-first">Submit</button>
                    </form>
        }/>
        </div>
        <div class='col'>
          {courses? (courses.map(function(course, i){
            console.log('course',course.description,course)
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

    return (
      <div class='accordion_item clickable' style={{margin:'2%'}} onClick={() => setIsActive(!isActive)}>
              <div class='fixed-row'>
                <img class='photo' src={course.thumbnail}></img>
                <div class='col' style={{width:'50vw',borderLeft:'solid 3px black',paddingTop:'5%'}}>
                  <h3>{course.name}</h3>
                </div>
              </div>
        {isActive &&
          <div class='accordion-content'>
            <div class='col slim'>
              <EditorView content={course.description[0]} readOnly={true}/>
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
