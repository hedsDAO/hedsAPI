import * as express from "express";
import axios from "axios";
// import * as functions from "firebase-functions";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51OK9nqCNykh0hWhuaTS044ZlDBDZEt7VW0sk6B4V33xyBwTgMunIVAe55pWlr8ElzJKTW9O2Bwj4kfX9DMV1BBh000mBuH63Qe"
);

const router = express.Router();

// const YOUR_DOMAIN = "https://heds.space/event";

// router.post("/create-checkout-session", async (req, res) => {
//   const PRICE_ID_ONE = "price_1PLdbcCNykh0hWhuA3mi05lV";
//   const PRICE_ID_TWO = "price_1PLdbcCNykh0hWhuXOzkuP5z";
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: PRICE_ID_ONE,
//         quantity: 1,
//       },
//       {
//         price: PRICE_ID_TWO,
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     automatic_tax: { enabled: true },
//   });
//   functions.logger.info(session);
//   //   const success = session.return_url;
//   //   const cancel = session.cancel_url;

//   if (session.url) {
//     res.redirect(303, session.url);
//   }
//   //   if (success) {
//   //     res.redirect(303, success);
//   //   } else if (cancel) {
//   //     res.redirect(303, cancel);
//   //   }
// });

router.get("/verify-session/:sessionId/:userId/:eventId", async (req, res) => {
  try {
    const { userId, eventId, sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.json({ error: "Session not found" });
    } else {
      const paymentStatus = session.payment_status;
      if (paymentStatus === "paid") {
        const requestBodyPayload = {
          userId,
          status: "attending",
        };
        await axios.post(
          `https://gueststatus-v6adscuyxq-uc.a.run.app/events/${eventId}/rsvps`,
          requestBodyPayload
        );
        return res.json({ message: "Payment successful" });
      } else {
        return res.json({ message: "Payment not successful" });
      }
    }
  } catch (error: any) {
    return res.json({ error: error.message });
  }
});

export default router;
