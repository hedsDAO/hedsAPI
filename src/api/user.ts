import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const getUserByWallet = (wallet: string) => {
  return axios.get(`${API_PREFIX}/users/${wallet}`);
};
