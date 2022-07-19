import banner from '../../banner.jpg'
import React, { useEffect,useState} from 'react';

const Carousel = (props)=>{
  return (
          <div class="carousel-wrapper">
              <div class="carousel-container">

                <div class="carousel">
                {props.items ? (props.items.map(function(item, i){
                  return (
                    <div class='col'>
                      <span class='review'>{item.review}</span>
                      <span class='reviewer'>{item.reviewer}</span>
                    </div>
                  )
                    })): 'Loading...'}
                </div>
              </div>
          </div>
  )
}

export default Carousel;
