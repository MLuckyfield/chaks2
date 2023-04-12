export const setCurrentUser = (user) =>{
  console.log('action activated')

  return {
    type: "setCurrentUser",
    payload: user
  }
}

// module.exports = {
//   setCurrentUser
// }
