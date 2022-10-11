import { createModel } from '@rematch/core';
import type { RootModel } from '../../../models';
import { TapeData, TrackMetadata, User } from '../../../models/common';

export interface AudioState {
  tapes: Array<TapeData>;
  queue: Array<TrackMetadata>;
  artists: Array<User>;
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
    tapes: [],
    artists: [],
  } as AudioState,
  reducers: {
    pushToQueue: (state, [track, tape, artist]: [TrackMetadata, TapeData, User]) => {
      const newState: AudioState = { ...state };
      const queue = [...newState.queue, track];
      const tapes = [...newState.tapes, tape];
      const artists = [...state.artists, artist];
      return { ...state, queue, tapes, artists };
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
