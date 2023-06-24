import React, { useEffect, useState } from 'react';
// import {axios} from "../../utilities/axios";
import Table from '../utilities/table'
import Navbar from './Navbar'
import StudentComments from '../user/StudentCommentsv2'
import StudentHome from '../user/accountv2'
import PerformanceView from '../manager/PerformanceView'
import OpsView from '../manager/OpsView'
// import { useEffect, useState} from 'react';
import { Switch,BrowserRouter as Router, Route} from 'react-router-dom';
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import {io} from 'socket.io-client';
import {axios} from "../../utilities/axios";
import moment from "moment"
import {getCurrentUser,endSession} from '../../utilities/helpers'
import {useSelector,useDispatch} from 'react-redux'
import action from "../../utilities/actions";

const socket = io();

const Admin = () => {

  // useEffect(() => {
  //
  //     axios.get('/user/dash')
  //       .then((res) => {
  //           console.log('access granted')
  //         })
  //       .catch(error => console.log(error))
  //   },[])

    return (
      <div class='container'>
            <Navbar/>
        <div id='admindash'>
            <Router>
                <Route path='/dash' component={Dash}/>
            </Router>
        </div>
      </div>
    )
}

const SessionTable = ()=>{
  const [comments, setComments] = useState();
  const [source,setSource] =useState()
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return JSON.parse(localStorage.getItem('user'))}
  })

  useEffect(() => {
    socket.on('startSession',(comment)=>{
      window.location.reload()
    })
    socket.on('endSession',(comment)=>{
      window.location.reload()
    })
    axios.get('comment/getInSession')
      .then((result)=>{
        result = result.data.data
         setComments(result)
         // dispatch(action.updateInSession(result))

      })
      .catch(error=>console.log('From sendTo teacher:',error))
  },[])

  const makeComment = (item)=>{
    console.log('raw',item)
    let temp = item
    delete temp.teacher
    console.log('after',JSON.stringify(temp))
      localStorage.setItem('student',JSON.stringify(temp))
      window.location='/student';
      // setTarget(item)
      // console.log(target)
  }
  return(
    <div class='col'>
      <h1>In Session ({comments?comments.length:''})</h1>
      <table>
        <tr>
          <th>first</th>
          <th>last</th>
          <th>teacher</th>
          <th>start</th>
          <th>status</th>
          <th> </th>
        </tr>
      {comments?comments.map((comment,i)=>{
        return (<tr>
          <td>{comment.student.first}</td>
          <td>{comment.student.last}</td>
          <td>{comment.author.first}</td>
          <td>{moment(new Date(comment.createdAt)).format("MMM Do HH:mm")}</td>
          <td>{comment.hasOwnProperty('end')?comment.status:<button onClick={()=>endSession(comment.student._id)} style={{backgroundColor:'red'}}>End</button>}</td>
          <td><button onClick={()=>makeComment(comment.student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
        </tr>)
      }):'None. :('}
      </table>

    </div>
  )
}
const StudentTable = ()=>{
  return <Table name='comments' api='/user/all' filter={{role: 'user'}} fields="-__v -fluency -students -progress -online_schedule -online_slots -goals -comments -tags -source -password -createdAt -updatedAt -role -active -statistics -subscriptions"/>
}
// <Table name={'Bookings'} api='/booking/all' filter={{status:'reserved',date:{$gte:new Date(`${year}/${month+1}/1`),$lte:new Date(`${year}/${month+1}/${new Date(year,month+1,0).getDate()}`)}}} fields="-student -teacher"/>
//
const Dash = ()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  const [display,setDisplay]=useState(false)
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})

  if (user.role=='user'){
    return(
      <div>
        <StudentComments/>
      </div>
    )
  }else if (user.role=='teacher')
  {
    // <Booked user={user}/>
    return <div>
              <Session user={user}/>
           </div>
  }else if (user.role=='manager'){
    return(
      <div>
        <TabContainer/>
      </div>
    )
  }else{
    return <div>none</div>
  }

}
const Booked = (props)=>{
  const [bookings, setBookings]=useState()
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})

  useEffect(()=>{
    console.log('retrieving bookings for',props.user)
    axios.get('/enrolled/all',{params:{filter:{
      teacher:props.user._id,
      date:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${new Date(year,month,0).getDate()}`)}}
  }})
      .then((res) => {
          console.log('recieved',res.data.data)
          setBookings(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  const makeComment = (item)=>{
      localStorage.setItem('student',JSON.stringify(item))
      window.location='/student';
  }
  return (
    <div class='col'>
        <h1>Bookings</h1>
        {bookings?bookings.map(function(booking,i){
          return (
            <table>
              <tr>
                <td>{booking.student.first}</td>
                <td>{booking.student.last}</td>
                <td>{booking.request}</td>
                <td><button onClick={()=>makeComment(booking.student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
              </tr>
            </table>
          )
        }):''}
    </div>
  )
}
const TabContainer = (props)=>{
  const [activeTab,setActiveTab]=useState('ops')
  const [tabs,setTabs]=useState(props.tabs)//expects array

  return (
    <div class='container'>
      <div class='col'>
        <div class='fixed-row border'>
          <div class='tabNav clickable' onClick={()=>setActiveTab('ops')}>Ops</div>
          <div class='tabNav clickable' onClick={()=>setActiveTab('performance')}>Performance</div>
        </div>
        {activeTab=='ops'?<div class='container'><OpsView/></div>:<PerformanceView/>}
      </div>
    </div>
  )
}
const Session =(props)=>{
  const [comments,setComments]=useState([])
  useEffect(() => {
    let target = getCurrentUser()._id
    console.log('getting for',target)
    axios.get('/comment/teacherSession',{params:{filter:target}})
      .then((result)=>{
        result = result.data.data
         console.log('comments retrieved: ',result)
         setComments(result)
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  },[])
  const makeComment = (student)=>{
      localStorage.setItem('student',JSON.stringify(student))
      window.location='/student';
      // setTarget(item)
      // console.log(target)
  }
  const updateProgress = (e,student,goal,trigger)=>{
      e.preventDefault()
      let update = {'$inc':{'progress.$[el].success':1}}
      if(trigger=='fail'){update={'$inc':{'progress.$[el].fail':1}}}
      console.log('update progress',student,goal)
      axios.get('user/update_goals',{params:{filter:{_id: student},data:update,find:{arrayFilters:[{'el.ref':goal}],new:true}},goal:goal})
        .then((result)=>{
          // result = result.data.data[0]
           console.log('triggered',goal,result)
        })
        .catch(error=>console.log('From sendTo teacher:',error))
      // setTarget(item)
      // console.log(target)
  }
  return (
    <div class='col'><h1>Session</h1><p></p>
      {comments?comments.map((comment,i)=>{
        return (
          <table>
            <tr>
              <td>{comment.student.first}</td>
              <td>{comment.student.last}</td>
              <td>{moment(comment.createdAt).format("HH:mm")}</td>
              <td><button onClick={()=>makeComment(comment.student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
            </tr>
            {comment.student.goals.length>0?(
              comment.student.goals.map((goal,i)=>{
                return (
                  <tr>
                    <td>{goal.ref.name}</td>
                    <td><button onClick={(e)=>updateProgress(e,comment.student._id,goal.ref._id)} class='round_button' style={{background:'green'}}>+</button></td>
                    <td><button onClick={(e)=>updateProgress(e,comment.student._id,goal.ref._id,'fail')} class='round_button' style={{background:'red'}}>-</button></td>
                  </tr>
                )
              })
            ):''}
          </table>
        )
      }):'No comments in session'}
    </div>
  )
}
export default Admin;
