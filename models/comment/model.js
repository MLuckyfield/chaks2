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
    required: true,
  },
},{
  timestamps: true,
}));

module.exports = Comment;
