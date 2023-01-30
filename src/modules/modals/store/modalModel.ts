import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export enum Modals {
  SETTINGS_MODAL = 0,
  TWITTER_MODAL,
  NAME_MODAL,
  SAMPLE_MODAL,
  SUBMIT_MODAL,
  MINT_MODAL,
  CONNECT_MODAL,
  USER_MODAL,
}

export interface ModalState {
  currentModal: Modals;
  nextModal?: Modals;
  isOpen: boolean;
}

export const modalModel = createModel<RootModel>()({
  state: {
    isOpen: false,
  } as ModalState,
  reducers: {
    setModal: (state, currentModal) => ({ ...state, currentModal }),
    setModalOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
    setNextModal: (state, nextModal: Modals) => ({ ...state, nextModal }),
  },
  selectors: (slice) => ({
    selectModal: () => slice((state) => state.currentModal),
    selectModalOpen: () => slice((state) => state.isOpen),
    selectNextModal: () => slice((state) => state.nextModal),
  }),
  effects: () => ({}),
});
