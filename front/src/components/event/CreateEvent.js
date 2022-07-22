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
  const entrance_fee = useRef('');
  const image = useRef('');
  const duration = useRef('');
  const temp = useRef('');
  const [description,setDescription]=useState(()=> EditorState.createEmpty())
  const [keypoints,setKeypoints]=useState(()=> EditorState.createEmpty())
  const [notes, setNotes] = useState([]);
  const [feedback, setFeedback] = useState();
  const [day, setDay] = useState(new Date())

  useEffect(()=>{
    console.log(notes)
  })
  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('/event_info/new',
      {
        name: name.current.value,
        start: moment(day),
        end: moment(day).add(duration,'minutes'),
        entrance_fee: entrance_fee.current.value,
        image: image.current.value,
        notes: notes,
        description: convertToRaw(description.getCurrentContent()),
        keyPoints: convertToRaw(keypoints.getCurrentContent()),
      })
      .then((res) => {
          setFeedback(res.data.message);
          window.location='/manage-events';
          })
      .catch((err) => {
        console.log(err.response.data.message);
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
      let array = notes.push(temp.current.value)
      setNotes(array)
  }
  const removeNote = (i)=>{
      notes.splice(i,1)
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
                      <Calendar onChange={setDay} value={day} minDate={new Date()}/>
                      <input ref={duration} type="number" class="form-control" placeholder="Duration (min)" required/>
                      <span>{moment(day).add(duration,'minutes').format('dddd, MMM DD @ h:mm a')}</span>
                    </div>
                    <div class="form-group make_blog">
                      <div class='editor'>
                      <Editor editorState={description} onChange={setDescription} handleKeyCommand={markDescription}/>
                      </div>
                    </div>
                    <div class="form-group make_blog">
                      <div class='editor'>
                      <Editor editorState={keypoints} onChange={setKeypoints} handleKeyCommand={markKeypoints}/>
                      </div>
                    </div>
                    <div class="form-group make_blog">
                      {notes?notes.forEach((note,i)=>{
                        return (<div class='fixed-row'>
                                    <span>{note}</span>
                                    <button onClick={()=>removeNote(i)} class="solid-first">Remove Note</button>
                                </div>)
                      }):'No notes. Add some!'}
                       <input ref={temp} type="text" placeholder='Add Note' class="form-control" required/>
                       <button onClick={addNote} class="solid-first">Add Note</button>
                    </div>
                    <label>{feedback}</label>
                    <button type="submit" class="solid-first">Submit</button>
                  </form>
                </div>
            </div>
)
}

export default Event;
