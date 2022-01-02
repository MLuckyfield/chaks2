const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User', new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  // password: {
  //   type: String,
  //   required: true
  // },
  first: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
  },
  last: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 2,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user','admin','super']
  },
},{
  timestamps: true,
}));

module.exports = User;
