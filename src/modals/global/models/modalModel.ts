import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export enum Modals {
  SETTINGS_MODAL = 0,
  TWITTER_MODAL,
  NAME_MODAL
}

export interface ModalState {
  currentModal: Modals;
  isOpen: boolean;
}

export const modalModel = createModel<RootModel>()({
  state: {
    isOpen: false,
  } as ModalState,
  reducers: {
    setModal: (state, currentModal) => ({ ...state, currentModal }),
    setModalOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
  },
  effects: () => ({}),
});
