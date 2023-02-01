import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export interface NavLink {
  name: string;
  path: string;
}

export interface NavigationState {
  isOpen: boolean;
  navLinks: Array<NavLink>;
  brandText: string;
}

export const navigationModel = createModel<RootModel>()({
  state: {
    isOpen: false,
    navLinks: [
      { name: 'Explore', path: '/' },
      { name: 'Tapes', path: '/tapes' },
      { name: 'Artists', path: '/artists' },
      // { name: 'Vote', path: '/vote' },
    ],
    brandText: 'heds',
  } as NavigationState,
  reducers: {
    setIsOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
  },
  selectors: (slice) => ({
    selectIsOpen() {
      return slice((navigationModel) => navigationModel.isOpen);
    },
    selectAllNavLinks() {
      return slice((navigationModel) => navigationModel.navLinks);
    },
    selectBrandText() {
      return slice((navigationModel) => navigationModel.brandText);
    },
  }),
  effects: () => ({}),
});
