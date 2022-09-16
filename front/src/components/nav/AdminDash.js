import React, { useEffect, useState } from 'react';
// import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import Table from '../utilities/table'
import Booking from '../utilities/booking'
import Calendar from '../utilities/calendar'
import Popup from '../utilities/popup'
import Navbar from './Navbar'
import SecureRoute from './SecureRoute'
import StudentComments from '../user/StudentComments'
// import { useEffect, useState} from 'react';
import { Switch,BrowserRouter as Router, Route} from 'react-router-dom';
import Product_Display from '../utilities/product_display'
import QRCode from 'react-qr-code'
import {QrReader} from 'react-qr-reader'
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import {io} from 'socket.io-client';
import {axios} from "../../utilities/axios";
import moment from "moment"
const timezone = require ('moment-timezone')

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

const StaffTable = ()=>{
  const [students, setStudents] = useState();

  useEffect(() => {
    let target = JSON.parse(localStorage.getItem('user'))._id
    console.log('getting for',target)
    axios.get('user/session',{params:{filter:{role: 'teacher'}}})
      .then((result)=>{
        result = result.data.data
         console.log('students retrieved: ',result)
         let inSession = []
         result.forEach((teacher, i) => {
           teacher.students.forEach((student, i) => {
             student['teacher']=teacher
             inSession.push(student)
           });
         });
         console.log('inSession',inSession)
         setStudents(inSession)
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  },[])
  const makeComment = (item)=>{
      localStorage.setItem('student',JSON.stringify(item))
      window.location='/student';
      // setTarget(item)
      // console.log(target)
  }
  return(
    <div class='col'>
      <h1>In Session ({students?students.length:''})</h1>
      <table>
        <tr>
          <th>first</th>
          <th>last</th>
          <th>teacher</th>
          <th>start</th>
          <th>status</th>
        </tr>
      {students?students.map((student,i)=>{
        console.log(student.first,student.statistics[0].start)
        return (<tr>
          <td>{student.first}</td>
          <td>{student.last}</td>
          <td>{student.teacher.first}</td>
          <td>{timezone(student.statistics[0].start,'Asia/Taipei')}</td>
          <td>{timezone(student.statistics[0].start,'Asia/Taipei').format('HH:MM')}</td>
          <td>{student.inSession==true?'In Class':'Pending feedback'}</td>
          <td><button onClick={()=>makeComment(student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
        </tr>)
      }):'None. :('}
      </table>

    </div>
  )
}
const StudentTable = ()=>{
  return <Table name='Students' api='/user/all' filter={{role: 'user'}} fields="-__v -progress -students -tags -source -password -createdAt -updatedAt -role -points -active"/>
}

const Dash = ()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role=='user'){
    return(
      <div>
        <StudentComments/>
      </div>
    )
  }else if (user.role=='teacher')
  {

    // if (('serviceWorker' in navigator) && ('PushManager' in window)) {
    //   return navigator.serviceWorker
    //       .register('/../../utilities/service_worker.js')
    //       .then((registration)=> {
    //         console.log('Service worker successfully registered.');
    //         const subscribeOptions = {
    //         userVisibleOnly: true,
    //         applicationServerKey: 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'}
    //
    //         return registration.pushManager.subscribe(subscribeOptions);;
    //       })
    //       .then(function (pushSubscription) {
    //         console.log(
    //           'Received PushSubscription: ',
    //           JSON.stringify(pushSubscription),
    //         );
    //         console.log(JSON.stringify(pushSubscription));
    //       });
    //       .catch((err)=> {
    //         console.error('Unable to register service worker.', err);
    //       });
    // }
    // const beamsClient = new PusherPushNotifications.Client({
    //   instanceId: "d3fef753-d608-4c0b-8b9c-879e7c9e44eb",
    // });
    // let streamId = user._id+'_students'
    // beamsClient
    //   .start()
    //   .then((beamsClient) => beamsClient.addDeviceInterest(streamId))
    //   .then(() => beamsClient.getDeviceInterests())
    //   .then((interests) => console.log("Current interests:", interests))
    //   .catch(console.error);

    return <div><Session user={user}/></div>
  }else if (user.role=='manager'){

    return(
      <div>
        <Calendar/>
        <StaffTable/>
        <Table name='Teachers' api='/user/all' filter={{role: 'teacher'}} fields="-__v -progress -students -tags -source -password -createdAt -updatedAt -role -points -active"/>

        <StudentTable/>
      </div>
    )
  }else{
    return <div>none</div>
  }

}

const Session =(props)=>{
  const [students,setStudents]=useState([])
  useEffect(() => {
    let target = JSON.parse(localStorage.getItem('user'))._id
    console.log('getting for',target)
    axios.get('user/session',{params:{filter:{_id: target}}})
      .then((result)=>{
        result = result.data.data[0].students
         console.log('students retrieved: ',result)
         setStudents(result)
      })
      .catch(error=>console.log('From sendTo teacher:',error))
    socket.on("connect", () => {
      console.log('front socket ready')
      // socket.emit('sendstudent','tada')
    });
    socket.on(target, (id) => {
      axios.get('user/all',{params:{filter:{_id: id}}})
        .then((result)=>{
          result = result.data.data[0]
           console.log('triggered',result)
           if(students.length>0){
             setStudents(current=>[result,...current])
           }else{
             setStudents([result])
           }
        })
        .catch(error=>console.log('From sendTo teacher:',error))
    });
  },[])
  const makeComment = (item)=>{
      localStorage.setItem('student',JSON.stringify(item))
      window.location='/student';
      // setTarget(item)
      // console.log(target)
  }
  return (
    <div class='col'><h1>Session</h1><p></p>
      {students?students.map((student,i)=>{
        return (
          <tr>
            <td>{student.first}</td>
            <td>{student.last}</td>
            <td><button onClick={()=>makeComment(student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
          </tr>
        )
      }):'No students in session'}
    </div>
  )
}
export default Admin;
