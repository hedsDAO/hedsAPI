import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

export const navModel = createModel<RootModel>()({
  state: {
    tabs: [],
    currentTab: 0,
  } as any,
  reducers: {
    setCurrentTab: (state, currentTab) => ({ ...state, currentTab }),
    setTabs: (state, tabs) => ({ ...state, tabs }),
  },
  selectors: (slice) => ({
    selectCurrentTab() {
      return slice((state): number => state.currentTab);
    },
    selectTabs() {
      return slice((state): string[] => state.tabs);
    },
  }),
  effects: () => ({}),
});
