import { Song } from '@/models/common';
import { SongLikeData } from '@/pages/song/models/common';

export interface AudioModelState {
  song: Song;
  likes: SongLikeData[],
  isPlaying: boolean;
  isMuted: boolean;
  isLoading: boolean;
  isError: boolean;
  progress: number;
  volume: number;
  autoplay: boolean;
  duration?: number;
  upNext?: Song | null;
  previous?: Song | null;
}
