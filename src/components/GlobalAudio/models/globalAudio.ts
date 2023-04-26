import type { RootModel } from '@/models';
import { Song } from '@/models/common';
import { createModel } from '@rematch/core';

export const globalAudioModel = createModel<RootModel>()({
  state: {
    currentSong: null as Song | null,
    isPlaying: false,
    volume: 1,
  },
  reducers: {
    setCurrentSong: (state, currentSong: Song | null) => ({ ...state, currentSong }),
    setPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
  },
  selectors: (slice) => ({
    selectCurrentSong() {
      return slice((state): Song => state.currentSong);
    },
    selectVolume() {
      return slice((state) => state.volume);
    },
    selectIsPlaying() {
      return slice((state) => state.isPlaying);
    },
  }),
  effects: () => ({}),
});
