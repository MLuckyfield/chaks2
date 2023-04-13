

//currentUser related helpers
const setCurrentUser = (user) =>{
  console.log('action activated')

  return {
    type: "setCurrentUser",
    payload: user
  }
}
export const getCurrentUser = ()=>{
  console.log('current user',JSON.parse(localStorage.getItem('user')))
  return JSON.parse(localStorage.getItem('user'))
}
