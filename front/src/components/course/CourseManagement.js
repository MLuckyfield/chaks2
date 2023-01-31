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
    const online_limit = useRef('')
    const online_day = useRef('')
    const online_month = useRef('')
    const online_start_hour = useRef('')
    const online_start_minute = useRef('')
    const online_end_hour = useRef('')
    const online_end_minute = useRef('')
    const online_repeats = useRef('')
    //--
    const offline_limit = useRef('')
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
            limit:online_limit.current.value,
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
            limit:offline_limit.current.value,
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
                          <input ref={online_limit} type="number" class="form-control" min='0' max='10' placeholder='Max class size' required/>
                          <input ref={online_month} type="number" class="form-control" min='0' max='12' placeholder='Starting Month' required/>
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
                          <input ref={offline_limit} type="number" class="form-control" min='0' max='10' placeholder='Max class size' required/>
                          <input ref={offline_month} type="number" class="form-control" min='0' max='12' placeholder='Starting Month' required/>
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
  const [online_schedule,setOnline_Schedule]=useState()
  const [offline_schedule,setOffline_Schedule]=useState()

  useEffect(()=>{
    axios.get('/enrolled/all',{params:{filter:{course:course._id}}})
      .then((res) => {
          setEnrolled(res.data.data)
          let online_enrolled =[]
          let offline_enrolled =[]
          res.data.data.forEach((item, i) => {
            switch(item.delivery){
              case 'in-person group':
                if(item.status=='enrolled'){offline_enrolled.push(item)}
              break;
              case 'online group':
              if(item.status=='enrolled'){online_enrolled.push(item)}
              break;
              default:
            }
          });
          console.log('enrolled',res.data.data,online_enrolled,offline_enrolled)
          calculateSchedule(course.online_schedule,online_enrolled,'online')
          calculateSchedule(course.offline_schedule,offline_enrolled,'offline')
          })
      .catch((err) => {
        console.log(err);
        });

  },[])
  const enroll=(channel,product)=>{
    console.log(user.first,'is enrolling in',course.name)
    // axios.post('/payment/course',{
    //   product:product,
    //   purchase:{
    //     student:user._id,
    //     course:course._id,
    //     delivery:channel
    //   }
    // }).then((res) => {
    //   window.location.href=res.data.data.url
    //         })
    //     .catch((err) => {
    //       console.log(err);
    //       });
      axios.post('/enrolled/new',{
          student:user._id,
          course:course._id,
          delivery:channel,
          status_date:new Date(),
          status:'enrolled'
      }).then((res) => {
        window.location.reload()
              })
          .catch((err) => {
            console.log(err);
            });
  }
  const calculateSchedule=(schedule,attendance,type)=>{
    let current_month = new Date().getMonth()
    let starting_month = schedule.timeslots[0].month-1
    let repeats = schedule.repeats
    starting_month=moment(new Date(moment().year(),starting_month,1))
    current_month = moment(new Date(moment().year(),current_month,1))
    let gap = Math.abs(current_month.diff(starting_month,'months'))
    let cycles = Math.ceil(gap/repeats)
    let next_start = starting_month.add(cycles*repeats,'months')
    // next_start = moment(new Date(moment().year(),next_start,1))
    // console.log('new calc',starting_month,current_month,gap,cycles,next_start)
    next_start={
      start:next_start.format('M/D'),
      graduation:next_start.add(repeats,'months').format('M/D'),
      limit:schedule.timeslots[0].limit,
      attendance:attendance
    }
    if(type=='online'){setOnline_Schedule(next_start)}
    else{setOffline_Schedule(next_start)}
  }
  const lockEnroll=(schedule,channel)=>{
    let isEnrolled=false
    enrolled.forEach((item, i) => {
      if(item.student._id==user._id){isEnrolled=true}
    });

    if(schedule.attendance.length>=schedule.limit
      || isEnrolled==true
      || user.role!='user'){}
    else{
      if(user.role){
        return <Popup button={"Enroll"} num={course._id} content={
          <div class='col'>
            <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();enroll(channel,course.stripe)}}>Agree & Pay</div>
          </div>
        }/>
      }
    }
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
              {enrolled.includes(course._id)?
                <div class='col' style={{backgroundColor:'#55DF80',fontWeight:'700',color:'white'}}>
                  YOU'RE ENROLLED!
                  <button style={{width:'50%',color:'white',backgroundColor:'black',fontWeight:'700'}} onClick={(e)=>{window.location='/clock_out'}}>FINISH</button>
                </div>
            :course.delivery?course.delivery.map((channel,i)=>{
              return (
                <div class='fixed-row'>
                  <h3>{channel}</h3>
                  <div class='col'>
                    {channel=='online private'?
                  'anytime! study at your own pace with full attention'
                    :channel=='online group'?
                    <div>
                      <div class='col'>
                        Last enroll & start date: {online_schedule.start}, Graduation date: {online_schedule.graduation}
                      </div>
                      {lockEnroll(online_schedule,'online group')}
                    </div>
                    :<div>
                      <div class='col'>
                        Last enroll & start date: {offline_schedule.start}, Graduation date: {offline_schedule.graduation}
                       </div>
                       {lockEnroll(offline_schedule,'in-person group')}
                     </div>
                  }</div>
                </div>
              )
            }):''}
            </div>
            <div class='up_row'>
              <div class='col border'>
                <h2 style={{marginBottom:'5%'}}>Lessons</h2>
                <div class='fixed-row lesson' style={{marginTop:'0%'}}>
                  <div class='box'></div>
                  <div class='display'>
                    <h3>START</h3>
                  </div>
                  <div class='connector'></div>
                </div>

                {course.lessons?course.lessons.sort((a,b)=>a.id-b.id).map((lesson,i)=>{
                  return (
                      <div class='fixed-row lesson'>
                        <div class='box'></div>
                        <div class='display'>
                          <div class='fixed-row'>
                            <h3>{lesson.id}</h3>
                            <EditorView content={lesson.content[0]} readOnly={true}/>
                          </div>
                        </div>
                        <div class='connector'></div>
                      </div>
                )
                }):''}
                <div class='fixed-row lesson'>
                  <div class='box'></div>
                  <div class='display'>
                    <h3>GRADUATION</h3>
                  </div>
                </div>
              </div>
              {user.role!='user'?
              <div class='col border'>
                <h2>Students</h2>
                {enrolled?enrolled.map((item,i)=>{
                  return (
                    <table>
                      <tr>
                        <td>{item.student.first}</td>
                        <td>{item.student.last}</td>
                        <td>{item.progress}</td>
                        <td><div class="btn" style={{position:'relative',width:'80%',backgroundColor:'lime',color:'white'}}>+</div></td>
                      </tr>
                    </table>
                  )
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
