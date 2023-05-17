import { getFeaturedArtists } from '@/api/user';
import type { RootModel } from '@/models';
import { User } from '@/models/common';
import { createModel } from '@rematch/core';

export const exploreModel = createModel<RootModel>()({
  state: {
    activeIndex: 2,
    featuredArtists: [],
  },
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setActiveIndex: (state, activeIndex) => ({ ...state, activeIndex }),
    setFeaturedArtists: (state, featuredArtists) => ({ ...state, featuredArtists }),
  },
  selectors: (slice) => ({
    selectActiveIndex: () => slice((state) => state.activeIndex),
    selectFeaturedArtists: () => slice((state) => state.featuredArtists),
  }),
  effects: () => ({
    async getFeaturedArtists() {
      try {
        const featuredArtists = await getFeaturedArtists();
        this.setFeaturedArtists(featuredArtists.data);
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
