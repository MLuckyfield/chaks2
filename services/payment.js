const User = require('../models/user/model')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();
const express = require('express');
const email = require('./email')

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
      let identifier={_id:session.metadata.order}
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
          updateUser(identifier,purchased,res)
          break;
        case 'checkout.session.completed': //update account with purchase
          console.log('updating account with purchase')
          await stripe.checkout.sessions.retrieve(session.id,{expand:['line_items.data.price.product']},(err,checkout)=>{
            const metadata=checkout.line_items.data[0].price.product.metadata
            // if('plan' in metadata){
            //   purchased={'$set':{
            //     plan:metadata.plan,
            //     stripe:{//to be removed
            //       plan_id:session.subscription,
            //       plan_status:'active',
            //       plan_start_date:new Date()
            //     }
            //   }
            // }
            //   console.log('add plan')
            //   User.findOneAndUpdate(identifier,purchased,{new:true}).then((result)=>{}).catch((err)=>{})
            // }
            if('sub_points' in metadata){
                let count = (metadata.sub_points* checkout.line_items.data[0].quantity)/30
                let units = []
                for(let i = 0;i<count;i++){
                  units.push({value:30})
                }
                purchased = {$push:{points:units}} //may need to multiple by quantity checkout.lineites
                console.log('add sub_points',units.length,session.customer)
                User.findOneAndUpdate(identifier,purchased,{new:true}).then((result)=>{}).catch((err)=>{})
                purchased={'$set':{
                  monthly_hours:checkout.line_items.data[0].quantity,
                }}
                updateUser(identifier,purchased,res)
              }
              console.log(session.metadata.order)
            console.log('Order complete for: '+session.metadata.order)
          });
          break;
        case 'invoice.payment_succeeded':
          console.log('invoice.payment_succeeded recieved:',session.customer,session.lines.data)
          identifier={'stripe.customer_id':session.customer}
          let units = []
          for(let i = 0;i<session.lines.data[0].quantity*2;i++){
            units.push({value:30})
          }
          // purchased = {$set:{points:units}}
          purchased={last:'hello'}
          console.log('will add',units)
          updateUser(identifier,purchased,res)
          break;
        case 'customer.subscription.updated':
          sub_type = session.items.data[0].price.product
          console.log('subscription update for',session.customer,session.items.data[0].price.product)
          //ENGULF BELOW IF STATEMENTS IN A CHECK FOR PRODUCT
          //add subscriptions field as array of objects, each object has subscription data
          //for existing subs, make cron script to transfer stripe object data to subcription array as object
          //
          //
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
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      console.log(identifier)
      console.log(purchased)

})
const updateUser=(user,update,res)=>{
  User.findOneAndUpdate(user,update,{new:true}).then((result)=>{
       console.log('updated:',result?result.first+' '+result.last+' '+result.points:'')
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
