export enum SongNavbarTabs {
  DETAILS = 0,
  APPEARS_ON,
  LIKES,
}

export interface Contributor {
  userId: string;
  split: number;
  verified: boolean;
}

export interface SubmissionData {
  subId: string;
  subImage: string;
  proposalId: string;
}

export interface TrackStats {
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

export interface SongResponse {
  id: number;
  audio: string;
  cover: string;
  duration: number;
  public: boolean;
  appear_on?: number[];
  track_name: string;
  type: TrackType;
  submission_data: string;
  cyanite_id: string;
  created: number;
  total_likes: number;
}

export interface SongState {
  id: number | undefined;
  audio: string;
  contributors: Contributor[];
  cover: string;
  duration: number;
  public: boolean;
  stats?: TrackStats; // are we removing this?
  appearsOn: string[];
  trackName: string;
  type: TrackType;
  submissionData: SubmissionData;
  cyaniteId: string;
  created: number;
}
