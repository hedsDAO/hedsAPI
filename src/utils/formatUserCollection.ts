import { TapeData, UserCollection } from '@/models/common';
import { Result } from 'ethers/lib/utils';

const formatUserCollection = (data: Result, allTapeData: TapeData[]) => {
  const collectionData: UserCollection =
    allTapeData
      .filter((tape) => tape?.contract?.length)
      .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name, space: cur.space, tape: cur.tape, id: cur.id } }), {}) || {};
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
