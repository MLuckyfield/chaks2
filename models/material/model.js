const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = mongoose.model('Material', new Schema({
  name: {
    type: String,
    required: true,
  },
  category:{
    type:String,
  },
  sub_category:{
    type:String,
  },
  identifier:{
    type:String,
    unique: true    
  },
  level:{
    type:Number,
  },
},{
  timestamps: true,
}));

module.exports = Event;
