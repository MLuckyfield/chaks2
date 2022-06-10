import banner from '../../banner.jpg'
import React, { useState} from 'react';

const Carousel = (props)=>{

  const [items, setItems] = useState(props.items);

  return (
    <span>
      {items ? (items.map(function(item, i){

          let style={backgroundImage: 'url('+item.picture+')'}
          if(item.active){style['display']='none'}

          return (
            <div id='header' class='transparent' style={style}>
                <div class='overlay' onClick={()=>window.location=item.link}>
                    <div class='row'>
                      <div class='col'>
                        <h1 class='logo-basic'>{item.text}</h1>
                        <h3>{item.subtext}</h3>
                      </div>
                    </div>
                </div>
            </div>
          )
        })): 'Loading...'}
    </span>
  )
}

export default Carousel;
