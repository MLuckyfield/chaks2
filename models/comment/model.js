const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Comment = mongoose.model('Comment', new Schema({
  author: {//opinions from others
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  student: {//opinions from others
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comment: {
    type: String,
  },
  channel:{
    type:String,
    enum:['online','in-person'],
    default:'in-person'
  },
  status:{
    type:String,
    enum:['pending','draft','approved'],
    default:'pending'
  },
  end:{
    type:Date
  },
  trial:{
    type:Boolean
  }
},{
  timestamps: true,
}));

module.exports = Comment;
