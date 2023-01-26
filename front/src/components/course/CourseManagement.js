import React, { useRef, useState, useEffect } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"
import Popup from '../utilities/popup'
// import Accordion from '../utilities/accordion'
import {Editor, EditorState, convertFromRaw, RichUtils} from 'draft-js'


const CourseManagement = () => {

  const [courses, setCourses]=useState()
  useEffect(()=>{
    axios.get('/course/all')
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  return(
      <div class='col'>
        <div class='col'>
          {courses.length>1 ? (courses.map(function(course, i){
              if(i>0){
                return(
                  <AccordionItem course={course}/>
                )
              }
            })): 'Coming soon!'}
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
            <EditorView content={course.description} readOnly={true}/>
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
export default CourseManagement;
