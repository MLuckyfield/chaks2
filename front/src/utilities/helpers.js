
import * as constants from './constants'
import {axios} from "./axios";

//currentUser related helpers
export const setCurrentUser = (user) =>{
  localStorage.setItem('user', JSON.stringify(user));
}
export const getCurrentUser = ()=>{
  return JSON.parse(localStorage.getItem('user'));
}

export const checkPermission = (user, accessLevel) => {
  switch (user) {
    case 'user':
      user = constants.USER
      break;
    case 'teacher':
      user = constants.TEACHER
      break;
    case 'manager':
      user = constants.MANAGER
      break;
    case 'director':
      user = constants.DIRECTOR
      break;
    default:
      user = constants.USER
  }
  return user >= accessLevel;
}

export const endSession=(studentId)=>{
  // console.log('will send '+JSON.stringify(target))
  axios.get('/user/endSession', {params:{student:studentId}})
    .then((res) => {
        res=res.data.display
        alert('Billable: '+res.billable+' |Unpaid: '+res.unpaid+' |Remaining: '+res.remaining)
      })
    .catch(error => console.log("error"+error))
}
