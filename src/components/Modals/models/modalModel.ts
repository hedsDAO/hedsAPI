import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export enum Modals {
  CONNECT = 0,
  SETTINGS,
  TWITTER,
}

export interface ModalState {
  modal: Modals;
  isOpen: boolean;
}

export const modalModel = createModel<RootModel>()({
  state: {
    modal: null,
    isOpen: false,
  } as ModalState,
  reducers: {
    setModal: (state, modal: Modals) => ({ ...state, modal, isOpen: true }),
    closeModal: (state) => ({ ...state, isOpen: false }),
  },
  selectors: (slice) => ({
    selectCurrentModal: () => slice((state) => state.modal),
    selectModalIsOpen: () => slice((state) => state.isOpen),
  }),
  effects: () => ({}),
});
