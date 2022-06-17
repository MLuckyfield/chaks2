import React, { useEffect, useState} from 'react';
import {axios} from "../../utilities/axios";
import {Redirect} from 'react-router-dom';
import StudentComments from "../user/StudentComments";
const Table = (props)=> {

  const [target, setTarget] = useState(null);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState();
  const [inClass,setInClass] = useState(false)

  useEffect(() => {
    if(data==null){
      axios.get(props.api, {params:{filter:props.filter,fields:props.fields}})
        .then((res) => {
            console.log(res.data.data.reverse())
            setData(res.data.data);
          })
        .catch(error => console.log("error"+error))
    }

  },[])
const clockin=(item,status)=>{
  axios.post('/user/clock', {params:{filter:{_id:item},data:status}})
    .then((res) => {
        setInClass(status)
      })
    .catch(error => console.log("error"+error))
}
const makeComment = (item)=>{
    localStorage.setItem('student',JSON.stringify(item))
    window.location='/student';
    // setTarget(item)
    // console.log(target)
}
  return (
    <div class='master-row'>
      <h1>{props.name}</h1>
      <div class='row'>
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
                            if(key!='_id'&&key!='email'&&key!='profile'){
                              return <th>{key}</th>
                            }else{return ''}
                      })}
                      <th></th>
                    </tr>
                    <tr>
                      {Object.keys(item).sort().map((key, y) => {
                        if(key!='_id'&&key!='email'&&key!='profile'){
                          return <td>{item[key]}</td>
                        }else{return ''}
                      })}
                      {JSON.parse(localStorage.getItem('user')).role=='manager'?
                      (<th><button onClick={inClass?()=>clockin(item._id,false):()=>clockin(item._id,true)} style={inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{inClass?'End':'Start'}</button></th>):''}
                      {JSON.parse(localStorage.getItem('user')).role=='manager'||JSON.parse(localStorage.getItem('user')).role=='teacher'?
                      (<th><button onClick={()=>makeComment(item)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></th>):''}
                      </tr>
                    </span>
                )
              }
              //console.log('item is: '+JSON.stringify(item.slice(1)))
              return (
                <tr>
                  {Object.keys(item).sort().map((key, y) => {
                    if(key!='_id'&&key!='email'&&key!='profile'){
                      if(key=='statistics'){
                        
                      }
                      return <td>{item[key]}</td>
                    }else{return ''}

                  })}
                  {JSON.parse(localStorage.getItem('user')).role=='manager'?
                  (<th><button onClick={inClass?()=>clockin(item._id,false):()=>clockin(item._id,true)} style={inClass?{backgroundColor:'red'}:{backgroundColor:'blue'}}>{inClass?'End':'Start'}</button></th>):''}
                  {JSON.parse(localStorage.getItem('user')).role=='manager'||JSON.parse(localStorage.getItem('user')).role=='teacher'?
                  (<th><button onClick={()=>makeComment(item)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></th>):''}
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
