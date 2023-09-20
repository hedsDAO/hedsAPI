import express from 'express';
import functions from "firebase-functions";
import { validateTwitterHandle, validateUserByDisplayName} from '../controllers/utils/auth';
import { sendTwilioVerification, verifyTwilioCode } from '../controllers/auth';

const router = express.Router();

router.get('/validate-display-name/:displayName', async (req, res) => {
  const { displayName } = req.params;

  try {
    const validationResult = await validateUserByDisplayName(displayName);

    if (validationResult) {
      return res.status(200).json({ validated: true });
    } else {
      return res.status(400).json({ validated: false });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error', error: err.message });
  }
});

router.get('/validate-twitter/:twitterHandle', async (req, res) => {
  const { twitterHandle } = req.params;
  try {
    const validationResult = await validateTwitterHandle(twitterHandle);
    if (validationResult) {
      return res.status(200).json({ validated: true });
    } else {
      return res.status(400).json({ validated: false });
    }
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error', error: err.message });
    }
});

router.get("/sms/send/:to", async (req, res) => {
    const to = req.params.to;
    try {
      const verification = await sendTwilioVerification(to);
      functions.logger.log(verification?.status === 'pending');
      res.status(200).send("Verification code sent.");
    } catch (error) {
        console.log(error);
        res.status(500).send("There was an error sending your verification code.");
    }
});

router.get("/sms/verify/:to/:code", async (req, res) => {
    const to = req.params.to;
    const code = req.params.code;
    try {
      const verification = await verifyTwilioCode(to, code);
      if (verification?.status === "approved") {
          res.status(200).send("Verification approved.");
      } else {
          res.status(400).send("Verification denied. Try again.");
      }
    } catch (error) {
        res.send(500).send("There was an error verifying your code.");
    }
});

export default router;