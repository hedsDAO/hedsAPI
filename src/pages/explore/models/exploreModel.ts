import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';

export const exploreModel = createModel<RootModel>()({
  state: {
    activeIndex: 2,
  },
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setActiveIndex: (state, activeIndex) => ({ ...state, activeIndex }),
  },
  selectors: (slice) => ({
    selectActiveIndex: () => slice((state) => state.activeIndex),
  }),
  effects: () => ({}),
});
