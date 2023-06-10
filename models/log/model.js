const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Log = mongoose.model('Log', new Schema({
  tag: {
    type: String,//user, payment, or cron
  },
  action:{
    type:String,
  },
  error:{
    type:String
  },
  //USER log
  first:{
    type:String,
  },
  last:{
    type:String
  },
  user_id:{
    type:String
  },
  //PAYMENT log
  stripe_cus_id:{
    type:String,
  },
},{
  timestamps: true,
}));

module.exports = Log;
