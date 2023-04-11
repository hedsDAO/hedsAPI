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
    isOpen: false,
  } as ModalState,
  reducers: {
    setModal: (state, modal) => ({ ...state, modal, isOpen: true }),
    setModalIsOpen: (state, isOpen) => ({ ...state, isOpen }),
  },
  selectors: (slice) => ({
    selectModal: () => slice((state) => state.modal),
    selectModalIsOpen: () => slice((state) => state.isOpen),
  }),
});
