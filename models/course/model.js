const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Course = mongoose.model('Course', new Schema({
  name: [],
  description: [],
  thumbnail:{
    type:String
  },
  fee:{
    type:Number
  }
},{
  timestamps: true,
}));

module.exports = Course;
