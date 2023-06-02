import { TapeCollectionArg } from '@/models/common';
import { erc721ABI } from 'wagmi';

const formatContractArgs = (collectionArgs: TapeCollectionArg[], wallet: string) => {
  if (collectionArgs?.length)
    return collectionArgs
      .filter(collection => collection.contract)
      .map((collection) => ({
        address: collection.contract.toLowerCase() as `0x${string}`,
        functionName: 'balanceOf',
        abi: erc721ABI,
        args: [wallet],
        chainId: 1,
      }));
  else return [];
};

export default formatContractArgs;
