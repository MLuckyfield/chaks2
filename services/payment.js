const User = require('../models/user/model')
const stripe = require('stripe')('sk_test_09l3shTSTKHYCzzZZsiLl2vA');
const moment = require ('moment')

const oneTime = (teacher, student, date)=>{
      //stripe below
      const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
      //stripe above
}

module.exports={oneTime}
