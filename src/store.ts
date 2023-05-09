import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import persistPlugin from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import selectPlugin from '@rematch/select';
import { models, RootModel } from './models';
import { createTransform } from 'redux-persist';
import { AudioModelState } from './hooks/useAudio/models/common';

// Custom transform for isPlaying property
const setIsPlayingFalseTransform = createTransform(
  // Outbound (from state to storage)
  (outboundState: unknown, key) => {
    if (key === 'audioModel') {
      const castedState = outboundState as AudioModelState;
      return {
        ...castedState,
        isPlaying: false,
      };
    }
    return outboundState;
  },
  // Inbound (from storage to state)
  (inboundState: unknown, key) => {
    if (key === 'audioModel') {
      const castedState = inboundState as AudioModelState;
      return {
        ...castedState,
        isPlaying: false,
      };
    }
    return inboundState;
  },
);

type FullModel = ExtraModelsFromLoading<RootModel>;

/** Local Storage Persist for Audio Model */
const persistConfig = {
  key: 'root',
  storage,
  version: 2,
  whitelist: ['audioModel'],
  transforms: [setIsPlayingFalseTransform],
};

export const store = init<RootModel, FullModel>({
  models,
  plugins: [selectPlugin(), loadingPlugin(), persistPlugin(persistConfig)],
  redux: {
    devtoolOptions: {
      disabled: process.env.NODE_ENV !== 'development',
    },
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
