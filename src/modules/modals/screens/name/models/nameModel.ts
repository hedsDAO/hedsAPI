import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { NameModelState } from './common';

export const nameModel = createModel<RootModel>()({
  state: {} as NameModelState,
  reducers: {},
  effects: () => ({}),
});
