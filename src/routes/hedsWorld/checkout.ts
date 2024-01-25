import * as functions from 'firebase-functions';
import { Router } from 'express';
import { createCheckoutLink } from '../../controllers/hedsWorld/checkout';

const router = Router();

router.post('/create-checkout-link', async (req, res) => {
  try {
    const data = req.body;
    functions.logger.log('create-checkout-link');
    const results = await createCheckoutLink(data);
    return res.json(results);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
});

export default router;
