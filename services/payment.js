const User = require('../models/user/model')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();

// //Create
// router.post('/getId', async (req, res) => {
//   // req=req.body
//   console.log('getID was called')
//   // console.log(req)
//   //determine price based on product
//   const product = await stripe.products.retrieve(
//   req.body.product
// );
//   let price = ''
//   // switch (req.body.product) {
//   //   case 'private_lesson':
//   //     price=5000;
//   //     break;
//   //   default:
//   //     price=0;
//   // }
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

router.post('/getTransaction', async (req, res) => {
  // req=req.body
  console.log('acquiring transaction...')
  // console.log(req)
  // let session='hi'
  await stripe.checkout.sessions.retrieve(req.body.transaction,(err,item)=>console.log(item))
  await stripe.checkout.sessions.listLineItems(
    req.body.transaction, {expand:['data.price.product']},(err,lineItems)=>{
      if(err){
        console.log(err)
        return res.status(501).json({
          data: err,
          message: 'Error',
          success: false
        });
      }
      console.log(lineItems)
      lineItems = lineItems.data[0]
        let purchased = {}
        if('points' in lineItems.price.product.metadata){
          purchased = {$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}}
        }else if('plan' in lineItems.price.product.metadata){
          purchased = {plan:lineItems.price.product.metadata.plan}
        }
       // console.log(purchased)
       // console.log(req.user.user_id)
       User.findByIdAndUpdate(req.user.user_id,{$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}},{new:true}).then((result)=>{
         console.log(result)
            return res.status(201).json({
              data: purchased,
              message: 'Booking saved',
              success: true
            });
        }).catch((err)=>{
            return res.status(501).json({
              data: err,
              message: 'Booking saved',
              success: false
            });
        })
    })
});

module.exports=router;
