

//currentUser related helpers
export const setCurrentUser = (user) =>{
  localStorage.setItem('user', JSON.stringify(user));
}
export const getCurrentUser = ()=>{
  return JSON.parse(localStorage.getItem('user'));
}
