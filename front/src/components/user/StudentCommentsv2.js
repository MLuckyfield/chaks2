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
  //<button onClick={()=>startSession('6344faac6bf36a9debe60b25')} class='button'>TEST</button>
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
// const onSubmit = (commentId, e) => {
//   e.preventDefault();
//   setActive(false)
//   axios.post('/comment/update',
//     {
//       commentId:commentId,
//       comment: comment.current.value,
//     })
//     .then((res) => {
//         console.log('done')
//         // setFeedback(res.data.message);
//         window.location.reload()
//         })
//     .catch((err) => {
//       console.log(err);
//       // setFeedback(err.response.data.message);
//       });
// }

  return(
    <div class='col'>
        {user.role=='manager'?
        <div class='row border'>
          <div class='col'>
          <Popup button={"Points"} num={1} content={
            <form class='make_blog'>
              <h2>Adjust Points</h2>
              <input ref={points} type="number" min='1' class="form-control" placeholder='Enter number of points' required/>
              <div class='fixed-row'>
                <div class="btn" style={{position:'relative',width:'80%',backgroundColor:'blue'}} onClick={(e)=>{e.preventDefault();adjustPoints()}}>+</div>
              </div>
            </form>
          }/>
          <Popup button={"Add Comment"} num={3} content={
            <div class='col'>
              {Object.entries(constants.PROFILES).map((teacher, i) => {
                if(teacher[1].active){
                  return <button onClick={()=>manualComment(teacher[0].substring(1))} class='button'>{teacher[1].name}</button>
                }
              })}
            </div>
          }/>
          ポイント: {target.hasOwnProperty('points')?target.points.length:"Load Error. We're fixing it now!"}
          </div>

          <div class='col'>
          {inSession?
            <button onClick={()=>endSession(target._id)} style={{backgroundColor:'red',width:'80%'}}>End</button>
            :
            <Popup button={"Start"} num={2} content={
              <div class='col'>
                {Object.entries(constants.PROFILES).map((teacher, i) => {
                  if(teacher[1].active){
                    return <button onClick={()=>startSession(teacher[0].substring(1))} class='button'>{teacher[1].name}</button>
                  }
                })}
              </div>
            }/>
          }
        </div>
          </div>
        :''}

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
