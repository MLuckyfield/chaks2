const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require("path")//heroku deployment7
const auth= require('./services/authentication');
const http = require('http')
const { Server } = require("socket.io");
// const cron = require('node-cron')
require('dotenv').config();

const app = express();
const server = http.createServer(app)
const io = new Server(server);

io.on('connection', (socketio) => {
  console.log('a user connected');
});
io.on("hello", (arg) => {
  io.emit('return',arg)
});
app.set('socketio', io)
const port = process.env.PORT || 5000;
//setup middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
    exposedHeaders: ['Authorization']
  }));
app.use(express.static(path.join(__dirname, "/front/build")))//heroku deployment
//connect to Mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.createConnection(uri);
connection.once('open',() => {
  console.log('MongoDB connected successfully')
})
//prepare sessions management
app.use(session({
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized: true,
  cookie:{
    maxAge: 1000*60*60*24,
    sameSite:true,
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
}))


// app.use(express.json());
app.use((req,res,next)=>{
  if(req.originalUrl==='/payment/complete'){
      next()
  }else{
    express.json()(req,res,next)
  }
})


app.disable('x-powered-by');
//backend  routes
//const exercisesRouter = require('./routes/exercises');
//const usersRouter = require('./routes/users');
//app.use('/exercises',exercisesRouter);
//app.use('/users',usersRouter);

app.use('/user',require('./models/user/api'));
app.use('/comment',auth.auth,require('./models/comment/api'));
app.use('/booking',auth.auth,require('./models/booking/api'));
app.use('/event_info',require('./models/event/api'));
app.use('/content',require('./models/content/api'));
app.use('/payment',require('./services/payment'));
app.use('/material',require('./models/material/api'));

//heroku deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/front/build", "index.html"));
});
// cron.schedule('* * * * *',()=>{
//   console.log('cron running...')
// })
//start listening
server.listen(port,() => {
  console.log(`Server is running on port: ${port}`)
})
