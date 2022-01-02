const express = require('express');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//setup middleware
app.use(cors());
app.use(express.json());

//connect to Mongodb
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open',() => {
  console.log('MongoDB connected successfully')
})

//backend  routes
//const exercisesRouter = require('./routes/exercises');
//const usersRouter = require('./routes/users');
//app.use('/exercises',exercisesRouter);
//app.use('/users',usersRouter);
app.use('/user', require('./models/user/api'));

//start listening
app.listen(port,() => {
  console.log(`Server is running on port: ${port}`)
})
