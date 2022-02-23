"use strict";

var stripe = require('stripe')(process.env.secretKey);

var router = require("express")("Router");

router.post('/sub', function _callee(req, res) {
  var _req$body, email, payment_method, price, plan, customer, subscription, status, client_secret;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, payment_method = _req$body.payment_method, price = _req$body.price;
          console.log(price);

          if (price === "2") {
            plan = "price_1KQV3qIT6p7sbPTq9dyf157P";
            console.log(plan);
          } else if (price === "5") {
            plan = "price_1KQV5gIT6p7sbPTqlPwbvbyY";
            console.log(plan);
          } else {
            plan = "price_1KQV6DIT6p7sbPTqWUQmN8NP";
            console.log(plan);
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_settings: {
              default_payment_method: payment_method
            }
          }));

        case 5:
          customer = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(stripe.subscriptions.create({
            customer: customer.id,
            items: [{
              price: plan
            }],
            expand: ['latest_invoice.payment_intent']
          }));

        case 8:
          subscription = _context.sent;
          status = subscription['latest_invoice']['payment_intent']['status'];
          client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];
          res.json({
            'client_secret': client_secret,
            'status': status
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}); //payment of ideas

router.post('/pay', function _callee2(req, res) {
  var _req$body2, email, amount, paymentIntent;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, amount = _req$body2.amount;
          _context2.next = 3;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            // Verify your integration in this guide by including this parameter
            metadata: {
              integration_check: 'accept_a_payment'
            }
          }));

        case 3:
          paymentIntent = _context2.sent;
          res.json({
            'client_secret': paymentIntent['client_secret']
          });
          console.log(res);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
//# sourceMappingURL=stripe.dev.js.map
