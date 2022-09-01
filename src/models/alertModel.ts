import { createModel } from '@rematch/core';
import type { RootModel } from '.';
import { Alerts } from './common';

export interface AlertState {
  currentAlert: Alerts;
  isOpen: boolean;
}

export const alertModel = createModel<RootModel>()({
  state: {
    isOpen: false,
  } as AlertState,
  reducers: {
    setAlert: (state, alert: Alerts) => {
      const newState = { ...state };
      newState.currentAlert = alert;
      return newState;
    },
    setIsOpen: (state, isOpen: boolean) => {
      const newState = { ...state };
      newState.isOpen = isOpen;
      return newState;
    },
  },
  effects: () => ({}),
});
