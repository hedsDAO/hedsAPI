import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

class SubmitModalState {}

export const submitModel = createModel<RootModel>()({
  state: {} as SubmitModalState,
  reducers: {},
  effects: () => ({}),
});
