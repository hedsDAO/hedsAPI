import type { RootModel } from '@/models';
import { Song } from '@/models/common';
import { createModel } from '@rematch/core';

export interface GlobalAudioState {
  currentSong: Song;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  progress: number;
  isOpen: boolean;
}

export const globalAudioModel = createModel<RootModel>()({
  state: {
    volume: 1, 
  } as GlobalAudioState,
  reducers: {
    setState: (state, payload): GlobalAudioState => ({ ...state, ...payload }),
    setIsOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
    setCurrentSong: (state, currentSong: Song | null) => ({ ...state, currentSong }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setProgresss: (state, progress: number) => ({ ...state, progress }),
    setIsMuted: (state, isMuted: boolean) => ({ ...state, isMuted }),
    clearState: () => ({} as GlobalAudioState),
  },
  selectors: (slice) => ({
    selectIsOpen() {
      return slice((state): boolean => state.isOpen);
    },
    selectIsMuted() {
      return slice((state): boolean => state.isMuted);
    },
    selectIsLoading() {
      return slice((state): boolean => state.isLoading);
    },
    selectCurrentSong() {
      return slice((state): Song => state.currentSong);
    },
    selectCurrentSongHash() {
      return slice((state): string => state.currentSong?.audio.split('/ipfs/')[1]);
    },
    selectCurrentSongName() {
      return slice((state): string => state.currentSong?.track_name || state.currentSong?.submission_data?.sub_id);
    },
    selectVolume() {
      return slice((state): number => state.volume);
    },
    selectProgress() {
      return slice((state): number => state.progress);
    },
    selectIsPlaying() {
      return slice((state): boolean => state.isPlaying);
    },
  }),
  effects: () => ({}),
});
