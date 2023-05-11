import React, { useEffect, useState,useRef} from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment"


const ViewTeachers = (props)=> {

  const [target, setTarget] = useState(null);
  const [data, setData] = useState(null);
  const [showContent,setShowContent]=useState(false)

  useEffect(() => {
    if(data==null){
      axios.get(props.api, {params:{filter:props.filter,fields:props.fields}})
        .then((res) => {
          console.log(props.name,res.data.data.length,props.filter)
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

  const createTeacher=()=>{

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
      <div class='fixed-row'>
        <h1>{props.name} ({data?data.length:''})</h1>
        <button onClick={(e)=>{e.preventDefault();setShowContent(true)}} style={{backgroundColor:'green',color:'white',borderRadius:'5px', width:'10%'}}>New</button>
      </div>
      <div class='up_row'>
        <table>
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
      {showContent?
        <div class="popup">
            <div class='col' style={{width:'fit-content',minWidth:'350px',backgroundColor:'white',display:'flex'}}>
              <Signup/>
            </div>
        </div>
        :''}
    </div>
  )

}

export default ViewTeachers;

const Signup = ()=>{
  const email = useRef('');
  const first = useRef('');
  const last = useRef('');
  const password = useRef('');
  const [msg,setMsg] = useState()
  const [form,setForm] = useState(true)

const onSubmit = (e) => {
  e.preventDefault();
  setForm(false)
  axios.post('user/newTeacher',
    {
      first:first.current.value,
      last:last.current.value,
      password:password.current.value,
      email: email.current.value,
    })
    .then((res) => {
      window.location='/dash'
    })
    .catch((err) => {
      setForm(true)
      setMsg([err.message,err.success]);
    });
}


  return (
    <div id='signup' class='col'>
      <div class='col'>
        <form onSubmit={onSubmit}>
          <div class="master-row form-group border">
              <div class='row'>
                <div class='row'><h1>New Teacher</h1></div>
              </div>
              <div class='row'>
                <input ref={first} class='form-control' minlength='1' placeholder='First Name'  required/>
                <input ref={last} class='form-control' minlength='1' placeholder='Last Name'  required/>
              </div>
              <div class='row'>
                <input ref={email} class='form-control' type='email' placeholder='Email'  required/>
              </div>
              <div class='row'>
                <input ref={password} class='form-control' type='Password' placeholder='Password' required/>
              </div>
                {msg?<div class='row'><input class={msg[1]?'msg form-control':'bad msg form-control'} value={msg[0]}></input></div>  :''}
                <div class='row'>
                    {form?<button class='form-control solid-first' type="submit">Sign Up</button>:'Loading...'}
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}
