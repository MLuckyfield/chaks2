const setCurrentUser = (user) =>{
  return {
    type: "setCurrentUser",
    payload: user
  }
}

module.exports = {
  setCurrentUser
}
