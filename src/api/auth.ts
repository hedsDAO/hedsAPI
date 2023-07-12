import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const verifyTweet = (twitterHandle: string) => {
  return axios.get(`${API_PREFIX}/auth/validate-twitter/${twitterHandle}`);
};

export const verifyDisplayName = (displayName: string) => {
  return axios.get(`${API_PREFIX}/auth/validate-display-name/${displayName}`);
};
