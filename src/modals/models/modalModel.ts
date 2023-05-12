import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export enum Modals {
  CONNECT = 0,
  SETTINGS,
  TWITTER,
  DOWNLOAD,
}

export interface ModalState {
  modal: Modals;
}

export const modalModel = createModel<RootModel>()({
  state: {
    modal: null,
  } as ModalState,
  reducers: {
    setModal: (state, modal: Modals) => ({ ...state, modal }),
    clearState: (state) => ({ ...state, modal: null }),
  },
  selectors: (slice) => ({
    selectCurrentModal: () => slice((state) => state.modal),
  }),
  effects: () => ({}),
});
