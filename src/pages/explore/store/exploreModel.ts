import { getOpenseaEvents } from '@/utils';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { DateTime } from 'luxon';
import { ethers } from 'ethers';

const allTapeSlugs = [
  'hedstape-1',
  'hedstape-2',
  'hedstape-3',
  'hedstape-4',
  'hedstape-5',
  'hedstape-6',
  'hedstape-7',
  'hedstape-8',
  'hedstape-9',
  'hedstape-10',
];

export interface HedsTapeListing {
  market: any;
  tokenId: any;
  price: any;
  name: any;
  image: any;
  listed: any;
  link: any;
  seller: string;
}

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
    setLatestSecondaryListings: (state, secondaryListings: HedsTapeListing[]) => ({ ...state, secondaryListings }),
  },
  effects: () => ({
    async getLatestSecondaryListings() {
      const now = DateTime.now().toMillis();
      const secondaryListingsTank: any[] = [];
      function waitforme(slug: string) {
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
                  console.log(item)
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
      for (let i = 0; i < allTapeSlugs.length; ++i) {
        await waitforme(allTapeSlugs[i]);
        console.log(i);
      }
      this.setLatestSecondaryListings(secondaryListingsTank);
    },
  }),
});
