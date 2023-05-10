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

export const getManySongs = (song_hashes: string[]) => {
  return axios.get(`${API_PREFIX}/songs/get-many-songs/${song_hashes}`);
};

export const likeSong = (song_id: number, user_id: number) => {
  return axios.post(`${API_PREFIX}/songs/${song_id}/likes`, { user_id: user_id });
};

export const unlikeSong = (song_id: number, user_id: number) => {
  return axios.delete(`${API_PREFIX}/songs/${song_id}/likes`, { data: { user_id: user_id } });
};
