
//MAILCHIMP EMAIL MARKETING
  //MAIN FLOW
  // 1. REQUEST TRIAL -- add 2 tags from the below to send trial confirmation
  const TRIAL_REQUESTED = 'trial_requested'
  const SERVICES = {
    english_inperson:'english_inperson',
    japanese_inperson:'japanese_inperson',
  }
 //
 // 2.CAME FOR TRIAL?
 //2. a) No show
 const TRIAL_NO_SHOW = 'trial_no_show' //1) survey reason 2) provide way to request trial again
 const TRIAL_NO_SHOW_3_DAYS = 'trial_no_show_3_days' //reminder to request trial again
 const TRIAL_NO_SHOW_1_Week = 'trial_no_show_1_week' //offer discount
 const TRIAL_NO_SHOW_2_Week = 'trial_no_show_2_weeks' //discount expires soon
 const ENGAGEMENT = 'engage' //we manually send blog articles to keep them engaged
 //2. b) Signed up?
 //2. b) i: YES
 const WELCOME = 'welcome' //send welcome email
 //2. b) ii: NO
 const TRIAL_COMPLETED = 'trial_completed' //1) ask for feedback 2) provide way to sign up again (no feature)
 const TRIAL_COMPLETED_3_DAYS = 'trial_no_show_3_days' //reminder to sign up
 const TRIAL_COMPLETED_1_Week = 'trial_completed_1_week' //offer discount
 const TRIAL_COMPLETED_2_Week = 'trial_completed_2_weeks' //discount expires soon
//we manually send blog articles to keep them engaged

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

module.exports = {
 TRIAL_REQUESTED,
 SERVICES,
 TRIAL_NO_SHOW,
 TRIAL_NO_SHOW_3_DAYS,
 TRIAL_NO_SHOW_1_Week,
 TRIAL_NO_SHOW_2_Week,
 TRIAL_COMPLETED,
 TRIAL_COMPLETED_3_DAYS,
 TRIAL_COMPLETED_1_Week,
 TRIAL_COMPLETED_2_Week,
 ENGAGEMENT,WELCOME
}
