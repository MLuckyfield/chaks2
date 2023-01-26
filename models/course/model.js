const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Course = mongoose.model('Course', new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
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
