import React, { Component } from 'react';
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
  return <Table name='Teachers' api='/user/all' filter={{role: 'teacher'}} fields="-__v -tags -source -password -createdAt -updatedAt -role -points -active"/>
}
const StudentTable = ()=>{
  return <Table name='Students' api='/user/all' filter={{role: 'user'}} fields="-__v -tags -source -password -createdAt -updatedAt -role -points -active"/>
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
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: "d3fef753-d608-4c0b-8b9c-879e7c9e44eb",
    });
    let streamId = user._id+'_students'
    beamsClient
      .start()
      .then((beamsClient) => beamsClient.getDeviceId())
      .then((deviceId) =>
        console.log("Successfully registered with Beams. Device ID:", deviceId)
      )
      .then(() => beamsClient.addDeviceInterest(streamId))
      .then(() => beamsClient.getDeviceInterests())
      .then((interests) => console.log("Current interests:", interests))
      .catch(console.error);

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
