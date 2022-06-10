import banner from '../../banner.jpg'

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
