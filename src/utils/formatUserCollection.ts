import { HedsTapes, UserCollection } from '@/models/common';
import { Result } from 'ethers/lib/utils';

const formatUserCollection = (data: Result, hedsTapes: HedsTapes) => {
  const collectionData: UserCollection =
    Object.values(hedsTapes)
      .filter((tape) => tape?.contract?.length)
      .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name } }), {}) || {};

  const userCollectionTank: UserCollection = {};
  Object.keys(collectionData).map((key: string, index: number) => {
    if (data?.[index] !== null) {
      if (data?.[index]?.toNumber() !== 0) {
        userCollectionTank[key] = {
          ...collectionData[key],
          quantity: data[index].toNumber(),
        };
      } else delete userCollectionTank[key];
    }
  });
  return userCollectionTank;
};

export default formatUserCollection;
