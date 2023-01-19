import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

export const mintModel = createModel<RootModel>()({
  state: {} as any,
  reducers: {},
  effects: () => ({}),
});
