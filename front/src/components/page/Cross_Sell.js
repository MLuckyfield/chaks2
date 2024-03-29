import Popup from '../utilities/popup'

import event_game from '../../event_game.jpg'
import blog_header from '../../blog_header.jpg'

const Online_Landing = () => {

  return(
    <div id='products' class='col dark' style={{width:'100%',margin:'0'}}>
      <h1 style={{padding:'5%'}}>+もっと楽しく！</h1>
      <div class='row'>
        <div class='col' style={{height:'50vh',backgroundImage: 'url('+event_game+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>
          <div class='mini_overlay slim' style={{backgroundColor:'rgba(175,65,84,0.9)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid white'}}>
            <div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <h2>EVENTS</h2>
                <span style={{height:'40px',margin:'5%',textAlign:'center'}}>国際交流でリアルな英語を体験しよう</span>
                <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='/events'}}>詳細</div>
            </div>
          </div>
        </div>
        <div class='col' style={{height:'50vh',backgroundImage: 'url('+blog_header+')',backgroundSize:'cover',backgroundPosition:'center center',padding:'0',width:'100%'}}>
          <div class='mini_overlay slim' style={{backgroundColor:'rgba(175,65,84,0.9)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid white'}}>
            <div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            {window.location.pathname==='/courses'?
            <div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <h2>CAFE&BAR</h2>
                <p>楽しく身につく, 新しい形の英会話!</p>
                <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='/'}}>もっと見る</div>
            </div>
            :<div style={{border:'1px solid white',width:'97%',height:'97%',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <h2>COURSES</h2>
                <span style={{height:'40px',margin:'5%',textAlign:'center'}}>ビジネス英語、TOEIC対策コースなど！</span>
                <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='/courses'}}>詳細</div>
            </div>}
            </div>
          </div>
        </div>
      </div>
      {window.location.pathname==='/online'?
      <div style={{border:'1px solid white'}} class='col'>
        <h2>CAFE&BAR</h2>
        <p>楽しく身につく, 新しい形の英会話</p>
        <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='/'}}>もっと見る</div>
      </div>
      :
      <div style={{border:'1px solid white'}} class='col'>
        <h2>ONLINE</h2>
        <p>プレミアムオンライン英会話!</p>
        <div class="btn" style={{position:'relative',width:'80%'}} onClick={(e)=>{e.preventDefault();window.location='/online'}}>もっと見る</div>
      </div>}

    </div>
)}
// <Popup button={"詳細!"} num={5} content={
//   <div class='col'>
//       <div class='col'>
//           <div class='fixed-row' style={{alignItems:'flex-start'}}>
//               <div class='col align'>
//                 <h2 style={{marginBottom:'5%'}}>講師陣が英会話レベルを４項目で評価！</h2>
//                 <img style={{width:'100%'}} src={fluency}></img>
//                 <p></p>
//               </div>
//           </div>
//           <div class='fixed-row'>
//               <div class='col align'>
//                 <h2 style={{marginBottom:'5%'}}>ガイドコース</h2>
//                 <img style={{width:'100%'}} src={courses}></img>
//                 <p>学習したい英文法を設定して使うことで講師が間違いを直してくれるガイドコースも利用可能！</p>
//               </div>
//           </div>
//       </div>
//   </div>
// }/>
export default Online_Landing;
