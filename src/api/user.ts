import axios from 'axios';
import { API_PREFIX } from '@/models/constants';
import { User, UserSettingsData } from '@/models/common';

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

export const updateUser = (user_id: number, userData: Partial<User>) => {
  return axios.put(`${API_PREFIX}/users/${user_id}`, userData);
};

export const updateUserSettings = (user_id: number, userData: UserSettingsData) => {
  return axios.put(`${API_PREFIX}/users/${user_id}`, userData);
};
