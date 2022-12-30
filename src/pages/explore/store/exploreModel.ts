import { getOpenseaEvents } from '@/utils';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export interface ExploreState {
  secondaryListings: any[];
}

export const exploreModel = createModel<RootModel>()({
  state: {} as ExploreState,
  selectors: (slice, createSelector, hasProps) => ({
    selectLatestSecondaryListings() {
      return slice((artistModel) => artistModel.secondaryListings);
    },
  }),
  reducers: {
    setLatestSecondaryListings: (state, secondaryListings: any[]) => ({ ...state, secondaryListings }),
  },
  effects: () => ({
    async getLatestSecondaryListings() {
      const secondaryListingsTank: any[] = [];
      const allTapeSlugs = ['hedstape-10', 'hedstape-9'];
      allTapeSlugs.forEach((slug) => {
        setTimeout(() => {
          getOpenseaEvents(slug).then((res) => {
            secondaryListingsTank.push(res);
            this.setLatestSecondaryListings(secondaryListingsTank);
          });
        }, 1000);
      });
    },
  }),
});
