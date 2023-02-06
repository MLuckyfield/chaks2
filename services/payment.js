const User = require('../models/user/model')
const Enrolled = require('../models/enrolled/api')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();
const express = require('express');
const email = require('./email')
const mailchimp = require("@mailchimp/mailchimp_marketing");
const encrypt = require('crypto-js/md5')

const HODAI_LIVE=''
const PREMIUM_LIVE=''
const HODAI_TEST='price_1LDp5RBVAfieqaob33XKdjl2'
const PREMIUM_TEST='price_1LY1UlBVAfieqaobWDpvBnCj'

router.post('/complete', express.raw({type:'application/json'}),async (req, res)=>{
      const sig = req.headers['stripe-signature'];

      const endpointSecret = 'whsec_67c1ZI0hKYLtAxJC3cVC3esehowFEz6J'

      let event;
      console.log('starting payment...')
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('try was successful')
      } catch (err) {
        console.log('failed')
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      const session = event.data.object;
      console.log('event recieved from Stripe ' + event.type)
      let purchased = {}
      let sub_type=''
      //after going through switch statement, update
      let identifier=''
      let metadata = session.metadata
      // console.log(session)

      // Handle the event
      switch (event.type) {
        case 'customer.created'://untested
          let new_customer = session.id
          console.log('new customer create request',session.id,sub_type)
          purchased = {
              // $set:{
                stripe:{
                  customer_id:new_customer,
                }
              // }
          }
          identifier={email:session.email}
          updateUser(identifier,purchased,res)
          break;
        case 'customer.subscription.created'://untested
          sub_type = session.items.data[0].price.product
          console.log('new subscription for',session.id,sub_type)
          purchased = {
              $push:{
                subscriptions:{
                  name:sub_type,
                }
              }
          }
          identifier={stripe:{customer_id:session.customer}}
          //update tag with active

          User.findOne(identifier).then((user)=>{
            console.log('user newly subscribed',user)
            let mailchimp_hash = encrypt(user.email.toLowerCase()).toString()

            mailchimp.setConfig({
              apiKey:process.env.MAILCHIMP_AUTH,
              server:'us9'
            })
            const response = mailchimp.lists.updateListMemberTags(
              'cb86e9b6f5',
              mailchimp_hash,
              {tags:[{name:'active',status:'active'},{name:'inactive',status:'inactive'}]}
            ).then(()=>{updateUser(identifier,purchased,res)})
             .catch(()=>{updateUser(identifier,purchased,res)})
          })

          break;
        case 'invoice.payment_succeeded':
          console.log('invoice.payment_succeeded recieved')
          identifier={'stripe.customer_id':session.customer}
          let units = []
          for(let i = 0;i<session.lines.data[0].quantity*2;i++){
            units.push({value:30})
          }
          purchased = {$push:{points:{$each:units}}}
          updateUser(identifier,purchased,res)
          break;
        case 'customer.subscription.updated':
          sub_type = session.items.data[0].price.product
          console.log('subscription update for',session.customer,session.items.data[0].price.product)
          //ENGULF BELOW IF STATEMENTS IN A CHECK FOR PRODUCT
          //add subscriptions field as array of objects, each object has subscription data
          //for existing subs, make cron script to transfer stripe object data to subcription array as object

          if(session.cancel_at_period_end){ //cancellation expected
            purchased = {
                // $set:{
                //   stripe:{
                //     plan_status:'to_cancel',
                // },
                'subscriptions.$':{
                    status:'to_cancel'
                }
              // }
            }
          }else if(session.pause_collection){ //pause subscription
            purchased = {
                // $set:{
                //   plan:'standard',
                //   stripe:{
                //     plan_status:'paused',
                //     plan_start_date:session.pause_collection.resumes_at,
                // },
                'subscriptions.$':{
                    status:'paused',
                    start:session.pause_collection.resumes_at,
                }
              // }
            }
          }else if(session.pause_collection==null){ //continue subscription
            purchased = {
                // $set:{
                  // plan:'premium',
                  // 'stripe.plan_status':'active',
                  // 'stripe.plan_start_date':new Date(),
                  'subscriptions.$':{
                      status:'active',
                      start:new Date(),
                  }
              // }
            }
          }
          identifier={stripe:{customer_id:session.customer},'subscriptions.name':sub_type}
          updateUser(identifier,purchased,res)
          break;
        case 'customer.subscription.deleted':
          purchased = {
              // $set:{
                // plan:'premium',
                // 'stripe.plan_status':'active',
                // 'stripe.plan_start_date':new Date(),
                'subscriptions.$':{
                    status:'deactivated',
                    start:new Date(),
                }
            // }
          }
          identifier={stripe:{customer_id:session.customer}}
          updateUser(identifier,purchased,res)
          break;
        case 'checkout.session.complete':
          let payment_link = stripe.paymentLinks.listLineItems(session.payment_link)
          console.log('course payment:',payment_link)
          let course = payment_link.line_items.data[0].price.product
          let delivery = payment_link.metadata
          //metadata must have ._id,channel,type
          identifier={stripe:{customer_id:session.customer}}
          if(delivery.type=='course'){
            User.findOne(identifier)
                .then((user)=>{
                  console.log('course payment, found user',user.first,user.last)
                    purchased = {
                      student:user._id,
                      course:delivery._id,
                      delivery:delivery.channel,
                      status_date:new Date(),
                      status:'enrolled'
                    }
                    console.log('course payment: will upload:',purchased)
                    try{
                       new Enrolled(purchased).save()
                        .then(()=>{
                          console.log('Course payment: Enrolled success')
                          return res.status(201).json({
                            message: `Success!`,
                            success: true
                          });
                        })
                    }
                   catch(err){
                     console.log('Course payment: Enrolled failed')
                     return res.status(500).json({
                       message: `user creation unsuccessful: ${err}`,
                       success: false
                     });
                    }
                })
          }else{console.log('payment ignored, not a course')}
        break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      console.log(identifier)
      console.log(purchased)

})
const updateUser=(user,update,res)=>{
  User.findOneAndUpdate(user,update,{new:true}).then((result)=>{
          return res.status(201).json({
            message: 'Booking saved',
            success: true
          });
      }).catch((err)=>{
        console.log('payment issue',err)
          return res.status(501).json({
            data:err,
            message: 'Booking saved',
            success: false
          });
      })
}
router.post('/course', async (req, res)=>{
  // console.log(req)
  // console.log(req.body.product)
  let line_items={
      price:req.body.product,
      quantity:1,
    }
  const paymentLink = await stripe.paymentLinks.create({
    line_items:[line_items],
    allow_promotion_codes:true,
    // payment_intent_data:{setup_future_usage:'off_session'},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp/account'}},
  })
  // console.log('preparing payment link',paymentLink)
  return res.status(201).json({
     data: paymentLink,
     message: 'Booking saved',
     success: true
   });
})
router.post('/new', async (req, res)=>{
  // console.log(req)
  // console.log(req.body.product)
  let line_items={
      price:req.body.product,
      quantity:2,
      adjustable_quantity:{enabled:true,minimum:2,maximum:99},
    }
  if(req.body.countable){line_items['adjustable_quantity']={enabled:true,minimum:1}}
  const paymentLink = await stripe.paymentLinks.create({
    line_items:[line_items],
    allow_promotion_codes:true,
    metadata:{order:req.body.user},
    // payment_intent_data:{setup_future_usage:'off_session'},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp/account'}},
  })
  // console.log('preparing payment link',paymentLink)
  return res.status(201).json({
     data: paymentLink,
     message: 'Booking saved',
     success: true
   });
})
//fixed via email
router.post('/fixed', async (req, res)=>{
  // console.log(req)
  // console.log(req.body.product)
  let line_items={
      price:req.body.product,
      quantity:req.body.countable,
      adjustable_quantity:{enabled:true,minimum:req.body.countable,maximum:99},
    }
  const paymentLink = await stripe.paymentLinks.create({
    line_items:[line_items],
    allow_promotion_codes:true,
    metadata:{order:req.body.user},
    // payment_intent_data:{setup_future_usage:'off_session'},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp/account'}},
  })
  // console.log('preparing payment link',paymentLink)
  return res.status(201).json({
     data: paymentLink,
     message: 'Booking saved',
     success: true
   });
})
//upgrade or downgrade the subscription
router.post('/update_sub', async (req, res)=>{
  req=req.body
  User.findById(req).then((user)=>{
    const sub_id=user.plan.stripe_id
    let price_id=''
    let plan = ''
    if(action=='upgrade'){price_id=HODAI_TEST;plan='unlimited'}
    else if (action=='downgrade') {price_id=PREMIUM_TEST;plan='premium'}
    stripe.subscriptions.retrieve(sub_id)
      .then((subscription)=>{
        stripe.subscriptions.update(sub_id, {
          cancel_at_period_end: false,
          items: [{
            id: subscription.items.data[0].id,
            price: price_id,
          }]
        });
      });
    updateUser(req,{plan:plan},res)
  })
})
router.post('/charge', async (req, res)=>{

    await stripe.prices.create({
      unit_amount: req.duration*req.rates,
      currency: 'jpy',
      product: 'prod_MBBrK8yIna6ImD',
    }).then((price)=>{
      stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        line_items: [
          {price: price.id, quantity: 1},
        ],
        mode: 'payment',
        customer:req.user.stripe_id, //doesnt exist
        metadata:{order:req.body.user},
      }).then((session)=>{
        return res.status(201).json({
           message: 'Charged!',
           success: true
         });
      }).catch((err)=>{
        return res.status(201).json({
           message: 'Could not charge',
           success: false
         });
      });
    });
})
module.exports=router;
