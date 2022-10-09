import { formatReadContractArgs, isEmpty } from '@/utils';
import { useContractReads } from 'wagmi';
import { useDispatch } from 'react-redux';
import { Dispatch, store } from '@/store';
import { User } from '@/modules/profile/models/common';

const useTapeOwnership = (userData: User) => {
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data, isError, isLoading, isRefetching, isFetching, refetch } = useContractReads({
    contracts: formatReadContractArgs(userData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: isEmpty(userData.collection),
  });
  if (data?.length && userData?.wallet && isRefetching) dispatch.userModel.updateUserCollection([userData?.wallet, data]);
  return { data, isError, isLoading, refetch, isRefetching, isFetching };
};

export default useTapeOwnership;
