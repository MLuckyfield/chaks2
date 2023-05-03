const setCurrentUser = (user) =>{
  return {
    type: "setCurrentUser",
    payload: user
  }
}
const setTrialDay = (day) =>{
  return {
    type: "setTrialDay",
    payload: day
  }
}
const setTrialMonth = (month) =>{
  return {
    type: "setTrialMonth",
    payload: month
  }
}
const setTrialHour = (hour) =>{
  return {
    type: "setTrialHour",
    payload: hour
  }
}
const updateInSession = (session) =>{
  return {
    type: "updateInSession",
    payload: session
  }
}
module.exports = {
  setCurrentUser,updateInSession,setTrialMonth,setTrialDay,setTrialHour
}
