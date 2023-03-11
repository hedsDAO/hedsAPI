import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { OPENSEA_EVENTS_CLOUD_FUNCTION, OPENSEA_LIMIT } from './constants';
import { ExploreState, HedsTapeListing } from '@/pages/explore/store/common';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import axios from 'axios';
import { db } from '@/App';

export const exploreModel = createModel<RootModel>()({
  state: {
    scrollDataMax: 4,
  } as ExploreState,
  reducers: {
    setLatestSecondaryListings: (state, secondaryListings: HedsTapeListing[]) => ({ ...state, secondaryListings }),
    setHasFetchedAllListings: (state, hasFetchedAllListings: boolean) => ({ ...state, hasFetchedAllListings }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setScrollDataMax: (state, scrollDataMax: number) => ({ ...state, scrollDataMax: scrollDataMax + 4 }),
    setExploreData: (store, exploreData: DocumentData) => ({ ...store, exploreData }),
    setCarouselOrder: (store, carouselOrder: string[]) => ({ ...store, carouselOrder }),
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
    selectExploreData() {
      return slice((exploreModel) => exploreModel?.exploreData);
    },
    selectLatestRelease() {
      return slice((exploreModel) => exploreModel?.exploreData?.latestRelease || {});
    },
    selectHedSolo() {
      return slice((exploreModel) => exploreModel?.exploreData?.hedSolo || {});
    },
    selectHedsPlayer() {
      return slice((exploreModel) => exploreModel?.exploreData?.hedsPlayer || {});
    },
    selectCarouselOrder() {
      return slice((exploreModel) => exploreModel.carouselOrder);
    }
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
    async getExploreData() {
      const docRef = doc(db, 'explore/config');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setExploreData(docSnap.data());
        var carouselOrder: string[] = [];
        Object.entries(docSnap.data()).forEach(([key, value]) => (carouselOrder[+value.order - 1] = key));
        this.setCarouselOrder(carouselOrder);
      }
    },
  }),
});
