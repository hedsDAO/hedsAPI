import { HedsTapes, UserCollection } from '@/models/common';
import { erc721ABI } from 'wagmi';



const formatReadContractArgs = (wallet: string, hedsTapes: HedsTapes): any => {
  if (wallet && hedsTapes) {
    const collectionData =
      Object.values(hedsTapes)
        .filter((tape) => tape?.contract?.length)
        .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name } }), {}) || {};
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
