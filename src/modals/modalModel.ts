import { createModel } from '@rematch/core';
import type { RootModel } from '../models';

export enum Modals {
  PROFILE_MODAL = 0,
}

export interface ModalState {
  currentModal: Modals;
  isOpen: boolean;
}

export const modelModel = createModel<RootModel>()({
  state: {
    isOpen: false,
  } as ModalState,
  reducers: {
    setModal: (state, currentModal) => ({ ...state, currentModal }),
    setModalOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
  },
  effects: () => ({}),
});
