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
  return axios.get(`${API_PREFIX}/songs/many-songs`, {
    params: {
      songHashes: song_hashes.join(','),
    },
  });
};

export const likeSong = (song_id: number, user_id: number) => {
  return axios.post(`${API_PREFIX}/songs/${song_id}/likes`, { user_id: user_id });
};

export const unlikeSong = (song_id: number, user_id: number) => {
  return axios.delete(`${API_PREFIX}/songs/${song_id}/likes`, { data: { user_id: user_id } });
};

export const createSubmission = (tempAudioRef: string, user_id: number, tape_id: number, duration: number) => {
  return axios.post(`${API_PREFIX}/songs`, { tempAudioRef, user_id, tape_id, duration });
};

export const deleteSubmission = (id: number) => {
  return axios.delete(`${API_PREFIX}/songs/${id}`);
}