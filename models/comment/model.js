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
    type:String
  },
  end:{
    type:Date
  }
},{
  timestamps: true,
}));

module.exports = Comment;
