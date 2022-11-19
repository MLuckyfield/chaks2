const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Site_Event = mongoose.model('Site_Event', new Schema({
  user: {//opinions from others
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event_type:{type:String}
},{
  timestamps: true,
}));

module.exports = Site_Event;
