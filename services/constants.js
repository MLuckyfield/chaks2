
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
 const TRIAL_NO_SHOW = 'trial_no_show' //1) ask for feedback 2) provide way to sign up again (no feature)
 const TRIAL_NO_SHOW_1_Week = 'trial_no_show_1_week' //link to some blogs about why learning english is useful
 const TRIAL_NO_SHOW_2_Week = 'trial_no_show_2_week' //offer discount
 const ENGAGEMENT = 'engagement' //we manually send blog articles to keep them engaged
 //2. b) Signed up?
 //2. b) i: YES
 const WELCOME = 'welcome' //send welcome email
 //2. b) ii: NO
 const TRIAL_COMPLETED = 'trial_completed' //1) ask for feedback 2) provide way to sign up again (no feature)
 const TRIAL_COMPLETED_1_Week = 'trial_completed_1_week' //link to some blogs about why learning english is useful
 const TRIAL_COMPLETED_2_Week = 'trial_completed_2_week' //offer discount
 const ENGAGEMENT = 'engagement' //we manually send blog articles to keep them engaged

 //ONE-TIME TRIGGERED
 //your first comment is ready!


module.exports = {

}
