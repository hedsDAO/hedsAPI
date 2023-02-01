import { OPENSEA_EVENTS_CLOUD_FUNCTION, OPENSEA_LIMIT } from './constants';
import { ExploreState, HedsTapeListing } from '@/pages/explore/store/common';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import axios from 'axios';

export const exploreModel = createModel<RootModel>()({
  state: {
    scrollDataMax: 4,
  } as ExploreState,
  reducers: {
    setLatestSecondaryListings: (state, secondaryListings: HedsTapeListing[]) => ({ ...state, secondaryListings }),
    setHasFetchedAllListings: (state, hasFetchedAllListings: boolean) => ({ ...state, hasFetchedAllListings }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setScrollDataMax: (state, scrollDataMax: number) => ({ ...state, scrollDataMax: scrollDataMax + 4 }),
  },
  selectors: (slice) => ({
    selectLatestSecondaryListings() {
      return slice((exploreModel) => exploreModel.secondaryListings);
    },
    selectHasFetchedAllListings() {
      return slice((exploreModel) => exploreModel.hasFetchedAllListings);
    },
    selectIsLoading() {
      return slice((exploreModel) => exploreModel.isLoading);
    },
    selectScrollDataMax() {
      return slice((exploreModel) => exploreModel.scrollDataMax);
    },
  }),
  effects: () => ({
    async getLatestSecondaryListings(fetchAll?: boolean) {
      this.setIsLoading(true);
      const url = fetchAll ? OPENSEA_EVENTS_CLOUD_FUNCTION : `${OPENSEA_EVENTS_CLOUD_FUNCTION}`;
      await axios
        .get(url)
        .then((res) => {
          this.setIsLoading(false);
          if (fetchAll) this.setHasFetchedAllListings(true);
          this.setLatestSecondaryListings(res.data);
        })
        .catch(() => this.setIsLoading(false));
    },
  }),
});
