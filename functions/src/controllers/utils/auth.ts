import * as Twitter from 'twitter-v2';
import { pool } from '../../database';

export const authenticateTweet = async (tweetId: string): Promise<any> => {
  if (!process.env.TWITTER_CONSUMER_KEY ||  !process.env.TWITTER_CONSUMER_SECRET  || !process.env.TWITTER_ACCESS_KEY || !process.env.TWITTER_TOKEN_SECRET) {
    throw new Error('Missing Twitter API keys');
  }

  const client = new Twitter.default({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET,
  });

  try {
    const response = await client.get('tweets', { ids: tweetId });
    return response;
  } catch (error: any) {
    throw new Error(`Failed to get tweets: ${error.message}`);
  }
};

export const validateTwitterHandle = async (twitterHandle: string, userHash: string, response: any): Promise<boolean> => {
  try {
    const { rowCount } = await pool.query(
      `SELECT 1 FROM heds.users WHERE twitter_handle = $1`,
      [twitterHandle]
    );

    if (rowCount > 0) {
      throw new Error("Twitter handle already exists in the database");
    } else if (response?.data?.[0]?.text?.split('HDS')[1] === userHash) {
      return true;
    } else {
      throw new Error("Twitter handle not found in the database");
    }
  } catch (error: any) {
    throw new Error(`Failed to validate Twitter handle: ${error.message}`);
  }
};