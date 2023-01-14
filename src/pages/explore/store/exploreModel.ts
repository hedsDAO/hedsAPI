import { ethers } from 'ethers';
import { DateTime } from 'luxon';
import { ExploreState, HedsTapeListing } from '@/pages/explore/store/common';
import { ALL_TAPE_SLUGS } from '@/pages/explore/store/constants';
import { getOpenseaEvents } from '@/utils';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export const exploreModel = createModel<RootModel>()({
  state: {} as ExploreState,
  reducers: {
    setLatestSecondaryListings: (state, secondaryListings: HedsTapeListing[]) => ({ ...state, secondaryListings }),
    setHasFetchedAllListings: (state, hasFetchedAllListings: boolean) => ({ ...state, hasFetchedAllListings }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
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
  }),
  effects: () => ({
    async getLatestSecondaryListings(fetchAll?: boolean) {
      const now = DateTime.now().toMillis();
      const secondaryListingsTank: any[] = [];
      function apiTimer(slug: string) {
        return new Promise((resolve) => {
          setTimeout(() => {
            getOpenseaEvents(slug).then((res) => {
              const filterTank: { [key: string]: HedsTapeListing } = {};
              const liveEvents = res.asset_events.map((event: any) => {
                const time = DateTime.fromISO(event.listing_time).setZone('GMT').toMillis() + +event?.duration * 1000;
                if (time > now && event !== undefined) return event;
              });
              liveEvents
                .filter((item: any) => item !== undefined)
                .map((item: any): HedsTapeListing => {
                  const value = ethers.BigNumber.from(item.starting_price);
                  return {
                    market: 'opensea',
                    tokenId: +item.asset.token_id,
                    price: ethers.utils.formatEther(value),
                    name: item.asset.asset_contract.name,
                    image: item.asset.asset_contract.image_url,
                    listed: DateTime.fromISO(item.listing_time).toMillis(),
                    link: item.asset.permalink,
                    seller: item.seller.address,
                  };
                })
                .sort((a: HedsTapeListing, b: HedsTapeListing) => a.listed - b.listed)
                .map((item: HedsTapeListing) => (filterTank[item.tokenId] = item));
              secondaryListingsTank.push(Object.values(filterTank));
            });
            resolve('');
          }, 1000);
        });
      }
      this.setIsLoading(true);
      if (fetchAll) {
        for (let i = 0; i < ALL_TAPE_SLUGS.length; ++i) {
          await apiTimer(ALL_TAPE_SLUGS[i]);
        }
      } else {
        for (let i = ALL_TAPE_SLUGS.length - 4; i < ALL_TAPE_SLUGS.length; ++i) {
          await apiTimer(ALL_TAPE_SLUGS[i]);
        }
      }
      this.setIsLoading(false);
      if (fetchAll) this.setHasFetchedAllListings(true);
      this.setLatestSecondaryListings(secondaryListingsTank);
    },
  }),
});
