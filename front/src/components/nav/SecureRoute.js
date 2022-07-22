import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { useEffect } from 'react';

const SecureRoute = ({ access, success, fail, ...options }) => {
//const { user } = useAuthDataContext();

let user = localStorage.getItem('user');
if(user == '' || user == null || user == undefined){
  return <Route {...options} component={Redirect} />
}else{
  user = JSON.parse(localStorage.getItem('user'));
  access.forEach((item, i) => {
    if (user.role==item){return <Route {...options} component={success} />}
    else{
      return <Route {...options} component={Redirect} />
    }
  });

}


}
const Redirect = ()=>{
  useEffect(()=>{
    window.location='/login'
  },[])
}

export default SecureRoute;
