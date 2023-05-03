import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"

const ViewTrials = ()=>{
  const [trials,setTrials]=useState()
  useEffect(()=>{
    axios.get('/booking/new_trial',{params:{filter:{trial:true}}})
      .then((res) => {
          setTrials(res.data.data)
          console.log(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  },[])
  const showTrial = (e, trial)=>{
    e.preventDefault()
    localStorage.setItem('trial',JSON.stringify(trial))
    window.location='/trial'
  }

  return (
      <div class='col'>
      <div class='fixed-row'>
        <h1>Booked Trials ({trials?trials.length:0})</h1>
        <button onClick={(e)=>showTrial(e,{segment:'English'})} style={{backgroundColor:'green',color:'white',borderRadius:'5px', width:'10%'}}>New</button>
      </div>
      <table>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Date</th>
          <th>Status</th>
          <th></th>
        </tr>
        {trials?trials.map((trial,i)=>{
          return <tr>
                    <td>{trial.first}</td>
                    <td>{trial.last}</td>
                    <td>{moment.utc(trial.date).format("MMM Do HH:mm")}</td>
                    <td>{trial.status}</td>
                    <td><button onClick={(e)=>showTrial(e,trial)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
                 </tr>
        }):''}
      </table>
      </div>
  )
}
export default ViewTrials
