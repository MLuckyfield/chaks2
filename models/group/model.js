const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Group = mongoose.model('Group', new Schema({
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
  },
  status:{
    type:String,
    enum:['draft','available','requested','reserved','delivered'],
    default:'available'
  },
  segment:{
    type:String,
  },
  delivery:{
    type:String
  }
},{
  timestamps: true,
}));

module.exports = Group;
