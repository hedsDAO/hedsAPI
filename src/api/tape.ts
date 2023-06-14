import axios from 'axios';
import { API_PREFIX } from '@/models/constants';
import { Timeline } from '@/models/common';

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
};

interface Tape {
  name: string;
  description: string;
  bpm: number;
  timeline: Timeline;
  type: string;
}

interface Song {
  duration: number;
  track_name: string;
  song_type: string;
  submission_data?: any;
  cyanite_id: string;
  track_data: { tape_name: string };
}

interface TapePayload {
  coverImage: string;
  sampleAudio: string;
  tapeData: Tape;
  songData: Song;
  curatorWallet: string;
}

export const createTape = async (tape: TapePayload) => {
  return axios.post(`${API_PREFIX}/tapes`, tape);
};
