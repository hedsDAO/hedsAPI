import { Button } from '@chakra-ui/react';
import { formatContractArgs } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useContractReads } from 'wagmi';

export const RefreshCollectionButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const isFetchingCollection = useSelector(store.select.userModel.selectIsFetchingCollection);
  const currentWallet = useSelector(store.select.userModel.selectWallet);
  const prevUserData = useSelector(store.select.userModel.selectUser);
  const collectionArgs = useSelector(store.select.userModel.selectCollectionArgs);
  const { isLoading } = useContractReads({
    contracts: formatContractArgs(currentWallet),
    cacheOnBlock: true,
    staleTime: 5000000,
    enabled: isFetchingCollection,
    structuralSharing: true,
    onSuccess(data) {
      dispatch.userModel.setIsFetchingCollection(false);
      dispatch.userModel.updateUserCollection([data, collectionArgs, prevUserData]);
    },
    onError(err) {
      dispatch.userModel.setIsFetchingCollection(false);
    },
  });

  return (
    <Button
      bg="heds.100"
      rounded="sm"
      onClick={() => dispatch.userModel.setIsFetchingCollection(true)}
      isLoading={isLoading}
      mr={{ base: 3, lg: 1 }}
      size="xs"
    >
      <i className="fas fa-arrows-rotate" />
    </Button>
  );
};
