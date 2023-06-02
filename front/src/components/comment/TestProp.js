import React, { useState,useEffect,useRef } from 'react';
import {axios} from "../../utilities/axios";
import moment from "moment-timezone"
import Popup from '../utilities/popup'
import Trial from '../user/TrialRequest'
import PerformanceView from '../manager/PerformanceView'
import OpsView from '../manager/OpsView'
import { Redirect } from 'react-router'
import instructor from '../../images/OUTPUT.jpg'
import campaign from '../../images/sakura.jpg'
import info from '../../output.png'
import {useSelector} from 'react-redux'
import actions from "../../utilities/actions";
import logo from '../../chatshack.jpg'
//test
const TestProp = () => {


  const [account,setAccount]=useState(()=>{
    axios.get('/user/all',{params:{filter:{_id:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          console.log('found',res.data.data)
          setAccount(res.data.data[0])
          })
      .catch((err) => {
        console.log(err);
        });
  })
  const [courses,setCourses]=useState(()=>{
    axios.get('/enrolled/all',{params:{filter:{student:JSON.parse(localStorage.getItem('user'))._id}}})
      .then((res) => {
          setCourses(res.data.data)
          })
      .catch((err) => {
        console.log(err);
        });
  })

  const competitors = [
    {},
    {
      name:'CHATSHACK',
      starting_cost:0,
      hourly:(hours)=>{return 8000/((hours/50)*60)},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:true,
      duration:'気軽',
      correction:'',
      feedback:''
    },
    {
      name:'Lancul',
      starting_cost:10000,
      hourly:(hours)=>{return 8000/((hours/50)*60)},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:true,
      duration:'50分',
      correction:'',
      feedback:''
    },
    {
      name:'Mickyhouse',
      starting_cost:0,
      hourly:(hours)=>{return hours>9?1600:2000},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:false,
      duration:'気軽',
      correction:false,
      feedback:false
    },
    {
      name:'Bertlitz',
      starting_cost:33000,
      hourly:(hours)=>{return 6270},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:true,
      duration:'40分',
      correction:'',
      feedback:''
    },
    {
      name:'AEON',
      starting_cost:15950,
      hourly:(hours)=>{return 12375/4},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:true,
      duration:'50分',
      correction:true,
      feedback:false
    },
    {
      name:'ECC',
      starting_cost:15000,
      hourly:(hours)=>{return 17600/4},
      condition:'',
      other:'',
      goal:'',
      teacher:'',
      reservation:true,
      duration:'40分',
      correction:false,
      feedback:true
    }
  ]
  //useselector
  const user = useSelector(state => state.userReducer)
  const [hours,setHours] = useState(4)
  const [estimate,setEstimate] = useState()

  return (
    <div class='col border'>
      <div class='calculator'>
        <h1>Calculator</h1>
        <div class='fixed-row'>
          <div>In 1 month</div>
          <input onChange={(e)=>setHours(e.target.value)} value={hours} type='number' min='4'></input>
          <div>hours</div>
        </div>
        <table>
          <tr>
              <td>{hours*2000}</td><td>Base Cost</td>
          </tr>
          <tr>
          {hours>=12?<tr><td>-{hours*2000*0.1}</td><td>Over 12 hour discount (10%)</td></tr>:
            hours>=8?<tr><td>-{hours*2000*0.05}</td><td>Over 8 hour discount (5%)</td></tr>:
              'get discounts from 8 hours or more!'}
          </tr>
        </table>
        {hours>=12?<div class='price_display'>{hours*2000*0.9}</div>:
          hours>=8?<div class='price_display'>{hours*2000*0.95}</div>:
                  <div class='price_display'>{hours*2000}</div>}
        <div class='row'>Students get an extra 10% off!</div>
        <div class='row'>Earn 1000yen credit per referall (sign up over 4 hours)!</div>
      </div>
      <div class="scrollable">
        <table class='comparison'>
          <thead>
            <tr>
              {competitors.map(school=>{
                return school.name=='CHATSHACK'?<th><img style={{with:'50px',height:'50px'}} src={logo} alt="Avatar"></img></th>:<th>{school.name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(competitors[1]).map(key=>{
              return key=='name'?'':
               <tr><td>{key}</td>{
                competitors.map((school, i) => {
                  console.log(key, typeof school[key])
                  return school.name==null?'':(
                    key=='hourly'?<td>{new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY'}).format(Math.round(school.hourly(hours)))}~</td>:(
                      typeof school[key] =='boolean'?//translate boolean types to icons
                        <td>{school[key]?
                          <span class="material-icons" style={{color:'lime'}}>radio_button_unchecked</span>
                          :<span class="material-icons"  style={{color:'red'}}>close</span>}</td>
                        :(
                      typeof school[key]=='number'?
                        <td>{new Intl.NumberFormat('ja-JP',{style:'currency',currency:'JPY'}).format(school[key])}</td>
                        :<td>{school[key]}</td>
                        ))
                  )
                })
              }</tr>
            })}
          </tbody>
        </table>
      </div>
      <div class='fixed-row' style={{backgroundImage: 'url('+campaign+')',backgroundSize:'cover',backgroundColor:'rgba(255,102,128,0.6)',color:'white'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(175,65,84,0.6)',width:'100%',margin:'0',display:'flex'}}>
          <div class='col w20'>
            <span class='vertical_banner' style={{background:'rgba(238,222,33,1)'}}>新規入会<br/>キャンペーン</span>
          </div>
          <div class='col w80 align'>
            <p>選び抜かれた講師陣</p>
            <h1>２％</h1>
            <p style={{marginBottom:'3%'}}>合格率２％のテストに合格した講師のみ</p>
            <Popup button={"詳細"} num={2} content={
              <div class='col'>
                  <h1 style={{margin:'10% 0'}}>初月３０%割引</h1>
                  <p>4月中にご契約されるお客様には３０％割引が適用されます！</p>
                  <div class='col'>
                      <div class='fixed-row'>
                          <div class='col align'>
                            <h2>割引例</h2>
                            <ul>
                              <li>４時間プラン：通常8,000円が3月限定で5,600円</li>
                              <li>８時間プラン：通常16,000円が3月限定で11,200円</li>
                              <li>１２時間プラン：通常24,000円が3月限定で16,800円</li>
                            </ul>
                          </div>
                      </div>
                      <div class='fixed-row'>
                          <div class='col align'>
                            <h2>学生限定</h2>
                            <p>さらに！！学生様には追加で１０％割引が適用されます！</p>
                          </div>
                      </div>
                  </div>
              </div>
            }/>
            </div>
          </div>
      </div>
    </div>
  )

}

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
      <h1>Trials</h1>
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
                    <td>{trial.status}</td>
                    <td><button onClick={(e)=>showTrial(e,trial)} style={{backgroundColor:'green',color:'white',borderRadius:'5px'}}>Go</button></td>
                 </tr>
        }):''}
      </table>
      </div>
  )
}



export default TestProp;
