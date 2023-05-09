export interface Tape {
  id: number;
  contract: string;
  name: string;
  merkleRoot: string;
  description: string;
  image: string;
  proposalId: string;
  video: string;
  bpm: number;
  timeline: Timeline;
  type: string;
  splits: string;
  links: string;
  sampleArtists: Artist[];
  tracks: Song[];
}

interface Timeline {
  mint: { start: number; end: number };
  submit: { start: number; end: number };
  vote: { start: number; end: number };
}

interface Artist {
  display_name: string;
  id: number;
  profile_picture: string;
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
  artists?: SongArtist[];
  type: any;
  created: any;
  video?: string;
  artist_id?: number;
  artist_display_name?: string;
  artist_display_picture?: string;
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

export type UserSettingsData = Partial<Pick<User, 'profile_picture' | 'banner' | 'description'>>;
