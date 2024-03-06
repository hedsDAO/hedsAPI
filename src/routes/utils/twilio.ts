import * as express from "express";
import {
  SMSRequest,
  bulkSMS,
  getPhoneNumbers,
  sendSMS,
} from "../../controllers/utils/twilio";
import * as functions from "firebase-functions";

const router = express.Router();

/**
 * Validate a given display name.
 *
 * @route POST /bulk
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/bulk", async (req, res) => {
  try {
    const bulkSMSRequest = new SMSRequest(
      req.body.recipients,
      req.body.message
    );
    const err = bulkSMSRequest.validate();
    if (err) {
      res.json({ message: err.message });
      return;
    }

    const response = await bulkSMS(bulkSMSRequest);
    res.json({ message: response });
  } catch (error: any) {
    res.json({ message: error.message });
  }
});

router.post("/sendSMS", async (req, res) => {
  try {
    functions.logger.log({
      recipients: req.body.recipients,
      message: req.body.message,
    });
    // const smsRequest = new SMSRequest(req.body.recipients, req.body.message);

    const response = await sendSMS({
      recipients: req.body.recipients,
      message: req.body.message,
    });
    res.json({ message: response });
  } catch (error: any) {
    res.json({ message: error.message });
  }
});

/**
 * Validate a given display name.
 *
 * @route POST /bulk
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get("/phoneNumbers", async (req, res) => {
  try {
    const response = await getPhoneNumbers();
    res.json(response);
  } catch (error: any) {
    res.json({ message: error.message });
  }
});

export default router;
