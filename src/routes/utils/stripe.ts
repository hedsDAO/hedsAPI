import * as express from 'express';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51OK9nqCNykh0hWhuaTS044ZlDBDZEt7VW0sk6B4V33xyBwTgMunIVAe55pWlr8ElzJKTW9O2Bwj4kfX9DMV1BBh000mBuH63Qe');

const router = express.Router();

const YOUR_DOMAIN = 'https://heds.space/event';

router.post('/create-checkout-session', async (req, res) => {
  const PRICE_ID = 'price_1OK9nsCNykh0hWhuB0eyb4f3';
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: { enabled: true },
  });
  functions.logger.info(session);
//   const success = session.return_url;
//   const cancel = session.cancel_url;

  if (session.url) {
    res.redirect(303, session.url);
  }
//   if (success) {
//     res.redirect(303, success);
//   } else if (cancel) {
//     res.redirect(303, cancel);
//   }
});

export default router;
