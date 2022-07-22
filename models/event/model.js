const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = mongoose.model('Event', new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  start: {
    type: Date,
    required:true
  },
  end: {
    type: Date,
    required: true,
  },
  entranceFee: {
    type: Number,
  },
  notes: [{
    type: String
  }],
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
