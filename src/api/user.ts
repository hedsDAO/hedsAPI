import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const getUserByWallet = (wallet: string) => {
  return axios.get(`${API_PREFIX}/users/${wallet}`);
};

export const getUserSongsById = (user_id: number) => {
  return axios.get(`${API_PREFIX}/users/${user_id}/songs`);
};

export const getUserLikesById = (user_id: number) => {
  return axios.get(`${API_PREFIX}/users/${user_id}/likes`);
};

export const getUserEventsById = (user_id: number) => {
  return axios.get(`${API_PREFIX}/users/${user_id}/events`);
};
