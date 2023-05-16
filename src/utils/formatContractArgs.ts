import { TapeCollectionArg } from '@/models/common';
import { erc721ABI } from 'wagmi';

const formatContractArgs = (collectionArgs: TapeCollectionArg[], wallet: string) => {
  return Object.keys(collectionArgs).map((key) => ({
    address: key.toLowerCase() as `0x${string}`,
    functionName: 'balanceOf',
    abi: erc721ABI,
    args: [wallet],
    chainId: 1,
  }));
};

export default formatContractArgs;
