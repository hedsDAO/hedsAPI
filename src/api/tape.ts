import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const getTapeById = (id: string) => {
  return axios.get(`${API_PREFIX}/tapes/${id}`);
};

export const getSongsByTapeId = (id: string) => {
  return axios.get(`${API_PREFIX}/tapes/${id}/songs`);
};

export const getAllTapes = () => {
  return axios.get(`${API_PREFIX}/tapes`);
};

export const getTapeCollectionArgs = () => {
  return axios.get(`${API_PREFIX}/tapes/get-collection-args`);
}

