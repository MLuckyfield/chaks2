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
  },
  request:{
    type:String
  },
  status:{
    type:String,
    enum:['draft','available','requested','reserved','delivered'],
    default:'available'
  },
  //trial info only
  first:{
    type:String
  },
  last:{
    type:String
  },
  email:{
    type:String
  },
  mobile:{
    type:Number
  },
  trial:{
    type:Boolean,
  },
  segment:{
    type:String,
  },
},{
  timestamps: true,
}));

module.exports = Booking;
