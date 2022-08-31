import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export interface ModalState {
  currentModal: boolean;
}

export const modelModel = createModel<RootModel>()({
  state: {
    currentModal: false,
  } as ModalState,
  reducers: {
    setSidebarOpen: (state, sidebarOpen: boolean) => {},
  },
  effects: () => ({}),
});
