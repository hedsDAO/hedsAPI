import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

class SampleModalState {}

export const sampleModel = createModel<RootModel>()({
  state: {} as SampleModalState,
  reducers: {},
  effects: () => ({}),
});
