import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import selectPlugin from '@rematch/select';
import { models, RootModel } from './models';
type FullModel = ExtraModelsFromLoading<RootModel>;

export const store = init<RootModel, FullModel>({
  models,
  plugins: [selectPlugin(), loadingPlugin()],
  redux: {
    devtoolOptions: {
      disabled: process.env.NODE_ENV === 'production',
    },
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
