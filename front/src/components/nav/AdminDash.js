import React, { Component } from 'react';
// import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import DashNav from './DashNav'
import Table from '../utilities/table'
import Booking from '../utilities/booking'
import Calendar from '../utilities/calendar'
import Navbar from './Navbar'
import SecureRoute from './SecureRoute'
import StudentComments from '../user/StudentComments'
// import { useEffect, useState} from 'react';
import { Switch,BrowserRouter as Router, Route} from 'react-router-dom';
import AuthDataProvider from "../auth-provider";

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
  return <Table name='Teachers' api='/user/all' filter={{role: 'teacher'}} fields="-__v -tags -source -password -createdAt -updatedAt -role"/>
}
const StudentTable = ()=>{
  return <Table name='Students' api='/user/all' filter={{role: 'user'}} fields="-__v -tags -source -password -createdAt -updatedAt -role"/>
}

const Dash = ()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role=='user'){
    return(
      <div>
        <Booking/>
        <StudentComments/>
      </div>
    )
  }else if (user.role=='teacher')
  {
    return <StudentTable/>
  }else if (user.role=='manager'){
    return(
      <div>
        <Calendar/>
        <StaffTable/>
        <StudentTable/>
      </div>
    )
  }else{
    return <div>none</div>
  }

}
export default Admin;
