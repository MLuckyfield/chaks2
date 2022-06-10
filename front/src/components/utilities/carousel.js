import banner from '../../banner.jpg'
import React, { useEffect,useState} from 'react';

const Carousel = (props)=>{

  const [items, setItems] = useState(props.items);
  const [current,setCurrent]=useState(0)

  const timer = (callback)=>{
      items.every(item=>{
        for(let i=0;i<items.length;i++){
          if(items[i].active){
            items[i].active=false
            items[next(i,items.length)].active=true
            setItems(items)
            break;
          }
        }
        return false
      })
      setTimeout(callback,3000)
  }
const next=(position,length)=>{
  if(position==length-1){
    return 0
  }else{
    return position+1
  }
}

  useEffect(()=>{
    timer(timer)
  })
  return (
    <span>
      {items ? (items.map(function(item, i){

          let style={backgroundImage: 'url('+item.picture+')'}
          if(!item.active){style['display']='none'}

          return (
            <div id='header' class='transparent' style={style}>
                <div class='overlay'>
                    <div class='row'>
                      <div class='col'>
                        <h1 class='logo-basic'>{item.text}</h1>
                        <h3>{item.subtext}</h3>
                        <button onClick={()=>window.location=item.link} class="solid-first">More</button>
                      </div>
                    </div>
                    <div class='indicator'>next</div>
                </div>
            </div>
          )
        })): 'Loading...'}
    </span>
  )
}

export default Carousel;
