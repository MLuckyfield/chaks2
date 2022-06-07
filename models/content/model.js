const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Blog = mongoose.model('Blog', new Schema({
  author: {//opinions from others
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  preview: {//opinions from others
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type:String,
    required:true
  },
  tags:[{
    type: String,
    enum:['','']
  }]
},{
  timestamps: true,
}));

module.exports = Blog;
