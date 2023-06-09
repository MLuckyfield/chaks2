import Table from '../utilities/table'
import SessionTable from './SessionTable'
import ViewTrials from '../manager/ViewTrials'
import ViewTeachers from '../manager/ViewTeachers'
import moment from "moment"
import React, { useRef, useState, useEffect } from 'react';

const OpsView =()=>{
  const [display,setDisplay]=useState(false)
  const [year,setYear]=useState(()=>{let time = new Date();return time.getYear()+1900})
  const [month, setMonth]=useState(()=>{let time = new Date();return time.getMonth()+1})

  return(
    <div class='col'>
      <SessionTable/>
      <ViewTrials/>
      <div class='col border'>
      <h2>New Accounts</h2>
      <div class='up_row' style={{margin:'0% !important'}}>
          <Table name={moment().month(month-2).format('MMMM')} api='/user/all' filter={{role:'user',createdAt:{$gte:new Date(`${year}-${month-1}-1`),$lte:new Date(`${year}-${month-1}-${new Date(year,month-1,0).getDate()}`)}}} fields="first last segment"/>
          <Table name={moment().month(month-1).format('MMMM')} api='/user/all' filter={{role:'user',createdAt:{$gte:new Date(`${year}-${month}-1`),$lte:new Date(`${year}-${month}-${new Date(year,month,0).getDate()}`)}}} fields="first last segment"/>
      </div>
      </div>
      <ViewTeachers name='Teachers' api='/user/all' filter={{role: 'teacher',active:{'$ne':false}}} fields="first last"/>

      {display?<Table name='comments' api='/user/all' filter={{role: 'user'}} fields="first last segment lastVisit"/>
      :<div class="btn" style={{position:'relative'}} onClick={(e)=>{e.preventDefault();setDisplay(true)}}>Emergency - Show All</div>}

    </div>
  )
}
export default OpsView;
