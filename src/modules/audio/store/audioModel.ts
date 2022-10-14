import { createModel } from '@rematch/core';
import type { RootModel } from '../../../models';
import { TapeData, TrackMetadata, User } from '../../../models/common';

export interface AudioState {
  queue: Array<TrackMetadata>;
  currentTrack: number;
  currentTapeId: any;
  currentTape: string;
  isPlaying: boolean;
  isLoading: boolean;
  isShowingQueue: boolean;
  volume: number;
  isSample: boolean;
  currentTime: [string, number];
  duration: [string, number];
}

export const audioModel = createModel<RootModel>()({
  state: {
    isPlaying: false,
    isLoading: false,
    isShowingQueue: false,
    volume: 100,
    queue: [],
  } as AudioState,
  reducers: {
    pushToQueue: (state, track: TrackMetadata) => {
      const newState: AudioState = { ...state };
      const queue = [...newState.queue, track];
      return { ...state, queue };
    },
    setIsShowingQueue: (state, isShowingQueue: boolean) => ({...state, isShowingQueue}),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
    setDuration: (state, duration: [string, number]) => ({ ...state, duration }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
  },
  effects: () => ({}),
});
