import React, { Component } from 'react';
// import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import DashNav from './DashNav'
import Table from '../utilities/table'
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
        
        <div id='admindash'>
            <DashNav/>
            <Switch>
              <Route path='/dash' component={Dash}/>
            </Switch>

        </div>
      </div>

    )


}

const StaffTable = ()=>{
  const filter = {role: 'teacher'}
  return <Table name='Teachers' api='/user/all' filter={filter} fields="-__v -tags -source"/>
}
const StudentTable = ()=>{
  const filter = {role: 'user'}
  return <Table name='Students' api='/user/all' filter={filter} fields="-__v -tags -source"/>
}

const Dash = ()=>{
  const user = localStorage.getItem('user')
  if (user.role=='user'){
    return <div>Hi student</div>
  }else if (user.role=='teacher')
  {
    return StudentTable
  }else if (user.role=='manager'){
    return(
      <div>
        <StaffTable/>
        <StudentTable/>
      </div>
    )
  }

}
export default Admin;
