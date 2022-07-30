const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = mongoose.model('Event', new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  repeats: {
    day:{type:Number},
    week:{type:Number}
  },
  entranceFee: {
    type: Number,
  },
  drinkRequired:{
    type:Boolean
  },
  image:{type:String},
  description:[],
  keypoints:[],
  active:{
    type: Boolean
  }
},{
  timestamps: true,
}));

module.exports = Event;
