const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Event = mongoose.model('Material', new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
},{
  timestamps: true,
}));

module.exports = Event;
