import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const verifyTweet = (tweetId: string, twitterHandle: string, userHash: string) => {
  return axios.get(`${API_PREFIX}/auth/${tweetId}/${twitterHandle}/${userHash}`);
};