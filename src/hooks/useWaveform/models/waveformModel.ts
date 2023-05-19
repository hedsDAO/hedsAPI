import { getSongByHash } from '@/api/song';
import type { RootModel } from '@/models';
import { Song } from '@/models/common';
import { getRelatedTracks } from '@/utils';
import { createModel } from '@rematch/core';

export interface WaveformModelState {
  song: Song;
  isLoading: boolean;
}

export const waveformModel = createModel<RootModel>()({
  state: {
    song: {} as Song,
    isLoading: false,
  } as WaveformModelState,
  reducers: {
    setSong: (state, song: Song) => ({ ...state, song }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
  },
  selectors: (slice) => ({
    selectSong() {
      return slice((state): Song => state.song);
    },
    selectIsLoading() {
      return slice((state): boolean => state.isLoading);
    },
  }),
  effects: () => ({}),
});
