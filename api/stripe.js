const stripe = require('stripe')(process.env.secretKey);
const router=require("express")("Router");

router.post('/sub', async (req, res) => {
    const {email, payment_method,price} = req.body;
    var plan;
    console.log(price);
    if(price==="2"){
      plan="price_1KQV3qIT6p7sbPTq9dyf157P";
      
      console.log(plan);
    }
    else if(price==="5"){
      
      plan="price_1KQV5gIT6p7sbPTqlPwbvbyY";
      console.log(plan);
    }
     else{
      plan="price_1KQV6DIT6p7sbPTqWUQmN8NP";
      console.log(plan);

     }
  
    const customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      invoice_settings: {
        default_payment_method: payment_method,
      
        
      },
    });
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan}],
      expand: ['latest_invoice.payment_intent']
    });
    
    const status = subscription['latest_invoice']['payment_intent']['status'] 
    const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
  
    res.json({'client_secret': client_secret, 'status': status});
  })
  router.post('/pay', async (req, res) => {
    const {email,amount} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
})




  module.exports=router;
