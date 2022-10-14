const User = require('../models/user/model')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();
const express = require('express');

const HODAI_LIVE=''
const PREMIUM_LIVE=''
const HODAI_TEST='price_1LDp5RBVAfieqaob33XKdjl2'
const PREMIUM_TEST='price_1LY1UlBVAfieqaobWDpvBnCj'

router.post('/complete', express.raw({type:'application/json'}),async (req, res)=>{
      const sig = req.headers['stripe-signature'];

      const endpointSecret = 'whsec_WMV26QjDzHbLq14UmcbD7mCCEQ2RXvUD'

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
      //after going through switch statement, update
      let identifier={_id:session.metadata.order}

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed': //update account with purchase

          console.log('updating account with purchase')
          await stripe.checkout.sessions.retrieve(session.id,{expand:['line_items.data.price.product']},(err,checkout)=>{
            const metadata=checkout.line_items.data[0].price.product.metadata
            console.log('points' in metadata)
            console.log('plan' in metadata)
            console.log('sub_points' in metadata)
            const price_id=session.items.data[0].price.product
            if('points' in metadata){
              purchased = {$inc:{points:metadata.points * checkout.line_items.data[0].quantity}}
              console.log('adding points')}
            if('plan' in metadata){
              purchased = {
                  plan:metadata.plan,
                  stripe:{
                    plan_id:session.subscription,
                    plan_status:'active',
                    plan_start_date:new Date()
                  }
              }
              console.log('add plan')
            }
            if('sub_points' in metadata){
                let count = metadata.sub_points/60
                let units  []
                for(let i = 0;i<count;i++){
                  units.push({value:60})
                }
                purchased = {$inc:{points:metadata.sub_points * checkout.line_items.data[0].quantity}}
                console.log('add sub_points')
              }
              console.log(session.metadata.order)
              updateUser(identifier,purchased,res)
            console.log('Order complete for: '+session.metadata.order)
          });
          break;
        case 'customer.subscription.updated':
          console.log(session.pause_collection)
          console.log('Relevant product',session.items.data[0].price.product)
          if(session.cancel_at_period_end){ //cancellation expected
            purchased = {
                $set:{
                  stripe:{
                    plan_status:'to_cancel',
                }}
            }
          }else if(session.pause_collection){ //pause subscription
            purchased = {
                $set:{
                  plan:'standard',
                  stripe:{
                    plan_status:'paused',
                    plan_start_date:session.pause_collection.resumes_at,
                }}
            }
          }else if(session.pause_collection==null){ //continue subscription
            purchased = {
                $set:{
                  plan:'unlimited',
                  stripe:{
                    plan_status:'active',
                    plan_start_date:new Date(),
                }}
            }
          }
          identifier={stripe:{customer_id:session.customer}}
          updateUser(identifier,purchased,res)
          break;
        case 'customer.subscription.deleted':
          purchased = {
              $set:{
                plan:'standard',
                stripe:{
                  plan_status:'cancelled',
                  plan_start_date:new Date(),
              }}
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
       console.log(result)
          return res.status(201).json({
            data:result,
            message: 'Booking saved',
            success: true
          });
      }).catch((err)=>{
        console.log(err)
          return res.status(501).json({
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
      quantity:1,
      adjustable_quantity:{enabled:true,minimum:1,maximum:100},
    }
  if(req.body.countable){line_items['adjustable_quantity']={enabled:true,minimum:1}}
  const paymentLink = await stripe.paymentLinks.create({
    line_items:[line_items],
    metadata:{order:req.body.user},
    // payment_intent_data:{setup_future_usage:'off_session'},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp'}},
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
