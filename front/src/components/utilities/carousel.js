import banner from '../../banner.jpg'
import React, { useEffect,useState} from 'react';

const Carousel = (props)=>{
  return (
          <div class="carousel-wrapper">
        <div class="carousel-container">
        // <div class='carousel__navigation'>
        //   <ol class="carousel__navigation-list">
        //     <li class="carousel__navigation-item">
        //       <a href="#carousel__slide1"
        //          class="carousel__navigation-button">Go to slide 1</a>
        //     </li>
        //     <li class="carousel__navigation-item">
        //       <a href="#carousel__slide2"
        //          class="carousel__navigation-button">Go to slide 2</a>
        //     </li>
        //     <li class="carousel__navigation-item">
        //       <a href="#carousel__slide3"
        //          class="carousel__navigation-button">Go to slide 3</a>
        //     </li>
        //     <li class="carousel__navigation-item">
        //       <a href="#carousel__slide4"
        //          class="carousel__navigation-button">Go to slide 4</a>
        //     </li>
        //   </ol>
        // </div>
          <div class="carousel">
          {props.items ? (props.items.map(function(item, i){

                let style={backgroundImage: 'url('+item.picture+')'}

                return (
                  <div class='transparent' style={style}>
                      <div class='overlay' style={{display:'flex',verticalAlign:'middle'}}>
                          <div class='row'>
                            <div class='col'>
                              <h1 class='logo-basic'>{item.text}</h1>
                              <p>{item.subtext}</p>
                              <button onClick={()=>window.location=item.link} class="solid-first carousel_button">More</button>
                            </div>
                          </div>
                      </div>
                      <div class='carousel_counter'>
                          {i}/{items.length}
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
