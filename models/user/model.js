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
  password: {
    type: String
  },
  first: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 1,
  },
  last: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 1,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user','teacher','manager','admin']
  },
  profile:{
    type:String,
  },
  plan:{
    type:String,
    enum:['standard','unlimited'],
    default:'standard'
  },
  statistics:[{
    start:{type:Date},
    end:{type:Date}
  }],
  inClass:{
    type:Boolean,
  }
},{
  timestamps: true,
}));

module.exports = User;
