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
  track_data: any;
  total_likes: number | null;
  artists?: User[];
  type: any;
  created: any;
  video?: string;
  // TODO: Add type for this
  song_id?: number,
  user_id?: number,
  verified?: boolean,
  ownership_percent?: number,
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
