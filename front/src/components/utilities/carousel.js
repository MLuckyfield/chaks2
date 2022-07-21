import banner from '../../banner.jpg'
import React, { useEffect,useState} from 'react';

const Carousel = (props)=>{
  return (
          <div class="carousel-wrapper">
        <div class="carousel-container">

          <div class="carousel">
          {props.items ? (props.items.map(function(item, i){

                let style={backgroundImage: 'url('+item.picture+')'}

                if(i==0){
                  return (
                    <div class='header transparent' style={style}>
                        <div class='overlay' style={{background:'none'}}>
                            <div class='row'>
                              <div class='col'>
                                <h1 class='logo-basic' style={{width:'100%',background:'rgba(128,0,0,0.7)',padding:'3%'}}>{item.text}</h1>
                                {item.link?<button onClick={()=>window.location=item.link} class="solid-first carousel_button">More</button>:''}
                              </div>
                            </div>
                            <div class='carousel_counter'>
                                {i+1}/{props.items.length}
                            </div>
                        </div>
                    </div>
                  )
                }
                return (
                  <div class='header transparent' style={style}>
                      <div class='overlay'>
                          <div class='row'>
                            <div class='col'>
                              <h1 class='logo-basic'>{item.text}</h1>
                              <p class='preview'>{item.subtext}</p>
                              {item.link?<button onClick={()=>window.location=item.link} class="solid-first carousel_button">More</button>:''}
                            </div>
                          </div>
                          <div class='carousel_counter'>
                              {i+1}/{props.items.length}
                          </div>
                      </div>
                  </div>
                )
              })): 'Loading...'}
          </div>
        </div>
      </div>
  )
}

export default Carousel;
