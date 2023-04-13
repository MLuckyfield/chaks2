
//real-time notification helpers
import {io} from 'socket.io-client';
const socket=io()

export const notify = (channel, payload) => {
  socket.on(channel,(payload)=>{
    setClock(payload)
  })
}

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
