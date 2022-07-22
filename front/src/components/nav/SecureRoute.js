import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, { useState, useEffect ,useRef} from 'react';



const SecureRoute = ({ access, success, fail, ...options }) => {
//const { user } = useAuthDataContext();
    alert('secure route activated')
    let user = localStorage.getItem('user');
    if(user == '' || user == null || user == undefined){
      return <Redirect to='/login' />;;
    }else{
      user = JSON.parse(localStorage.getItem('user'));
      let okay = false
      access.forEach((item, i) => {
        if (user.role==item){okay=true}
      });

      if(okay==true){return <Route {...options} component={success} />;}
      else{return <Redirect to='/login' />;}
    }
}


export default SecureRoute;
