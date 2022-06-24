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

  const session = await stripe.checkout.sessions.retrieve(
    req.body.transaction
  );
  console.log(session)
  // console.log('and returned '+paymentIntent)
  return res.status(201).json({
    data: session,
    message: 'Booking saved',
    success: true
  });

});

module.exports=router;
