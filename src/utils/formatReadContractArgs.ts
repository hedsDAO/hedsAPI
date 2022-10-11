import { UserCollection } from '@/pages/user/store/common';
import { erc721ABI } from 'wagmi';

const formatReadContractArgs = (wallet: string, tapeDataForOwnership: UserCollection): Array<any> => {
  if (wallet && tapeDataForOwnership)
    return Object.keys(tapeDataForOwnership).map((key) => ({
      addressOrName: key,
      functionName: 'balanceOf',
      contractInterface: erc721ABI,
      args: wallet,
    }));
};

export default formatReadContractArgs;
