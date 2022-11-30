import Signup from "../user/Signup";
import background from '../../online_background.jpg'
import environment from '../../online_environment.jpg'
import ReactPlayer from 'react-player/youtube'

const Online_Landing = () => {

  return(
    <div>
      <div id='header' class='transparent' style={{backgroundImage:'url('+background+')'} }>
        <div class='overlay'>
            <div class='row'>
              <div class='col'>
                <h2>CHATSHACK is now</h2>
                <h1>ONLINE</h1>
                <a class='solid-first cta' href="#signup" style={{textDecoration:'none',textAlign:'center'}}>MORE</a>
              </div>
            </div>
        </div>
      </div>
      <div class='col slim'>
        <div class='fixed-row' style={{width:'50%'}}>
          <h1 style={{margin:'10% 0'}}>METHOD</h1>
        </div>
        <div class='row'>
          <div class='col'>
            INPUT
          </div>
          <div class='col'>
            OUTPUT
          </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.8)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw'}}>
          <div class='row'>
              <div class='col'>
                <div class='fixed-row align' style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">task_alt</span><h2>ネイティブスピーカー</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">task_alt</span><h2>マンツーマンレッスン</h2>
                </div>
                <div class='fixed-row align'  style={{marginBottom:'10%'}}>
                  <span class="material-icons green ">task_alt</span><h2>優秀な講師陣</h2>
                </div>
            </div>
            <div class='col'>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">task_alt</span><h2>オンラインフィードバック</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">task_alt</span><h2>自由なレッスン</h2>
              </div>
              <div class='fixed-row align' style={{marginBottom:'10%'}}>
                <span class="material-icons green ">task_alt</span><h2>選べるレッスン時間</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='col slim'>
        <div class='fixed-row' style={{width:'50%'}}>
          <h1 style={{margin:'10% 0'}}>TEACHERS</h1>
        </div>
        <div class='row'>
          <div class='col'>
            <h2>teacher one</h2>
            <ReactPlayer url='https://www.youtube.com/watch?v=qgLZwUiLfAs' playing={false} volume={0} muted={true} width={'100%'} playIcon={<div class='mini_overlay' style={{height:'500px',width:'500px',zIndex:'10'}}>hello</div>}/>
            <p>blah blah</p>
          </div>
          <div class='col'>
            <h2>teacher two</h2>
            <ReactPlayer url='https://www.youtube.com/watch?v=qgLZwUiLfAs' playing={false} volume={0} muted={true} width={'100%'} playIcon={<div class='mini_overlay' style={{height:'500px',width:'500px',zIndex:'10'}}>hello</div>}/>
            <p>blah blah</p>
          </div>
        </div>
      </div>
      <div class='col slim' style={{backgroundSize:'cover',backgroundColor:'ghostwhite',backgroundImage:'url('+environment+')',padding:'0',margin:'0',width:'100%'}}>
        <div class='mini_overlay' style={{backgroundColor:'rgba(248,248,255,0.8)',display:'flex',alignItems:'center',flexDirection:'column',width:'100vw'}}>
          <div class='fixed-row' style={{width:'50%'}}>
            <h1 style={{margin:'10% 0'}}>NEXT STEPS</h1>
          </div>
          <div class='fixed-row' style={{width:'50%'}}>
            <span class="material-icons green ">looks_one</span>
              <div class='col align'>
                <h2>STEP 1</h2>
                <p>一ヶ月に利用したい時間を決める</p>
              </div>
          </div>
          <div class='fixed-row' style={{width:'50%'}}>
            <span class="material-icons green ">looks_two</span>
              <div class='col align'>
                <h2>STEP 2</h2>
                <p>レッスン時間を購入後、レッスンを予約する</p>
              </div>
          </div>
          <div class='fixed-row' style={{width:'50%'}}>
            <span class="material-icons green ">looks_3</span>
              <div class='col align'>
                <h2>STEP 3</h2>
                <p>当日は、予約後に送られてくるリンクからレッスンを受講する</p>
              </div>
          </div>
        </div>
      </div>
      {localStorage.getItem('user')?
        <div class="btn" style={{position:'relative'}}>購入</div>
        :<Signup redirect={'/online'} segment={'online'}/>
      }
    </div>
)}

export default Online_Landing;
