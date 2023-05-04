import axios from 'axios';
import { API_PREFIX } from '@/models/constants';

export const getSongByHash = (hash: string) => {
  return axios.get(`${API_PREFIX}/songs/${hash}`);
};

export const getSongEventsById = (song_id: number) => {
  return axios.get(`${API_PREFIX}/songs/${song_id}/events`);
};

export const getSongLikesById = (song_id: number) => {
  return axios.get(`${API_PREFIX}/songs/${song_id}/likes`);
};

export const getManySongsByHash = (song_hashes: string[]) => {
  return axios.put(`${API_PREFIX}/songs/getManyByHash`, { song_hashes: song_hashes });
};
