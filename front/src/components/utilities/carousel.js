import banner from '../../banner.jpg'
import React, { useState} from 'react';

const Carousel = (props)=>{

  const [items, setItems] = useState(props.items);

  return (
    <div>
      {items ? (items.map(function(item, i){
          return (
            <div id='header' class='transparent' style={{backgroundImage: 'url('+item.picture+')'}}>
                <div class='overlay' onClick={()=>window.location=item.link}>
                    <div class='row'>
                      <div class='col'>
                        <h1 class='logo-basic'>{item.text}</h1>
                      </div>
                    </div>
                </div>
            </div>
          )
        })): 'Loading...'}
    </div>
  )
}

export default Carousel;
