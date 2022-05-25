import React, { Component } from 'react';
// import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import DashNav from './DashNav'
import Table from '../utilities/table'
import Navbar from './Navbar'
// import { useEffect, useState} from 'react';
import { Switch,BrowserRouter as Router, Route} from 'react-router-dom';

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
            <div class='nav-filler'>
            </div>
        <div id='admindash'>
            <Switch>
              <Route path='/dash' component={Dash}/>
            </Switch>

        </div>
      </div>

    )


}

const StaffTable = ()=>{
  const filter = {role: 'teacher'}
  return <Table name='Teachers' api='/user/all' filter={filter} fields="-__v -tags -source -_id -password -createdAt -updatedAt"/>
}
const StudentTable = ()=>{
  const filter = {role: 'user'}
  return <Table name='Students' api='/user/all' filter={filter} fields="-__v -tags -source -_id -password -createdAt -updatedAt"/>
}

const Dash = ()=>{
  const user = JSON.parse(localStorage.getItem('user'))
  if (user.role=='user'){
    return <div>Hi student</div>
  }else if (user.role=='teacher')
  {
    return <StudentTable/>
  }else if (user.role=='manager'){
    return(
      <div>
        <StaffTable/>
        <StudentTable/>
      </div>
    )
  }else{
    return <div>none</div>
  }

}
export default Admin;
