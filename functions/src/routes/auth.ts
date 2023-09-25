import * as express from 'express';
import * as functions from "firebase-functions";
import { validateTwitterHandle, validateUserByDisplayName} from '../controllers/utils/auth';
import { getGoogleUserData, sendTwilioVerification, verifyTwilioCode } from '../controllers/auth';
import { createUser, getUserByEmaill, getUserByPhoneNumber } from '../controllers/user';
import { newUserObject } from '../common';

const router = express.Router();

/**
 * Validate a given display name.
 *
 * @route GET /validate-display-name/:displayName
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
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

/**
 * Validate a given Twitter handle.
 *
 * @route GET /validate-twitter/:twitterHandle
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
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


/**
 * Send a verification code via SMS.
 *
 * @route GET /sms/send/:to
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
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

/**
 * Verify an SMS code.
 *
 * @route GET /sms/verify/:to/:code
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get("/sms/verify/:to/:code", async (req, res) => {
    const to = req.params.to;
    const code = req.params.code;
    try {
      const verification = await verifyTwilioCode(to, code);
      if (verification?.status === "approved") {
        const user = await getUserByPhoneNumber(to);
        if (user) {
          return res.status(200).json(user);
        } else {
          const createdUser = await createUser({...newUserObject, phone_number: to});
          return  res.status(200).json(createdUser);
        }
          
      } else {
          return res.status(400).send("Verification denied. Try again.");
      }
    } catch (error) {
        return res.send(500).send("There was an error verifying your code.");
    }
});

/**
 * Google OAuth callback handler.
 * Fetches user info using bearer token, 
 * then either retrieves or creates a user based on the email.
 *
 * @route GET /google-oauth-callback
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.get("/google-oauth-callback", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    functions.logger.log("token", bearerToken)

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new Error('Bearer token not found');
    }

    const token = bearerToken.split('Bearer ')[1];
    const userInfo = await getGoogleUserData(token);
    functions.logger.log("user info", userInfo)
    if (userInfo) {
      const email = userInfo['email'];
      const name = userInfo['name'];

      const user = await getUserByEmaill(email);
      functions.logger.log(user);
      if (user) {
        return res.json(user);
      } else {
        const createdUser = await createUser({...newUserObject, display_name: name, email});
        return res.json(createdUser);
      }

    } else {
      throw new Error('Invalid ID token userInfo');
    }
  } catch (e: any) {
     return res.status(400).json({message: 'Token verification failed',error: e});
  }
})

export default router;