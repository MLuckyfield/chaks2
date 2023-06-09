const mailchimp = require("@mailchimp/mailchimp_marketing");
const request = require('request')
const encrypt = require('crypto-js/md5')
const moment = require ('moment-timezone')
const constants = require('./constants')
const email = require('./email')


//triggered situations

//BASE FLOW
// request trial -> send confirmation
//     came for trial?
        // yes
        //    Signed Up?
        //    yes -> send welcome email
        //    no -> start experienced follow up
        // no -> start nonexperienced follow up
//FOLLOW UP FOLLOW
        // experienced?
        //   1. 1 day
        //   2. 3 days
        //   3. 1 week
        //   4. 2 week
        // non-experienced?
        //   1. 1 day
        //   2. 3 days
        //   3. 1 week
        //   4. 2 week
const addUser = async (details,tags,res)=>{
  request({
    url: 'https://us9.api.mailchimp.com/3.0/lists/cb86e9b6f5/members',
    json: {
        'email_address': details.email,
        'user': `anystring: ${process.env.MAILCHIMP_AUTH}`,
        'status': 'subscribed',
        'tags':tags,
        'merge_fields': {
            'FNAME': details.first,
            'LNAME': details.last,
            'KEY_DATE': `${details.year}-${details.month}-${details.day}`,
            'KEY_HOUR':details.hour
        }
    },
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `apikey ${process.env.MAILCHIMP_AUTH}`
    }
}, function(error, response, body){
  console.log('mailchimp error:',error)
  console.log('mailchimp body:',body)
      email.sendTrial(details.first+details.last,details.email,details.mobile,moment.utc(`${details.year}-${details.month}-${details.day}`).hour(details.hour),1,res)
    });
}

const addTag = async (user_email,tag,success,fail)=>{
  let mailchimp_hash = encrypt(user_email.toLowerCase()).toString()
  mailchimp.setConfig({
    apiKey:process.env.MAILCHIMP_AUTH,
    server:'us9'
  })
  try {
    const response = await mailchimp.lists.updateListMemberTags(
      'cb86e9b6f5',
      mailchimp_hash,
      {tags:[{name:tag,status:'active'}]}
    )
    success()
  } catch (e) {fail(e)}
}
const removeTag = async (user_email,tag)=>{
  let mailchimp_hash = encrypt(user_email.toLowerCase()).toString()
  mailchimp.setConfig({
    apiKey:process.env.MAILCHIMP_AUTH,
    server:'us9'
  })
  const response = mailchimp.lists.updateListMemberTags(
    'cb86e9b6f5',
    mailchimp_hash,
    {tags:[{name:tag,status:'inactive'}]}
  )
}
module.exports={
  addUser, addTag, removeTag
}
