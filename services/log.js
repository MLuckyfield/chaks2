
const Log = require('../models/log/model')

const saveUserAction=(action,error,first,last,user_id)=>{
  new Log({
    tag:'USER',
    action:action,
    error:error,
    first:first,
    last:last,
    user_id:user_id
  }).save()
}

const savePaymentAction=(action,error,stripe_cus_id)=>{
  new Log({
    tag:'PAYMENT',
    action:action,
    error:error,
    first:first,
    last:last,
    user_id:user_id
  }).save()
}
const saveEmailAction=(action,error,first,last,user_id)=>{
  new Log({
    tag:'EMAIL',
    action:action,
    error:error,
    first:first,
    last:last,
    user_id:user_id
  }).save()
}
const saveCronAction=(action,error)=>{
  new Log({
    tag:'CRON',
    action:action,
    error:error,
    first:first,
    last:last,
    user_id:user_id
  }).save()
}
module.exports = {saveUserAction,savePaymentAction,saveEmailAction,saveCronAction}
