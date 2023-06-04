import type { RootModel } from '@/models';
import { Song } from '@/models/common';
import { createModel } from '@rematch/core';

export interface WaveformModelState {
  song: Song;
  isLoading: boolean;
  seekPosition: number;
  playbackPosition: number;
}

export const waveformModel = createModel<RootModel>()({
  state: {
    song: {} as Song,
    isLoading: false,
    seekPosition: 0,
    playbackPosition: 0,
  } as WaveformModelState,
  reducers: {
    setSong: (state, song: Song) => ({ ...state, song }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setSeekPosition: (state, seekPosition: number) => ({ ...state, seekPosition }),
    setPlaybackPosition: (state, playbackPosition: number) => ({ ...state, playbackPosition }),
  },
  selectors: (slice) => ({
    selectSong() {
      return slice((state): Song => state.song);
    },
    selectIsLoading() {
      return slice((state): boolean => state.isLoading);
    },
    selectSeekPosition() {
      return slice((state): number => state.seekPosition);
    },
    selectPlaybackPosition() {
      return slice((state): number => state.playbackPosition);
    },
  }),
  effects: () => ({}),
});
