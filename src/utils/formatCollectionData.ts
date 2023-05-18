import { TapeCollectionArg, TapeCollectionItem } from '@/models/common';
import { DateTime } from 'luxon';

const formatCollectionData = (data: any[], allTapeData: TapeCollectionArg[]) => {
  let collectionData = {} as { [key: string]: TapeCollectionItem };
  const now = DateTime.now().setZone('utc').toMillis();
  collectionData =
    allTapeData
      .filter((tape) => tape?.contract?.length)
      .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name, id: cur.id } }), {}) || {};
  const userCollectionTank = {} as { [key: string]: TapeCollectionItem };
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

export default formatCollectionData;
