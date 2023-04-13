const setCurrentUser = (user) =>{
  console.log('action activated')

  return {
    type: "setCurrentUser",
    payload: user
  }
}
const getCurrentUser = ()=>{
  return JSON.parse(localStorage.getItem('user'))
}
module.exports = {
  setCurrentUser,getCurrentUser
}
