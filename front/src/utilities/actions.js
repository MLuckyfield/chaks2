const setCurrentUser = (user) =>{
  return {
    type: "setCurrentUser",
    payload: user
  }
}

const updateInSession = (session) =>{
  return {
    type: "updateInSession",
    payload: session
  }
}
module.exports = {
  setCurrentUser,updateInSession
}
