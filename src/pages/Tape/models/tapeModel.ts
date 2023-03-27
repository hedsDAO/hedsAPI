import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { mockTape } from './constant';

export const tapesModel = createModel<RootModel>()({
  state: {
    currentTape: mockTape,
    navbarTabs: ['Tracks', 'Details'],
    currentTab: 0,
  } as any,
  reducers: {
    setCurrentTab: (state, currentTab) => ({ ...state, currentTab }),
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectCurrentTab() {
      return slice((state): number => state.currentTab);
    },
    selectNavbarTabs() {
      return slice((state) => state.navbarTabs);
    },
  }),
  effects: () => ({}),
});
