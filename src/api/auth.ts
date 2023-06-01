import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const verifyTweet = (tweetId: string, twitterHandle: string, userHash: string) => {
  return axios.get(`${API_PREFIX}/auth/validate-twitter/${tweetId}/${twitterHandle}/${userHash}`);
};

export const verifyDisplayName = (displayName: string) => {
  return axios.get(`${API_PREFIX}/auth/validate-display-name/${displayName}`);
};
