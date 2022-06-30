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
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object;
          // console.log(session)
          // console.log(session.metadata)
          // console.log(session.id)
          stripe.checkout.sessions.retrieve(session.id,{expand:['line_items.data.price.product']},(err,checkout)=>{
            // console.log(checkout.line_items.data)
            const metadata=checkout.line_items.data[0].price.product.metadata
            // console.log(metadata)
            let purchased = {}
            if('points' in metadata){
              purchased = {$inc:{points:metadata.points * checkout.line_items.data[0].quantity}}
            }else if('plan' in metadata){
              purchased = {plan:metadata.plan}
            }else if('sub_points'){purchased = {$inc:{points:metadata.sub_points * checkout.line_items.data[0].quantity}}}
            console.log('Order complete for: '+session.metadata.order)
            User.findByIdAndUpdate(session.metadata.order,purchased,{new:true}).then((result)=>{
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
          });

          // await stripe.checkout.sessions.listLineItems(
          //     session.id, {expand:['data.price.product']},(err,lineItems)=>{
          //       if(err){
          //         console.log(err)
          //         return res.status(501).json({
          //           data: err,
          //           message: 'Error',
          //           success: false
          //         });
          //       }
          //       console.log(lineItems)
          //       lineItems = lineItems.data[0]
          //         let purchased = {}
          //         if('points' in lineItems.price.product.metadata){
          //           purchased = {$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}}
          //         }else if('plan' in lineItems.price.product.metadata){
          //           purchased = {plan:lineItems.price.product.metadata.plan}
          //         }
          //        console.log(purchased)
          //        await stripe.checkout.sessions.retrieve(session.id).payment_intent
          //
          //     })
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }


})

router.post('/new', async (req, res)=>{
  // console.log(req)
  console.log(req.body.product)
  let line_items=[{
      price:req.body.product,
      quantity:1
    }]
  if(req.body.countable){line_items['adjustable_quantity']={enabled:true,minimum:1}}
  const paymentLink = await stripe.paymentLinks.create({
    line_items:line_items,
    metadata:{order:req.body.user},
    after_completion: {type: 'redirect', redirect: {url: 'https://chatshack.jp'}},

  })
  return res.status(201).json({
     data: paymentLink,
     message: 'Booking saved',
     success: true
   });
})

// // //Create
// router.post('/getId', async (req, res) => {
//   // req=req.body
//   console.log('getID was called')
//   // console.log(req)
//   //determine price based on product
// //   const product = await stripe.products.retrieve(
// //   req.body.product
// // );
//   let price = ''
//   switch (req.body.product) {
//     case 'private_lesson':
//       price=5000;
//       break;
//     default:
//       price=0;
//   }
//   console.log(price)
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: price,
//     currency: 'jpy',
//     automatic_payment_methods: {enabled: true},
//   });
//   // console.log('and returned '+paymentIntent)
//   return res.status(201).json({
//     data: paymentIntent,
//     message: 'Booking saved',
//     success: true
//   });
//
// });
//
// router.post("/create-payment-intent", async (req, res) => {
//   console.log('creating payment intent')
//   const { items } = req.body;
//
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 5000,
//     currency: "jpy",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });
//
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });
//how to get check out session id from front and process
// router.post('/getTransaction', async (req, res) => {
//   // req=req.body
//   console.log('acquiring transaction...')
//   // console.log(req)
//   // let session='hi'
//   await stripe.checkout.sessions.listLineItems(
//     req.body.transaction, {expand:['data.price.product']},(err,lineItems)=>{
//       if(err){
//         console.log(err)
//         return res.status(501).json({
//           data: err,
//           message: 'Error',
//           success: false
//         });
//       }
//       console.log(lineItems)
//       lineItems = lineItems.data[0]
//         let purchased = {}
//         if('points' in lineItems.price.product.metadata){
//           purchased = {$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}}
//         }else if('plan' in lineItems.price.product.metadata){
//           purchased = {plan:lineItems.price.product.metadata.plan}
//         }
//        // console.log(purchased)
//        // console.log(req.user.user_id)
//        User.findByIdAndUpdate(req.user.user_id,{$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}},{new:true}).then((result)=>{
//          console.log(result)
//             return res.status(201).json({
//               data: purchased,
//               message: 'Booking saved',
//               success: true
//             });
//         }).catch((err)=>{
//             return res.status(501).json({
//               data: err,
//               message: 'Booking saved',
//               success: false
//             });
//         })
//     })
// });

module.exports=router;
