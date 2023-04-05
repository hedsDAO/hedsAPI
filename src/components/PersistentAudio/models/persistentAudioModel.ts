import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import Wavesurfer from 'wavesurfer.js';
import { PersistentAudioState } from './common';

export const persistentAudioModel = createModel<RootModel>()({
  state: {
    src: '',
  } as PersistentAudioState,
  reducers: {
    setSrc: (state, src) => ({ ...state, src }),
    setIsShowingOverlay: (state, isShowingOverlay) => ({ ...state, isShowingOverlay }),
    setIsPlaying: (state, isPlaying) => ({ ...state, isPlaying }),
    setCurrentTime: (state, currentTime) => ({ ...state, currentTime }),
    setDuration: (state, duration) => ({ ...state, duration }),
    setVolume: (state, volume) => ({ ...state, volume }),
    setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
    setWavesurfer: (state, wavesurfer) => ({ ...state, wavesurfer }),
  },
  selectors: (slice) => ({
    selectSrc() {
      return slice((state): string => state.src);
    },
    selectIsShowingOverlay() {
      return slice((state): boolean => state.isShowingOverlay);
    },
    selectIsPlaying() {
      return slice((state): boolean => state.isPlaying);
    },
    selectCurrentTime() {
      return slice((state): number => state.currentTime);
    },
    selectDuration() {
      return slice((state): number => state.duration);
    },
    selectVolume() {
      return slice((state): number => state.volume);
    },
    selectIsLoading() {
      return slice((state): boolean => state.isLoading);
    },
    selectWavesurfer() {
      return slice((state): Wavesurfer => state.wavesurfer);
    },
  }),
  effects: () => ({}),
});
