import { formatReadContractArgs, isEmpty } from '@/utils';
import { useContractReads } from 'wagmi';
import { useDispatch } from 'react-redux';
import { Dispatch, store } from '@/store';
import { User } from '@/modules/profile/models/common';

const useTapeOwnership = (profileData: User) => {
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data, isError, isLoading, isRefetching, isFetching, refetch } = useContractReads({
    contracts: formatReadContractArgs(profileData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: isEmpty(profileData.collection),
  });
  if (data?.length && profileData?.wallet && isRefetching) dispatch.profileModel.updateUserCollection([profileData?.wallet, data]);
  return { data, isError, isLoading, refetch, isRefetching, isFetching };
};

export default useTapeOwnership;
