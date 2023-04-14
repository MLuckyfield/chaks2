const { Server } = require("socket.io");

let io;
const initiate = (server)=>{
  io = new Server(server);
}

const startSession = (comment)=>{
  io.emit('startSession', comment)
}

const endSession = (comment)=>{
  io.emit('endSession', comment)
}

module.exports={initiate,startSession,endSession}
