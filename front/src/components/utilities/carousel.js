import banner from '../../banner.jpg'
import React, { useEffect,useState} from 'react';

const Carousel = (props)=>{
//
//   const [items, setItems] = useState(props.items);
//   let revolutions = 0
//   const timer = (callback)=>{
//     console.log('timer called')
//     for(let i=0;i<items.length-1;i++){
//       console.log('testing '+i+' which is currently '+items[i].active)
//       if(items[i].active==true){
//         console.log(items[i].text + ' is active')
//         items[i].active=false
//         console.log(i + 'is now '+items[i].active)
//         items[next(i,items.length)].active=true
//         console.log(JSON.stringify(items))
//         setItems(items)
//         break
//       }else{console.log(items[i].text+' is not active');continue}
//     }
//     if(revolutions<100){setInterval(timer,3000);revolutions++}
//   }
// const next=(position,length)=>{
//   if(position==length-1){
//     console.log('back to start')
//     return 0
//   }else{
//     console.log('setting next' )
//     return position+1
//   }
// }
//
//   useEffect(()=>{
//     timer(timer)
//   },[])

  return (
    // <span>
    //   {items ? (items.map(function(item, i){
    //
    //       let style={backgroundImage: 'url('+item.picture+')'}
    //       if(!item.active){style['display']='none'}
    //
    //       return (
    //         <div id='header' class='transparent' style={style}>
    //             <div class='overlay'>
    //                 <div class='row'>
    //                   <div class='col'>
    //                     <h1 class='logo-basic'>{item.text}</h1>
    //                     <h3>{item.subtext}</h3>
    //                     <button onClick={()=>window.location=item.link} class="solid-first">More</button>
    //                   </div>
    //                 </div>
    //                 <div class='indicator'>next</div>
    //             </div>
    //         </div>
    //       )
    //     })): 'Loading...'}
    // </span>
          <div class="carousel-wrapper">
        <div class="carousel-container">
          <div class="carousel">
          {props.items ? (props.items.map(function(item, i){

                let style={backgroundImage: 'url('+item.picture+')'}

                return (
                  <div id='header' class='transparent' style={style}>
                      <div class='overlay'>
                          <div class='row'>
                            <div class='col'>
                              <h1 class='logo-basic'>{item.text}</h1>
                              <p>{item.subtext}</p>
                              <button onClick={()=>window.location=item.link} class="solid-first">More</button>
                            </div>
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
