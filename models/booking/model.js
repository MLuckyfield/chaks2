const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Booking = mongoose.model('Booking', new Schema({
  student: {//opinions from others
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  teacher:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
  },
},{
  timestamps: true,
}));

module.exports = Booking;
