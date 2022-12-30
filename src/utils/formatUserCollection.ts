import { TapeData, UserCollection, UserCollectionItem } from '@/models/common';
import { Result } from 'ethers/lib/utils';
import { DateTime } from 'luxon';

const formatUserCollection = (data: Result, allTapeData: TapeData[]): UserCollection => {
  let collectionData = {} as { [key: string]: UserCollectionItem };
  const now = DateTime.now().setZone('utc').toMillis();
  collectionData =
    allTapeData
      .filter((tape) => tape?.contract?.length)
      .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name, space: cur.space, tape: cur.tape, id: cur.id } }), {}) || {};
  const userCollectionTank = {} as { [key: string]: UserCollectionItem };
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
  return { items: userCollectionTank, lastUpdated: now };
};

export default formatUserCollection;
