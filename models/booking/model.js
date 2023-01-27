const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Booking = mongoose.model('Booking', new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
  },
  request:{
    type:String
  },
  status:{
    type:String,
    enum:['draft','available','reserved'],
    default:'draft'
  }
},{
  timestamps: true,
}));

module.exports = Booking;
