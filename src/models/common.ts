export interface Tape {
  id: number;
  contract: string;
  name: string;
  merkle_root: string;
  description: string;
  image: string;
  proposal_id: string;
  video: string;
  bpm: number;
  timeline: string;
  type: string;
  splits: string;
  links: string;
}

export interface User {
  id: number;
  profile_picture: string;
  banner: string;
  twitter_handle: string;
  badges: { name: string; image: string; description: string }[];
  description: string;
  display_name: string;
  role: string;
  wallet: string;
  joined: number;
  spotlight: any;
  collection: any;
  votes: any;
}

export interface Song {
  id: number;
  track_name: string;
  tape_id: number;
  cover: string;
  audio: string;
  duration: number;
  public: boolean;
  submission_data: {
    sub_id?: string;
    sub_image?: string;
    proposalId?: string;
  };
  cyanite_id: string;
  track_data: {
    track_no?: number;
    tape_name?: string;
  };
  total_likes: number | null;
  artists?: SongArtist[];
  type: any;
  created: any;
  video?: string;
}

export interface UserSong extends Song {
  song_id: number;
  user_id: number;
  verified: boolean;
  ownership_percent: number;
}

export interface SongArtist extends User {
  song_id: number;
  user_id: number;
  verified: boolean;
  ownership_percent: number;
}

export interface UserEvents {
  id: number;
  user_id: number;
  event_type: UserEventTypes;
  event_data: {
    message: string;
    subject: string;
  };
  event_timestamp: string;
}

export enum UserEventTypes {
  USER_CREATED = 'user_created',
}

export interface SongEvents {
  id: number;
  user_id: number;
  song_id: number;
  event_type: SongEventTypes;
  event_data: {
    message: string;
    subject: string;
  };
  event_timestamp: string;
}

export enum SongEventTypes {
  SUBMISSION = 'tape_submission',
  PLACEMENT = 'tape_placement',
  SONG_LIKE = 'song_like',
}

export type UserSettingsData = Partial<Pick<User, 'profile_picture' | 'banner' | 'description'>>;

export interface CyaniteData {
  bpmRangeAdjusted: number;
  bpmPrediction: { value: number; confidence: number };
  genreTags: string[];
  subgenreTags: string[];
  emotionalProfile: string;
  keyPrediction: { value: string; confidence: number };
  mood: {
    aggressive: number;
    calm: number;
    chilled: number;
    dark: number;
    energetic: number;
    epic: number;
    ethereal: number;
    happy: number;
    romantic: number;
    sad: number;
    scary: number;
    sexy: number;
    uplifting: number;
  };
  moodAdvancedTags: string[];
  musicalEraTag: string;
  timeSignature: string;
  transformerCaption: string;
}


