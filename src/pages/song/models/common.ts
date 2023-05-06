import { CyaniteData, Song, SongEvents, User } from '@/models/common';

export enum SongNavbarTabs {
  DETAILS = 0,
  RELATED,
  LIKES,
  APPEARS_ON,
}


export interface SongLikeData {
  user_id: number;
  song_id: number;
  display_name: string;
  profile_picture: string;
  wallet: string;
}

export interface SongModelState {
  song?: Song;
  cyaniteData?: CyaniteData;
  songEvents?: SongEvents[];
  relatedSongs?: Song[];
  navbarTabs: string[];
  likes: SongLikeData[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
}
