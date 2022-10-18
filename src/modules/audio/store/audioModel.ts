import { createModel } from '@rematch/core';
import type { RootModel } from '../../../models';
import { TrackMetadata } from '../../../models/common';

export interface AudioState {
  queue: Array<TrackMetadata>;
  currentTrack?: number;
  currentTapeId?: any;
  currentTape?: string;
  isPlaying: boolean;
  isLoading: boolean;
  isShowingQueue: boolean;
  volume: number;
  isSample?: boolean;
  currentTime?: [string, number];
  duration?: [string, number];
  isShowingPlayer: boolean;
}

export const audioModel = createModel<RootModel>()({
  state: {
    isPlaying: false,
    isLoading: false,
    isShowingQueue: false,
    isShowingPlayer: false,
    volume: 100,
    queue: [],
  } as AudioState,
  reducers: {
    pushToQueue: (state, track: TrackMetadata) => ({ ...state, queue: [track, ...state.queue] }),
    setIsShowingPlayer: (state, isShowingPlayer) => ({ ...state, isShowingPlayer }),
    setIsShowingQueue: (state, isShowingQueue: boolean) => ({ ...state, isShowingQueue }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
    setDuration: (state, duration: [string, number]) => ({ ...state, duration }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    clearAudioState: (state) => {
      const newState: AudioState = { isPlaying: false, isLoading: false, isShowingQueue: false, isShowingPlayer: false, volume: 100, queue: [] };
      return newState;
    },
  },
  effects: () => ({}),
});
