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
  points:{
    type:Number,
    default:0
  },
  statistics:[{
    start:{type:Date},
    end:{type:Date}
  }],
  fluency:{
    thinking:[{
      type:Number
    }],
    listening:[{
      type:Number
    }]
  },
  goals:[{
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
      type:Number
    },
    fail:{
      type:Number
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
      type:Number
    },
    fail:{
      type:Number
    }
  }],
  students:[{ //teacher field
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  inClass:{
    type:Boolean,
    default:false
  },
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
