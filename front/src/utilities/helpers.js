

//currentUser related helpers
const setCurrentUser = (user) =>{
  console.log('action activated')

  return {
    type: "setCurrentUser",
    payload: user
  }
}
export const getCurrentUser = ()=>{
  return JSON.parse(localStorage.getItem('user'))
}
