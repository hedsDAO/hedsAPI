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
  badges: string;
  description: string;
  display_name: string;
  role: string;
  wallet: string;
  joined: number;
  spotlight: any;
  collection: string;
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
  submission_data: string;
  cyanite_id: string;
  track_data: any;
  total_likes: number | null;
  // TODO: revise fields:
  type: any;
  created: any;
}
