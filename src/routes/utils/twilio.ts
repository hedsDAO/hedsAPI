import * as express from 'express';
import { SMSRequest, bulkSMS, getPhoneNumbers } from '../../controllers/utils/twilio';

const router = express.Router();

/**
 * Validate a given display name.
 *
 * @route POST /bulk
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/bulk', async (req, res) => {
  try {
    const bulkSMSRequest = new SMSRequest(req.body.recipients, req.body.message);
    const err = bulkSMSRequest.validate();
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    const response = await bulkSMS(bulkSMSRequest);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * Validate a given display name.
 *
 * @route POST /bulk
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get('/phoneNumbers', async (req, res) => {
  try {
    const response = await getPhoneNumbers();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
