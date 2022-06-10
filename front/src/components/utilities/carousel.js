import twitter from '../../sns_logos/twitter_dark.png'
import youtube from '../../sns_logos/yt_dark.png'
import instagram from '../../sns_logos/insta_dark.jpg'

const Carousel = (props)=>{

  return (
    <div id='header' class='transparent' style={{backgroundImage: 'url('+banner+')'}}>
      <div class='overlay'>
          <div class='row'>
            <div class='col'>
              <h1 class='logo-basic'>６月7日にオープン予定！</h1>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Carousel;
