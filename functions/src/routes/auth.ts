import * as express from 'express';
import { authenticateTweet, validateTwitterHandle } from '../controllers/utils/auth';

const router = express.Router();

router.get('/:tweetId/:twitterHandle/:userHash', async (req, res) => {
  const { tweetId, twitterHandle, userHash } = req.params;

  try {
    const response = await authenticateTweet(tweetId);
    const validationResult = await validateTwitterHandle(twitterHandle, userHash, response);

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

export default router;