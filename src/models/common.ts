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
  tape_id: number;
  audio: string;
  cover: string;
  duration: number;
  public: boolean;
  track_name: string;
  submission_data: {
    sub_id?: string;
    sub_image?: string;
    proposal_id?: string;
  };
  cyanite_id: string;
  created: number;
  total_likes: number;
  track_data: {
    track_no?: string;
    tape_name?: string;
  };
  artists: User[];
}
