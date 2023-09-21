import * as express from 'express';
import axios from "axios";
import * as functions from "firebase-functions";
import { validateTwitterHandle, validateUserByDisplayName} from '../controllers/utils/auth';
import { sendTwilioVerification, verifyTwilioCode } from '../controllers/auth';
import { createUser, getUserByEmaill } from '../controllers/user';

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

router.get("/google-oauth-callback", async (req, res) => {
  try {
    const bearerToken = req.headers.authorization;
    functions.logger.log("token", bearerToken)

    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new Error('Bearer token not found');
    }

    const token = bearerToken.split('Bearer ')[1];
    const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const userInfo = userInfoResponse.data;
    functions.logger.log("user info", userInfo)
    if (userInfo) {
      const email = userInfo['email'];
      const name = userInfo['name'];

      // Now you have the user's details, here you would typically check if the user exists in your DB
      // and if not create a new user record.
      const user = await getUserByEmaill(email);
      functions.logger.log(user);
      if (user) {
        return res.json(user);
      } else {
        const newUser = {
          profile_picture: "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc",
          banner: "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3",
          display_name: name,
          role: "user",
          joined: new Date().getMilliseconds(),
          email
        };

        const createdUser = await createUser(newUser);
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