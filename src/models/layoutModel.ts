import { createModel } from '@rematch/core';
import type { RootModel } from '.';

export interface LayoutState {
  sidebarOpen: boolean;
}

export const layoutModel = createModel<RootModel>()({
  state: {
    sidebarOpen: false,
  } as LayoutState,
  reducers: {
    setSidebarOpen: (state, sidebarOpen: boolean) => {
      const newState = { ...state };
      newState.sidebarOpen = sidebarOpen;
      return newState;
    },
  },
  effects: () => ({}),
});
