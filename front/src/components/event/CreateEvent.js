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
          day:day,
          week:week
        },
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
                      <span>Time:{moment(day).startOf('day').add(19,'hours').format('dddd, MMM DD @ h:mm a')} ~ {moment(day).startOf('day').add(19,'hours').add(duration.current.value,'minutes').format('h:mm a')}</span>
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
                      {notes?notes.map((note,i)=>{
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
