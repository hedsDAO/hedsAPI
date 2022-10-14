import { UserCollection } from '@/models/common';
import { Result } from 'ethers/lib/utils';
import { store } from '@/store';

const formatUserCollection = (data: Result) => {
  const tapeDataForOwnership: UserCollection = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const userCollectionTank: UserCollection = {};
  Object.keys(tapeDataForOwnership).map((key: string, index: number) => {
    if (data?.[index] !== null) {
      if (data?.[index].toNumber() !== 0) {
        userCollectionTank[key] = {
          ...tapeDataForOwnership[key],
          quantity: data[index].toNumber(),
        };
      } else delete userCollectionTank[key];
    }
  });
  return userCollectionTank;
};

export default formatUserCollection;
