const User = require('../models/user/model')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();
const express = require('express');

//
router.post('/complete', express.raw({type:'application/json'}),async (req, res)=>{
      const sig = req.headers['stripe-signature'];

      const endpointSecret = 'whsec_mPoy6PX9sbrSSlSJFOVN2mNMelFUlXro'

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.log('failed')
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      const session = event.data.object;
      console.log('event recieved from Stripe')
      let purchased = {}
      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed': //update account with purchase
          console.log(session.subscription)
          // console.log(session.metadata)
          // console.log(session.id)
          stripe.checkout.sessions.retrieve(session.id,{expand:['line_items.data.price.product']},(err,checkout)=>{
            // console.log(checkout.line_items.data)
            const metadata=checkout.line_items.data[0].price.product.metadata
            // console.log(metadata)

            if('points' in metadata){
              purchased = {$inc:{points:metadata.points * checkout.line_items.data[0].quantity}}
            }else if('plan' in metadata){
              purchased = {
                  plan:metadata.plan,
                  stripe:{
                    plan_id:session.subscription,
                    plan_status:'active',
                    plan_start_date:new Date()
                  }
              }
            }else if('sub_points'){purchased = {$inc:{points:metadata.sub_points * checkout.line_items.data[0].quantity}}}
            console.log('Order complete for: '+session.metadata.order)
          });
          break;
        case 'customer.subscription.updated':
          console.log(session)
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
          }else if(!session.pause_collection){ //continue subscription
            purchased = {
                $set:{
                  plan:'unlimited',
                  stripe:{
                    plan_status:'active',
                    plan_start_date:new Date(),
                }}
            }
          }
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
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      //after going through switch statement, update
      let identifier={}
      if(session.customer){
        identifier={
          stripe:{
            customer_id:session.customer
          }
        }
      }
      else{
        identifier={_id:session.metadata.order}
      }
      User.findOneAndUpdate(identifer,purchased,{new:true}).then((result)=>{
           console.log(result)
              return res.status(201).json({
                message: 'Booking saved',
                success: true
              });
          }).catch((err)=>{
              return res.status(501).json({
                message: 'Booking saved',
                success: false
              });
          })
})

router.post('/new', async (req, res)=>{
  // console.log(req)
  // console.log(req.body.product)
  let line_items={
      price:req.body.product,
      quantity:1
    }
  if(req.body.countable){line_items['adjustable_quantity']={enabled:true,minimum:1}}
  const paymentLink = await stripe.paymentLinks.create({
    line_items:[line_items],
    metadata:{order:req.body.user},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp'}},

  })
  return res.status(201).json({
     data: paymentLink,
     message: 'Booking saved',
     success: true
   });
})

module.exports=router;
