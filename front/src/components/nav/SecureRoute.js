import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { useState, useEffect ,useRef} from 'react';

const Redirect = ()=>{
  useEffect(()=>{
    window.location='/login'
  },[])

  return(<div></div>)
}

const SecureRoute = ({ access, success, fail, ...options }) => {
//const { user } = useAuthDataContext();

    let user = localStorage.getItem('user');
    if(user == '' || user == null || user == undefined){
      return <Route {...options} component={fail} />;
    }else{
      user = JSON.parse(localStorage.getItem('user'));
      let okay = false
      access.forEach((item, i) => {
        if (user.role==item){okay=true}
      });

      if(okay==true){return <Route {...options} component={success} />;}
      else{return <Route {...options} component={Redirect} />;}
    }
}


export default SecureRoute;
