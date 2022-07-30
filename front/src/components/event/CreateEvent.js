import React, { useEffect,useRef, useState } from 'react';
import {axios} from "../../utilities/axios";
import {Editor, EditorState, convertToRaw, RichUtils} from 'draft-js'
import DateTimePicker from 'react-datetime-picker'
import 'react-calendar/dist/Calendar.css'
import moment from "moment"
import Calendar from 'react-calendar'

const Event = () => {

  //const [Event, setEvent] = useState();
  //const [password, setPassword] = useState();
  const name = useRef('');
  const entranceFee = useRef('');
  const drinkRequired = useRef('');
  const image = useRef('');
  const duration = useRef('');
  const week = useRef('');
  const day = useRef('');
  const temp = useRef('');
  const [description,setDescription]=useState(()=> EditorState.createEmpty())
  const [keypoints,setKeypoints]=useState(()=> EditorState.createEmpty())
  const [notes, setNotes] = useState([]);
  const [feedback, setFeedback] = useState();
  const [date, setDate] = useState();
  // const [day, setDay] = useState(new Date())

  useEffect(()=>{
    console.log(notes)
  },[notes])
  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('/event_info/new',
      {
        name: name.current.value,
        repeats: {
          day:day.current.value,
          week:week.current.value
        },
        entranceFee: entranceFee.current.value,
        drinkRequired:drinkRequired.current.value,
        image: image.current.value,
        description: convertToRaw(description.getCurrentContent()),
        keypoints: convertToRaw(keypoints.getCurrentContent()),
      })
      .then((res) => {
          console.log('success')
          // window.location='/manage-events';
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
  const markKeypoints = (command, editorState)=>{
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setKeypoints(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  const addNote = ()=>{
      let array = notes
      array.push(temp.current.value)
      console.log('adding',temp.current.value,array)
      setNotes(array)
  }
  const removeNote = (i)=>{
      let array = notes
      array.splice(i,1)
      setNotes(array)
  }
  return(
    <div>
    <div class='nav-filler'>
    </div>
      <div class='row'>
        <form class='make_blog' onSubmit={onSubmit}>
                <h2>New Event</h2>
                    <div class="form-group make_blog">
                      <input ref={name} type="text" class="form-control" placeholder="Event Name" required/>
                    </div>
                    <div class="form-group make_blog">
                      <select class='form-control' ref={day}>
                      <option class='col slim feedback clickable' value={0}>Sunday</option>
                      <option class='col slim feedback clickable' value={1}>Monday</option>
                      <option class='col slim feedback clickable' value={2}>Tuesday</option>
                      <option class='col slim feedback clickable' value={3}>Wednesday</option>
                      <option class='col slim feedback clickable' value={4}>Thursday</option>
                      <option class='col slim feedback clickable' value={5}>Friday</option>
                      <option class='col slim feedback clickable' value={6}>Saturday</option>
                      </select>
                      <input ref={week} type="number" class="form-control" min='1' max='4' required/>
                      <input ref={duration} type="number" class="form-control" value='240' required/>
                    </div>
                    <div class="form-group make_blog">
                      Background Photo
                      <input ref={image} type="text" class="form-control" required/>
                    </div>
                    <div class="form-group make_blog">
                      Description
                      <div class='editor'>
                      <Editor editorState={description} onChange={setDescription} handleKeyCommand={markDescription}/>
                      </div>
                    </div>
                    <div class="form-group make_blog">
                    Details
                      <div class='editor'>
                      <Editor editorState={keypoints} onChange={setKeypoints} handleKeyCommand={markKeypoints}/>
                      </div>
                    </div>
                    <div class="form-group make_blog">
                    Requirements
                        <input ref={entranceFee} type="number" placeholder="Entrance Fee in Yen" class="form-control" required/>
                        <select class='form-control' ref={drinkRequired}>
                            <option class='col slim feedback clickable' value={true}>Yes</option>
                            <option class='col slim feedback clickable' value={false}>No</option>
                        </select>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Submit</button>
                  </form>
                </div>
            </div>
)
}

export default Event;
