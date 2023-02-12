import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {Redirect} from 'react-router-dom';
import StudentComments from "../user/StudentComments";
import Search from "./search";
import moment from "moment"


const Table = (props)=> {

  const [target, setTarget] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if(data==null){
      axios.get(props.api, {params:{filter:props.filter,fields:props.fields}})
        .then((res) => {
            // res.data.data.forEach((item, i) => {
            //   item['inClass']=false
            // });
            // alert(res.data.message)
            setData(res.data.data.reverse());
          })
        .catch((error) => {
        })
    }

  },[])
const clockin=(item,status)=>{
  console.log('will send '+JSON.stringify(item))
  axios.get('/user/clock', {params:{filter:item._id,data:status}})
    .then((res) => {
        console.log('updating front');
        setData(data.map(x=>{
          if(x._id!==res.data.data._id){console.log('no match');return x}
          return {...x,inClass:res.data.data.inClass}
        }))
        console.log(data)
      })
    .catch(error => console.log("error"+error))
}
const makeComment = (item)=>{
    localStorage.setItem('student',JSON.stringify(item))
    window.location='/student';
    // setTarget(item)
    // console.log(target)
}
const displayable=(key)=>{
  // console.log(key)
  if(key!='_id'&&key!='email'&&key!='profile'&&key!='inClass'&&key!='stripe'&&key!='monthly_hours'&&key!='role'&&key!='points'){
    return true
  }else{return false}
}
  return (
    <div class='col'>
      <h1>{props.name} ({data?data.length:''})</h1>
      <div class='up_row'>
        <table>
          {target?(
            <div class=''>
                <button onClick={setTarget(null)} class="outline-first">Back</button>
                <StudentComments/>
            </div>
          ):''}


          {data ? (data.map(function(item, i){
              if(i==0){
                return (
                    <span>
                    <tr>
                      {Object.keys(item).sort().map((key, y) => {
                        // console.log(key)
                            if(displayable(key)){
                              return <th>{key}</th>
                            }else{return ''}
                      })}
                      <th></th>
                    </tr>
                    <tr>
                      {Object.keys(item).sort().map((key, y) => {

                        if(displayable(key)){
                          if(key=='statistics'){ console.log('displaying statistics...')
                            if(item[key]){
                              let counter=0
                              item[key].forEach((part, i) => {
                                if(part.end && part.start){
                                  console.log('at least 1 full session')
                                  counter+=moment(part.end).diff(moment(part.start), 'hours')
                                }
                                else{
                                  console.log('session in progress')
                                  counter+=moment(new Date()).diff(moment(part.start), 'hours')
                                }
                              });
                              return <td>{counter}</td>}else{return <td></td>}
                          }
                          // if(key=='inClass'){
                          //   console.log(key+' was triggered')
                          //   return (
                          //
                          //   )
                          // }
                          return <td>{item[key]}</td>
                        }else{return ''}
                      })}
                      <td>
                        {//origin location of START END button
                          //{JSON.parse(localStorage.getItem('user')).role=='manager'?
                          //(<button onClick={item.inClass?()=>clockin(item,false):()=>clockin(item,true)} style={item.inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{item.inClass?'End':'Start'}</button>):''}
                        }
                        {JSON.parse(localStorage.getItem('user')).role=='manager'||JSON.parse(localStorage.getItem('user')).role=='teacher'?
                        (<button onClick={()=>makeComment(item)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button>):''}
                      </td>
                      </tr>
                    </span>
                )
              }
              //console.log('item is: '+JSON.stringify(item.slice(1)))
              return (
                <tr>
                  {Object.keys(item).sort().map((key, y) => {
                    if(displayable(key)){
                      if(key=='statistics'){
                        if(item[key]){
                          let counter=0
                          item[key].forEach((part, i) => {
                            counter+=moment(part.start).diff(moment(part.end), 'minutes')
                          });
                          return <td>{counter}</td>}else{return <td></td>}
                      }
                      // if(key=='inClass'){
                      //   return (
                      //
                      //   )
                      // }
                      return <td>{item[key]}</td>
                    }else{return ''}

                  })}
                  <td>
                  {
                    // {JSON.parse(localStorage.getItem('user')).role=='manager'?
                    // (<button onClick={item.inClass?()=>clockin(item,false):()=>clockin(item,true)} style={item.inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{item.inClass?'End':'Start'}</button>):''}
                  }
                    {JSON.parse(localStorage.getItem('user')).role=='manager'||JSON.parse(localStorage.getItem('user')).role=='teacher'?
                    (<button onClick={()=>makeComment(item)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button>):''}
                  </td>
                  </tr>
                )
                  })): 'No data to display'}
        </table>
      </div>
      <div class='row'>

      </div>
    </div>
  )

}

export default Table;
