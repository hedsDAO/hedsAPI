import * as express from 'express';
import * as functions from 'firebase-functions';
import * as Twitter from 'twitter-v2';

export const authenticateTweet = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  functions.logger.log(req?.params, 'req params');
  if (req.params.tweetId) {
    const authorizedUser = () => {
      if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET || !process.env.TWITTER_ACCESS_KEY || !process.env.TWITTER_TOKEN_SECRET) {
        functions.logger.log('Missing Twitter API keys');
        return null;
      }
      const client = new Twitter.default({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_KEY,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET,
      });
      return client;
    };
    (async function () {
      const authUser = authorizedUser();
      if (authUser) {
        authUser
          .get('tweets', { ids: '' + req.params.tweetId })
          .then((response) => {
            res.locals.response = response;
            return next();
          })
          .catch(() => {
            return res.status(400);
          });
      }
    })();
  }
  return res.status(400);
};
