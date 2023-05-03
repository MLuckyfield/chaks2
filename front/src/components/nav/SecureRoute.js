import {BrowserRouter as Router, Route} from 'react-router-dom';

const SecureRoute = ({ access, success, fail, japanese, ...options }) => {
//const { user } = useAuthDataContext();
// console.log(localStorage.removeItem('user'))
let user = localStorage.getItem('user');
// console.log('failed',user,user==undefined,typeof user)
if(user == '' || user == null || user == undefined){
  return <Route {...options} component={fail} />;
}else{
  user = JSON.parse(localStorage.getItem('user'));
  let okay = false
  access.forEach((item, i) => {
    if (user.role==item){okay=true}
  });

  const finalComponent = (okay? success : fail);
  return <Route {...options} component={finalComponent} />;
}

}
export default SecureRoute;
