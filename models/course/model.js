const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Course = mongoose.model('Course', new Schema({
  name: [],
  description: [],
  thumbnail:{
    type:String
  },
  lessons:[{
    id:{type:Number},
    content:[]
  }],
  delivery:[{
    type:String,
    enum:['online private','online group','in-person group']
  }],
  online_schedule:{
    repeats:{type:Number},
    timeslots:[{
      limit:{type:Number},
      month:{type:Number},
      day:{type:Number},
      start_hour:{type:Number},
      start_minute:{type:Number},
      end_hour:{type:Number},
      end_minute:{type:Number},
    }],
  },
  offline_schedule:{
    repeats:{type:Number},
    timeslots:[{
      limit:{type:Number},
      month:{type:Number},
      day:{type:Number},
      start_hour:{type:Number},
      start_minute:{type:Number},
      end_hour:{type:Number},
      end_minute:{type:Number},
    }],
  },
  stripe:{
    type:String
  }
},{
  timestamps: true,
}));

module.exports = Course;
