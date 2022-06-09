import twitter from './sns_logos/twitter_dark.png'
import youtube from './sns_logos/yt_dark.png'
import instagram from './sns_logos/insta_dark.jpg'

const Social = (props)=>{

  return (
    <div class='fixed-row'>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://instagram.com/chatshack/'} src={instagram} alt="English education and event information!"></img></div>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://twitter.com/CHATSHACK_Tokyo'} src={twitter} alt="Newest event and schedule information here!"></img></div>
      <div class='col'><img class={props.data} onClick={()=>window.location.href='https://www.youtube.com/channel/UCjGUSfvKKj72blxyqusTRRg'} src={youtube} alt="English entertainment!"></img></div>
    </div>
  )
}

export default Social;
