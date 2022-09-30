import { UserCollection } from '@/modules/user/models/common';
import { formatReadContractArgs } from '@/utils';
import { useContractReads } from 'wagmi';

const useTapeOwnership = (wallet: string, tapeDataForOwnership?: UserCollection) => {
  const { data, isError, isLoading, isRefetching, isFetching, refetch } = useContractReads({
    contracts: formatReadContractArgs(wallet, tapeDataForOwnership) || [],
    allowFailure: true,
  });
  return { data, isError, isLoading, refetch, isRefetching, isFetching };
};

export default useTapeOwnership;
