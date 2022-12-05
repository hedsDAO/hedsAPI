import { TapeData, UserCollection } from '@/models/common';
import { erc721ABI } from 'wagmi';

const formatReadContractArgs = (wallet: string, allTapeData: TapeData[]): any => {
  if (wallet && allTapeData) {
    const collectionData =
      allTapeData
        .filter((tape) => tape?.contract?.length)
        .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name, space: cur.space, tape: cur.tape, id: cur.id } }), {}) || {};
    return Object.keys(collectionData).map((key) => ({
      address: key.toLowerCase(),
      functionName: 'balanceOf',
      abi: erc721ABI,
      args: [wallet],
      chainId: 1,
    }));
  }
};

export default formatReadContractArgs;
