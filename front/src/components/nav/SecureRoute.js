import {BrowserRouter as Router, Route} from 'react-router-dom';

const SecureRoute = ({ access, success, fail, ...options }) => {
//const { user } = useAuthDataContext();

let user = localStorage.getItem('user');
if(user == '' || user == null || user == undefined){
  window.location='/login'
}else{
  user = JSON.parse(localStorage.getItem('user'));
  let okay = false
  access.forEach((item, i) => {
    if (user.role==item){return <Route {...options} component={success} />}
    else{
      window.location='/login'
    }
  });

}


}
export default SecureRoute;
