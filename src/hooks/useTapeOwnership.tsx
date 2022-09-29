import { UserCollection } from '@/modules/user/models/common';
import { formatReadContractArgs } from '@/utils';
import { useContractReads } from 'wagmi';

const useTapeOwnership = (wallet: string, tapeDataForOwnership?: UserCollection) => {
  const { data, isError, isLoading, isRefetching, refetch } = useContractReads({
    contracts: formatReadContractArgs(wallet, tapeDataForOwnership) || [],
    allowFailure: true,
  });
  return { data, isError, isLoading, refetch, isRefetching };
};

export default useTapeOwnership;
