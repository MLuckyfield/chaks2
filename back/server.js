const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
//setup middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
    exposedHeaders: ['Authorization']
  }));
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


app.use(express.json());

app.disable('x-powered-by');
//backend  routes
//const exercisesRouter = require('./routes/exercises');
//const usersRouter = require('./routes/users');
//app.use('/exercises',exercisesRouter);
//app.use('/users',usersRouter);
app.use('/user',require('./models/user/api'));

//start listening
app.listen(port,() => {
  console.log(`Server is running on port: ${port}`)
})
