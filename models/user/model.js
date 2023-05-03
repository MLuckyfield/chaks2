const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User', new Schema({
  //BASIC INFO------------------------------------------------
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  mobile:{
    type:Number
  },
  password: {
    type: String,
    required:true
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
  segment:{type:String},
  location:{type:String},
  //STUDENT DATA---------------------------------------------------
  profile:{
    likes:{type:String},
    goals:{type:String},
    personal:{type:String},
    level:{type:String,
          enum:['beginner','intermediate','advanced']
    },
    details:{type:String}
  },
  reward:{
    type:String,
    default:'Standard',
    enum:['Standard','Gold','Platinum','Diamond']
  },
  monthly_hours:{
    type:Number
  },
  plan:{
    type:String,
    default:'Standard',
  },
  stripe:{
    plan_id:{type:String},
    plan_status:{
      type:String,
      enum:['active','paused','to_cancel','cancelled']
    },
    plan_start_date:{type:Date},
    customer_id:{type:String}
  },
  subscriptions:[{
    name:{type:String},
    status:{type:String},
    start:{type:Date}
  }],
  points:[{
    value:{type:Number}
  }],
  statistics:[{
    start:{type:Date},
    end:{type:Date}
  }],
  fluency:{
    thinking:{
      type:Number,
      default:1
    },
    listening:{
      type:Number,
      default:1
    }
  },
  goals:[{
    ref:{//opinions from others
      type: Schema.Types.ObjectId,
      ref: 'Material'
    }
  }],
  progress:[{
    ref:{//opinions from others
      type: Schema.Types.ObjectId,
      ref: 'Material'
    },
    complete:{
      type:Boolean,
      default:false
    },
    goal:{
      type:Boolean,
    },
    success:{
      type:Number,
      default:0
    },
    fail:{
      type:Number,
      default:0
    }
  }],
  inClass:{
    type:Boolean,
    default:false
  },
  //TEACHER DATA-----------------------------------------------
  students:[{ //teacher field
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  online_schedule:[{
    day:{type:Number},
    start_hour:{type:Number},
    start_minute:{type:Number},
    end_hour:{type:Number},
    end_minute:{type:Number},
  }],
  active:{ //teacher field
    type:Boolean,
  },
  recovery:{
    code:{type: String},
    expiry:{type: Date}
  }
},{
  timestamps: true,
}));

module.exports = User;
