import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const getSongByHash = (hash: string) => {
  return axios.get(`${API_PREFIX}/songs/${hash}`);
};
