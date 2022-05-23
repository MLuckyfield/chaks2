import React, { Component } from 'react';
// import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import DashNav from './DashNav'
import ApplicationManagement from './ApplicationManagement'
import ApplicationApproval from './ApplicationApproval'
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
        <Sidebar/>
        <div id='admindash'>
            <DashNav/>
            <Switch>
              <Route path='/dash/application_management' component={ApplicationManagement}/>
              <Route path='/dash/application_approval' component={ApplicationApproval}/>
              <Route path='/dash' component={customTable}/>
            </Switch>

        </div>
      </div>

    )


}
const customTable = ()=>{
  return <Table name='Jobs' api='/job/all' fields="-__v -tags -source"/>
}
export default Admin;
