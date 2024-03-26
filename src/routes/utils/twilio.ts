import * as express from "express";
import {
  SMSRequest,
  bulkSMS,
  getAllPhoneNumbersFromEvents,
  getPhoneNumbers,
  getPhoneNumbersByEventId,
  sendSMS,
} from "../../controllers/utils/twilio";
import * as functions from "firebase-functions";

const router = express.Router();

/**
 * Send bulk SMS.
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

/**
 * Send SMS messages to all users from an event.
 *
 * @route POST /sendTextBlastForEvent
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/sendTextBlastForEvent", async (req, res) => {
  try {
    const phoneNumbers = await getPhoneNumbersByEventId(req.body.eventId);

    if (!phoneNumbers) {
      throw new Error("No phone numbers found for this event");
    }

    const smsRequest = new SMSRequest(phoneNumbers, req.body.message);

    const response = await bulkSMS(smsRequest);
    res.json({ message: response });
  } catch (error: any) {
    res.json({ message: error.message });
  }
});

/**
 * Send SMS messages to all users in the database.
 *
 * @route POST /sendMassTextBlast
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post("/sendMassTextBlast", async (req, res) => {
  try {
    const phoneNumbers = await getAllPhoneNumbersFromEvents();

    if (!phoneNumbers) {
      throw new Error("No phone numbers found for this event");
    }

    const smsRequest = new SMSRequest(phoneNumbers, req.body.message);

    const response = await bulkSMS(smsRequest);
    res.json({ message: response });
  } catch (error: any) {
    res.json({ message: error.message });
  }
});

/**
 * Send SMS messages to a list of recipients.
 *
 * @route POST /sendSMS
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 
 */
router.post("/sendSMS", async (req, res) => {
  try {
    functions.logger.log({
      recipients: req.body.recipients,
      message: req.body.message,
    });

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
 * Get phone numbers.
 *
 * @route POST /phoneNumbers
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
