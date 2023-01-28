const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Enrolled = mongoose.model('Enrolled', new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  course: {
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
  }
},{
  timestamps: true,
}));

module.exports = Enrolled;
