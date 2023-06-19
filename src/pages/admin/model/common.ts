import { Timeline } from '@/models/common';

interface CreateTapeDetails {
  name: string;
  description: string;
  bpm: number;
  timeline: Timeline;
  tape_type?: string;
}

interface CreateSongDetails {
  duration: number;
  track_name: string;
  song_type: string;
  submission_data?: any;
  cyanite_id: string;
  track_data?: { tape_name: string };
}

export interface CreateTapePayload {
  coverImage: string;
  sampleAudio: string;
  tapeData: CreateTapeDetails;
  songData: CreateSongDetails;
  curatorWallet: string;
  signature?: string;
  message?: string;
  adminWallet?: string;
}

export interface AdminState {
  tape: CreateTapePayload;
}
