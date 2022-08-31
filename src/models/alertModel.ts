import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export interface AlertState {
  currentAlert: boolean;
}

export const alertModel = createModel<RootModel>()({
  state: {
    currentAlert: false,
  } as AlertState,
  reducers: {
    setSidebarOpen: (state, sidebarOpen: boolean) => {},
  },
  effects: () => ({}),
});
