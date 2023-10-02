import * as express from 'express';
import * as functions from "firebase-functions";
import { getGoogleUserData, sendTwilioVerification, verifyTwilioCode , validateUserByDisplayName, validateTwitterHandle} from '../../controllers/app/auth';
import { createUser, getUserByEmaill, getUserByPhoneNumber } from '../../controllers/app/user';
import { newUserObject } from '../../common';

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
      return res.status(200).json({ displayNameExists: true });
    } else {
      return res.status(400).json({ displayNameExists: false });
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
router.get('/validate-twitter/:twitter_handle', async (req, res) => {
  const { twitter_handle } = req.params;
  try {
    const validationResult = await validateTwitterHandle(twitter_handle);
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

      const user = await getUserByEmaill(email);
      functions.logger.log(user);
      if (user) {
        return res.json(user);
      } else {
        const createdUser = await createUser({...newUserObject, email});
        return res.status(200).json(createdUser);
      }

    } else {
      throw new Error('Invalid ID token userInfo');
    }
  } catch (e: any) {
     return res.status(400).json({message: 'Token verification failed',error: e});
  }
})

/**
 * Link an existing user with an email via Google OAuth or phoneNumber via SMS.
 *
 * @route PUT /link/:link-user
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
 router.put("/link-user", async (req, res) => {
  const { link_type, user } = req.body;

  try {
    if (!user) {
      return res.status(404).json({ message: "Missing User Data" });
    }

    if (link_type === "email") {
      const bearerToken = req.headers.authorization;

      if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        throw new Error('Bearer token not found');
      }

      const token = bearerToken.split('Bearer ')[1];
      const userInfo = await getGoogleUserData(token);

      if (userInfo) {
        const email = userInfo['email'];

        const existingUser = await getUserByEmaill(email);

        if (existingUser) {
          return res.status(400).json({ message: "Email is already associated with another user" });
        }

        if (user.email) {
          return res.status(400).json({ message: "User already has an email linked" });
        }

        user.email = email;
        const createdUser = await createUser({...newUserObject, email});
        return res.status(200).json(createdUser);

      } else {
        throw new Error('Invalid ID token userInfo');
      }

    } else if (link_type === "phoneNumber") {
      const { phone_number } = req.body;

      const existingUser = await getUserByPhoneNumber(phone_number);

      if (existingUser) {
        return res.status(400).json({ message: "Phone number is already associated with another user" });
      }

      if (user.phone_number) {
        return res.status(400).json({ message: "User already has a phone number linked" });
      }

      await sendTwilioVerification(phone_number);
      return res.status(200).send("Verification code sent.");
    } else {
      return res.status(400).json({ message: "Invalid link type" });
    }

  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", error: error.message });
  }
});


export default router;