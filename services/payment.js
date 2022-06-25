const User = require('../models/user/model')
const stripe = require('stripe')(process.env.STRIPE);
const moment = require ('moment')
const router = require('express').Router();

//Create
router.post('/getId', async (req, res) => {
  // req=req.body
  console.log('getID was called')
  // console.log(req)
  //determine price based on product
  let price = ''
  switch (req.body.product) {
    case 'private_lesson':
      price=5000;
      break;
    default:
      price=0;
  }
  console.log(price)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: 'jpy',
    automatic_payment_methods: {enabled: true},
  });
  // console.log('and returned '+paymentIntent)
  return res.status(201).json({
    data: paymentIntent,
    message: 'Booking saved',
    success: true
  });

});

router.post('/getTransaction', async (req, res) => {
  // req=req.body
  console.log('acuiring transaction...')
  console.log(req.body)
  // let session='hi'
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
      // console.log('no issues')
      console.log(lineItems.data[0].price.product)
      lineItems = lineItems.data[0]
        let purchased = {}
        if('points' in lineItems.price.product.metadata){
          purchased = {$inc:{points:lineItems.price.product.metadata.points * lineItems.quantity}}
        }else if('plan' in lineItems.price.product.metadata){
          purchased = {plan:lineItems.price.product.metadata.plan}
        }
       console.log(purchased)
       console.log(req.body._id)
       // User.findByIdAndUpdate(req.body._id,{purchased}).then(()=>{
       //      return res.status(201).json({
       //        data: lineItems.price.product.metadata,
       //        message: 'Booking saved',
       //        success: true
       //      });
       //  }).catch((err)=>{
       //      return res.status(501).json({
       //        data: err,
       //        message: 'Booking saved',
       //        success: false
       //      });
       //  })
    })
});

module.exports=router;
