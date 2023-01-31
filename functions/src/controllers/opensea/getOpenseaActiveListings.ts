import * as express from 'express';
import * as functions from 'firebase-functions';
import axios from 'axios';
import * as luxon from 'luxon';
import { openseaSlugs } from '../../data/openseaSlugs';
import * as ethers from 'ethers';

export const getOpenseaActiveListings = async (req: express.Request, res: express.Response) => {
  functions.logger.log('conditional limit param', req.params?.limit);
  const now = luxon.DateTime.now().toMillis();
  const secondaryListingsTank: any[] = [];
  /**
   * @name rateLimitTimer
   * @param {string} slug
   * @return {Array} opensea listing data and prevents rate limit
   */
  function rateLimitTimer(slug: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const options = {
          method: 'get',
          url: `https://api.opensea.io/api/v1/events?only_opensea=true&collection_slug=${slug}&event_type=created`,
          headers: { accept: 'application/json', 'X-API-KEY': process.env.OPENSEA_API_KEY || '' },
        };
        axios(options)
          .then((response: any) => {
            const filterTank: { [key: string]: any } = {};
            const liveEvents = response.data.asset_events.map((event: any) => {
              const time = luxon.DateTime.fromISO(event.listing_time).setZone('GMT').toMillis() + +event?.duration * 1000;
              if (time > now && event !== undefined) return event;
            });
            liveEvents
              ?.filter((item: any) => item !== undefined)
              ?.map((item: any): any => {
                const bigNum = ethers.BigNumber.from(item.starting_price);
                return {
                  market: 'opensea',
                  tokenId: +item.asset.token_id,
                  price: ethers.utils.formatEther(bigNum),
                  name: item.asset.asset_contract.name,
                  image: item.asset.asset_contract.image_url,
                  listed: luxon.DateTime.fromISO(item.listing_time).toMillis(),
                  link: item.asset.permalink,
                  seller: item.seller.address,
                };
              })
              .sort((a: any, b: any) => a.listed - b.listed)
              .map((item: any) => (filterTank[item.tokenId] = item));
            secondaryListingsTank.push(Object.values(filterTank));
            resolve('');
          })
          .catch(() => res.status(400));
      }, 1000);
    });
  }
  if (req.params?.limit) {
    for (let i = 0; i < +req.params?.limit; ++i) {
      await rateLimitTimer(openseaSlugs[i]);
    }
  } else {
    for (let i = 0; i < openseaSlugs?.length; ++i) {
      await rateLimitTimer(openseaSlugs[i]);
    }
  }

  return res.status(200), res.send(secondaryListingsTank);
};
