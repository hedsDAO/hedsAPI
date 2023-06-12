export interface SongData {
  audio: string;
  cover: string;
  duration: number;
  isPublic: boolean;
  track_name: string;
  song_type:'submission' | 'track' | 'collab' | 'sample' | 'hedsolo';
  submission_data: any;
  cyanite_id: string;
  created: Date;
  total_likes: number;
  song_video: string;
  track_data: TrackData;
}

export interface TrackData {
  track_no?: string;
  tape_name: string;
}

export interface SongArtistData {
  user_id: number;
  verified: boolean;
  ownership_percent: number;
}

export interface LikeData {
  user_id: number;
  song_id: number;
  display_name: string;
  profile_picture: string;
  wallet: string;
}
