import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

class MintModalState {}

export const mintModel = createModel<RootModel>()({
  state: {} as MintModalState,
  reducers: {},
  effects: () => ({}),
});
