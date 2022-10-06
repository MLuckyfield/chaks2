import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react'

 const AccessDisplay =()=> {

  //const { user } = useAuthDataContext();
    return (
      <div id='access' class='master-row mid'>
        <div class='row'>
          <h1 class='col'>ACCESS</h1>
        </div>
        <div class='row'>
          <div class='col'>
          〒102-0074<br/>
          東京都千代田区九段南２－４－１２<br/>
            Email: support@chatshack.jp<br/>
            050 3395 1280
          </div>
          <div class='col'>
            九段下駅から徒歩７分<br/>
            市ヶ谷駅から徒歩８分<br/>
            半蔵門駅から徒歩１０分<br/>
            飯田橋駅から徒歩１３分<br/>
          </div>
        </div>
        <div class='row'>
            <Map/>
        </div>
      </div>
    )
  }
  const Map = ()=>{
  const [location, setLocation] = useState({
  address:'2-chōme-4-12 Kudanminami, Chiyoda City, Tokyo 102-0074, Japan',
  lat:35.693,
  lng:139.744438
  })

  useEffect(()=>{
  setLocation({
    //  Japan',
    lat:35.693,
    lng:139.74439
  })
  },[])
  return (
  <div id='map'>
      {location?<GoogleMapReact bootstrapURLKeys={{key:'AIzaSyBX-HH0dhkemDet_G5TTZsR__uphcOEI6k'}} defaultCenter={location} defaultZoom={14} v={3.31}>
          <LocationPin lat={location.lat} lng={location.lng} text='ChatShack'/>
      </GoogleMapReact>:'loading'}
  </div>
  )

  }
  const LocationPin=({text})=>{
  return <div class='map-marker'><span class='material-icons'>location_on</span></div>
  }

export default AccessDisplay;
