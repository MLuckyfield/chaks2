import React, { useEffect, useRef,useState} from 'react';
import {axios} from "../../utilities/axios";
import Comment from "../comment/CommentV2";
import Popup from "../utilities/popup";
import Social from "../utilities/social";
import moment from "moment"
import {getCurrentUser, checkPermission,endSession} from '../../utilities/helpers'
import * as constants from '../../utilities/constants'
import {io} from 'socket.io-client';
const socket = io();


const StudentComments = () => {

  const [active,setActive]=useState(true)
  const points = useRef('');
  const [user,setUser] = useState(getCurrentUser())
  const [comments, setComments] = useState(null);
  const [source,setSource] =useState()
  const [inSession,setInSession]=useState(false)
  const [target, setTarget]=useState(()=>{
    if (localStorage.getItem('student')){
      setSource('student')
      return JSON.parse(localStorage.getItem('student'))
    }else{setSource('user');return user}
  })
  const speed = useRef();
  const listening = useRef();
  const likes = useRef();
  const goals = useRef();

  useEffect(() => {
      socket.on('startSession',(comment)=>{
          if(target._id==comment.student){
            setInSession(true)
          }
      })
      socket.on('endSession',(comment)=>{
        console.log('endSession triggered StudentComment')
          if(target._id==comment.student){
            setInSession(false)
          }
      })
    axios.get('user/all', {params:{filter:{_id: target._id}}})
    .then(res=>{
      setTarget(res.data.data[0])
      speed.current.value=res.data.data[0].fluency.thinking
      listening.current.value=res.data.data[0].fluency.listening
      likes.current.value=res.data.data[0].profile.likes
      goals.current.value=res.data.data[0].profile.goals

    }).catch(err=>console.log(err))

    axios.get('/comment/all', {params:{filter:target._id}})
      .then((res) => {
          setComments(res.data.data.reverse());
          res.data.data.forEach((comment, i) => {
            if(comment.hasOwnProperty('end')){}
            else{setInSession(true)}
          });

        })
        .catch(error => console.log("error"+error))

  },[])

  // const endSession=(studentId)=>{
  //   // console.log('will send '+JSON.stringify(target))
  //   axios.get('/user/endSession', {params:{student:studentId}})
  //     .then((res) => {
  //         // console.log(res.data.data);
  //         // setTarget(res.data.data)
  //         localStorage.setItem(source,JSON.stringify(res.data.data))
  //         // if(status==true){setPayable(null)}
  //         // else{setPayable(res.data.data.statistics[0])}
  //         // let start =moment(res.data.data.statistics[0].start)
  //         // let end = moment(res.data.data.statistics[0].end)
  //         // const time = end.diff(start, 'minutes')
  //         // let billable = 0
  //         // if(time-40>0){billable=time-40}
  //         // billable = (Math.round(billable/30)*1000)+1000
  //         // console.log('Billable time is',billable,start,end)
  //         res=res.data.display
  //         socket.emit('clock',studentId,false)//send directly withou tback
  //         // if(!status){alert('Billable: '+res.billable+' |Unpaid: '+res.unpaid+' |Remaining: '+res.remaining)}
  //       })
  //     .catch(error => console.log("error"+error))
  // }
  const startSession=(teacherId)=>{
    axios.get('user/startSession',{params:{teacher:teacherId,student:target._id}})
      .then((comment)=>{
         setComments(comments => [...comments],comment)
         window.location.reload()
      })
      .catch(error=>console.log('From startSession teacher:',error))
  }
  const giveGift = (e)=>{
    e.preventDefault()
    axios.post('user/update',{filter:{_id:target._id},data:{'$push':{gifts:'1yr_anniversary'}}})
      .then((result)=>{
        window.location.reload()
      })
      .catch(error=>console.log('Gift error:',error))
  }
  const adjustPoints = (add)=>{
    let changes = []
    for(let i =0;i<points.current.value;i++){
      changes.push({
        value:30
      })
    }
    axios.post('user/update',{filter:{_id:target._id},data:{'$push':{points:changes}}})
      .then((result)=>{
        console.log('update',result)
        let update = JSON.parse(localStorage.getItem('student'))
        update.points=result.data.data.points
        localStorage.setItem('student',JSON.stringify(update))
         window.location.reload()
      })
      .catch(error=>console.log('From startSession teacher:',error))
  }
  const manualComment = (teacherId)=>{
    axios.post('/comment/new',
      {
        student: target._id,
        author: teacherId,
      }).then(()=>{
        window.location.reload()
      })
  }
  const updateFluency =(tab)=>{
    console.log('fluency values',speed.current.value,listening)
    let action = {'$set':{'fluency.thinking':Number(speed.current.value)}}
    if(tab=='listening'){action= {'$set':{'fluency.listening':Number(listening.current.value)}}}
    axios.post('user/goals',{filter:{_id: target._id},data:action})
      .then((update)=>{
          console.log('new goals',update.data.data.goals,update)
      })
      .catch((err)=>{
        console.log('oops',err)
      })
  }
  const updateLikes = ()=>{
    axios.post('user/goals',{filter:{_id: target._id},data:{'$set':{'profile.likes':likes.current.value}}})
      .then((update)=>{
          likes.current.value=update.data.data.profile.likes
      })
      .catch((err)=>{
        console.log('oops',err)
      })
  }
  const updateGoals = ()=>{
    axios.post('user/goals',{filter:{_id: target._id},data:{'$set':{'profile.goals':goals.current.value}}})
      .then((update)=>{
          goals.current.value=update.data.data.profile.goals
      })
      .catch((err)=>{
        console.log('oops',err)
      })
  }
  return(
    <div class='col'>

        {checkPermission(user.role,constants.TEACHER)?
          <div class='col border'>
            <h1>{target.first} {target.last}</h1>
            {user.first == "Matthew" && user.role=='manager'?<span>{target._id} {target.email}</span>:''}
              <table class='hide'>
                {checkPermission(user.role,constants.MANAGER)?
                  <tr class='border'>
                    <td>
                      <div class='row'>
                        {inSession?
                          <button onClick={()=>endSession(target._id)} style={{backgroundColor:'red',width:'80%'}}>End</button>
                          :
                          <Popup button={"Start"} num={2} button_style={{backgroundColor:'blue'}} content={
                            <div class='col'>
                              {Object.entries(constants.PROFILES).map((teacher, i) => {
                                if(teacher[1].active){
                                  return <button onClick={()=>startSession(teacher[0].substring(1))} class='button'>{teacher[1].name}</button>
                                }
                              })}
                            </div>
                          }/>}
                      </div>
                    </td>
                    <td>
                      {'gifts' in target?
                        (target.gifts.includes('1yr_anniversary')?
                        <div>gifted!</div>
                        :
                        <button onClick={(e)=>giveGift(e)} style={{backgroundColor:'green',width:'80%',color:'white'}}>Gift!</button>
                      ):''}
                    </td>
                    <td></td>
                    <td>
                      <div class='fixed-row'>
                        <Popup button={<span class="material-icons">add_comment</span>} num={3} content={
                          <div class='col'>
                            {Object.entries(constants.PROFILES).map((teacher, i) => {
                              if(teacher[1].active){
                                return <button onClick={()=>manualComment(teacher[0].substring(1))} class='button'>{teacher[1].name}</button>
                              }
                            })}
                          </div>
                        }/>
                        <Popup button={<span class="material-icons">data_saver_on</span>} num={1} content={
                          <form class='make_blog'>
                            <h2>Adjust Points</h2>
                            <input ref={points} type="number" min='1' class="form-control" placeholder='Enter number of points' required/>
                            <div class='fixed-row'>
                              <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();adjustPoints()}}>+</div>
                            </div>
                          </form>
                        }/>
                      </div>
                    </td>
                  </tr>:''}
                  {checkPermission(user.role,constants.MANAGER)?<tr>
                    <td><h3>Points</h3></td>
                    <td><h2>{target.points.length}</h2></td>
                    <td>Last Visit</td>
                    <td>{moment(target.lastVisit).format('MMM DD YYYY')}</td>
                  </tr>:''}
                <tr><table><tr>
                  <td><h3>Level</h3></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Speaking</td>
                  <td>
                    <select class='form-control' ref={speed} onChange={()=>updateFluency('speaking')}>
                      {Object.entries(constants.FLUENCY).map((level, i) => {
                        return <option value={level[0].substring(1)}>{level[1].level}</option>
                      })}
                    </select>
                  </td>
                  <td><Popup title={<span class="material-icons">help</span>} num={10} style={{overflow:'auto',overflowX:'scroll'}} content={
                    <div class='col'>
                      <table style={{position:'relative',left:'0px',width:'200%',overflowX:'scroll'}}>
                        <tr style={{color:'white',backgroundColor:'tomato',fontWeight:'800'}}><td>test</td><td>Level</td><td>Speaking</td><td>Listening</td><td>Unlocks</td></tr>
                        {Object.entries(constants.FLUENCY).map((level, i) => {
                          return <tr>
                                    <td></td>
                                    <td>{level[1].level}</td>
                                    <td>{level[1].en_speaking}</td>
                                    <td>{level[1].en_listening}</td>
                                    <td>{level[1].en_unlock}</td>
                                </tr>
                        })}
                      </table>
                    </div>
                  }/></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Listening</td>
                  <td>
                    <select class='form-control' ref={listening} onChange={()=>updateFluency('listening')}>
                      {Object.entries(constants.FLUENCY).map((level, i) => {
                        return <option value={level[0].substring(1)}>{level[1].level}</option>
                      })}
                    </select>
                  </td>
                  <td></td>
                </tr></table></tr>
                {checkPermission(user.role,constants.MANAGER)?
                  <tr>
                  <td><h3>Subscriptions</h3></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>:''}
                {checkPermission(user.role,constants.MANAGER)?target.subscriptions.map(sub=> {
                  return  <tr>
                    <td>{sub.name}</td>
                    <td></td>
                    <td>{sub.status}</td>
                    <td>{moment(sub.start).format('MMM DD YYYY')}</td>
                  </tr>}):''}
                  <tr>
                    <td><h3>About</h3></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Likes</td>
                    <td></td>
                    <td>Goals</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan='2'><textarea ref={likes}></textarea></td>
                    <td colspan='2'><textarea ref={goals}></textarea></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><button onClick={()=>updateLikes()}>Update</button></td>
                    <td></td>
                    <td><button onClick={()=>updateGoals()}>Update</button></td>
                  </tr>
              </table>
          </div>
          :''
        }
      <h1>Feedback ({comments?comments.length:'0'})</h1>
      <div class='col'>
          {comments ? (
            comments.length>0?
            (comments.map(function(comment, i){
                return (
                  <Comment comment={comment} student={target}/>
                )
                    })): (
                      <div class='col slim' style={{background:'#89cff0',color:'white'}}>
                        <div class='col border' style={{borderColor:'white',display:'block'}}>
                          <h1>CHATSHACKにようこそ！</h1><br/>
                          ご登録いただきありがとうございました！　CHATSHACKでは、オフラインレッスンだけではなくオンラインレッスンやコースなど様々な方法で英語力の向上のお手伝いをしています！
                          <br/><p>まずは、無料の体験レッスンを受けてみてください！予約不要で、お客様の好きなタイミングでご来店いただけます。
                            心よりお待ちしておりますので、緊張せずお気軽にお越しください。</p>
                          <p>また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
                            (050 3395 1280)</p>
                            <p>インスタやYouTubeもやっていますので、お楽しみください！</p>
                          <div calss='col'>
                            <Social data={'tiny-logo'}/>
                          </div>
                        </div>
                      </div>)
          ):
          <div class='col slim' style={{background:'#89cff0',color:'white'}}>
            <div class='col border' style={{borderColor:'white',display:'block'}}>
              <h1>CHATSHACKにようこそ！</h1><br/>
              ご登録いただきありがとうございました！
CHATSHACKのオンラインレッスンは優れた講師とのマンツーマンです！
まずは、体験レッスンをお電話にて予約してください！（(050-3395-1280）
              <br/><p>オンラインレッスンのほかにも、CHATSHACKの対面レッスンやコースなど様々な方法で英語力の向上のお手伝いをしています！
対面レッスンは予約不要なので、お客様のタイミングでご来店いただけます！</p>
              <p>スタッフはみんなフレンドリーなので、緊張せずにお気軽にお越しください！また、ご質問や不安な点がある方のお問い合わせもお待ちしております。
                (050 3395 1280)</p>
                <p>インスタやYouTubeもやっていますので、お楽しみください！</p>
              <div calss='col'>
                <Social data={'tiny-logo'}/>
              </div>
            </div>
          </div>}
      </div>
      </div>
)
}

export default StudentComments;
