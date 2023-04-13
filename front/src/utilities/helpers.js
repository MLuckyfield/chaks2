
import * from './constants'

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
      user = USER
      break;
    case 'teacher':
      user = TEACHER
      break;
    case 'manager':
      user = MANAGER
      break;
    default:
      user = USER
  }
  return user >= accessLevel;
}
