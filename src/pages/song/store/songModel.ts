import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

interface Contributor {
  userId: string;
  split: number;
  verified: boolean;
}

interface SubmissionData {
  subId: string;
  subImage: string;
  proposalId: string;
}

interface TrackStats {
  likedBy: { [key: string]: number };
  plays: number;
}

export enum TrackType {
  SUBMISSION,
  TRACK,
  COLLAB,
  SAMPLE,
  HEDSOLO,
}

export interface SongState {
  audio: string;
  contributors: Contributor[];
  cover: string;
  duration: number;
  public: boolean;
  stats: TrackStats;
  appearsOn: string[];
  trackName: string;
  type: TrackType;
  submissionData: SubmissionData;
  cyaniteId: string;
  created: number;
}

export const songModel = createModel<RootModel>()({
  state: {
    audio: '',
    contributors: [],
    cover: 'string',
    duration: 0,
    public: true,
    stats: {},
    appearsOn: [],
    trackName: '',
    type: 0,
    submissionData: {},
    cyaniteId: '',
    created: 0,
  } as SongState,
});
