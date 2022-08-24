const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = mongoose.model('Material', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category:{
    type:String,
  },
  sub_category:{
    type:String,
  },
  level:{
    type:Number,
  },
},{
  timestamps: true,
}));

module.exports = Event;
