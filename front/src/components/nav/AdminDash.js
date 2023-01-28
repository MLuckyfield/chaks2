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
  const [source,setSource] =useState()
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return JSON.parse(localStorage.getItem('user'))}
  })

  useEffect(() => {
    // let focus = JSON.parse(localStorage.getItem('user'))._id
    // console.log('getting for',focus)
    axios.get('user/session',{params:{filter:{role: 'teacher'}}})
      .then((result)=>{
        // console.log('presort',result)
        result = result.data.data
        //  console.log('post sort',result)
         let inSession = []
         result.forEach((teacher, i) => {
           teacher.students.forEach((student, i) => {
             student['teacher']=teacher
             inSession.push(student)
           });
         });
         console.log('inSession',inSession)
         setStudents(inSession)
         localStorage.setItem('dash',inSession)
         socket.on('updateDash', (id,receipt) => {
           axios.get('user/all',{params:{filter:{_id: id}}})
             .then((res)=>{
               // setStudents(localStorage.getItem('dash').map(x=>{
               //   if(x._id!==res.data.data._id){console.log('no match');return x}
               //   return {...x,inClass:res.data.data.inClass}
               // }))
               console.log('student logged out',res)
               alert('Billable: '+receipt.billable+' |Unpaid: '+receipt.unpaid+' |Remaining: '+receipt.remaining)
               window.location='/dash'
             })
             .catch(error=>console.log('failed to update dash',error))
         });
      })
      .catch(error=>console.log('From sendTo teacher:',error))
  },[])
  const clockin=(item,status)=>{
    console.log('will send '+item)
    axios.get('/user/clock', {params:{filter:item._id,data:status}})
      .then((res) => {
          console.log(res.data.data);
          let change = res.data.data
          setStudents(students.map(x=>{
            if(x._id!==res.data.data._id){console.log('no match');return x}
            return {...x,inClass:res.data.data.inClass}
          }))
          localStorage.setItem(source,JSON.stringify(res.data.data))
          // if(status==true){setPayable(null)}
          // else{setPayable(res.data.data.statistics[0])}
          // let start =moment(res.data.data.statistics[0].start)
          // let end = moment(res.data.data.statistics[0].end)
          // const time = end.diff(start, 'minutes')
          // let billable = 0
          // if(time-40>0){billable=time-40}
          // billable = (Math.round(billable/30)*1000)+1000
          // console.log('Billable time is',billable,start,end)
          res=res.data.display
          console.log('register',res)
          if(!status){alert('Billable: '+res.billable+' |Unpaid: '+res.unpaid+' |Remaining: '+res.remaining)}
        })
      .catch(error => console.log("error"+error))
  }
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
      <h1>In Session ({students?students.length:''})</h1>
      <table>
        <tr>
          <th>first</th>
          <th>last</th>
          <th>teacher</th>
          <th>start</th>
          <th>status</th>
          <th> </th>
        </tr>
      {students?students.map((student,i)=>{
        let first = student.statistics.sort((a,b)=>{
          return new Date(b.start)-new Date(a.start)
        })
        return (<tr>
          <td>{student.first}</td>
          <td>{student.last}</td>
          <td>{student.teacher.first}</td>
          <td>{moment(new Date(first[0].start)).format("MMM Do HH:mm")}</td>
          <td>{student.inClass==true?<button onClick={student.inClass?()=>clockin(student,false):()=>clockin(student,true)} style={student.inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{student.inClass?'End':'Start'}</button>:'Pending feedback'}</td>
          <td><button onClick={()=>makeComment(student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
        </tr>)
      }):'None. :('}
      </table>

    </div>
  )
}
const StudentTable = ()=>{
  return <Table name='Students' api='/user/all' filter={{role: 'user'}} fields="-__v -fluency -progress -online_schedule -online_slots -goals -students -tags -source -password -createdAt -updatedAt -role -active -statistics -subscriptions"/>
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

    return <div>
              <Session user={user}/>
              <Booked user={user}/>
           </div>
  }else if (user.role=='manager'){

    return(
      <div>
        <StaffTable/>
        <Table name='Teachers' api='/user/all' filter={{role: 'teacher'}} fields="-__v -fluency -online_schedule -online_slots -progress -goals -students -tags -source -password -createdAt -updatedAt -points -active -statistics -plan -reward -subscriptions"/>
        <StudentTable/>
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
      axios.get('user/session',{params:{filter:{_id: id}}})
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
      {students?students.map((student,i)=>{
        return (
          <table>
            <tr>
              <td>{student.first}</td>
              <td>{student.last}</td>
              <td><button onClick={()=>makeComment(student)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
            </tr>
            <tr>
              <td>{moment(student.statistics[0].start).format("HH:mm")}</td>
            </tr>
            {student.goals.length>0?(
              student.goals.map((goal,i)=>{
                return (
                  <tr>
                    <td>{goal.ref.name}</td>
                    <td><button onClick={(e)=>updateProgress(e,student._id,goal.ref._id)} class='round_button' style={{background:'green'}}>+</button></td>
                    <td><button onClick={(e)=>updateProgress(e,student._id,goal.ref._id,'fail')} class='round_button' style={{background:'red'}}>-</button></td>
                  </tr>
                )
              })
            ):'No goals set!'}
          </table>
        )
      }):'No students in session'}
    </div>
  )
}
export default Admin;
