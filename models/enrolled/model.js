const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Enrolled = mongoose.model('Enrolled', new Schema({
  student: {//6346840b683a491148a921d8
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {//63d4c68b3421e21c3a1db4a4
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  delivery:{
    type:String
  },
  status_date: {
    type: Date
  },
  status:{
    type:String,
    enum:['enrolled','active','complete'],
    default:'enrolled'
  },
  progress:{
    type:Number
  }
},{
  timestamps: true,
}));

module.exports = Enrolled;
