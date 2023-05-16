import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button } from '@chakra-ui/react';
import { useContractReads } from 'wagmi';
import { DateTime } from 'luxon';
import { formatContractArgs } from '@/utils';
import * as styles from '@/pages/user/components/RefreshCollectionButton/styles';

export const RefreshCollectionButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const isFetchingCollection = useSelector(store.select.userModel.selectIsFetchingCollection);
  const currentWallet = useSelector(store.select.userModel.selectWallet);
  const prevUserData = useSelector(store.select.userModel.selectUser);
  const collectionArgs = useSelector(store.select.userModel.selectCollectionArgs);
  const now = DateTime.now().toMillis();
  const oneMinute = 60000;

  const { isLoading } = useContractReads({
    contracts: formatContractArgs(collectionArgs, currentWallet),
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
      {...styles.$buttonStyles}
      isDisabled={now - prevUserData?.collection?.lastUpdated < oneMinute}
      onClick={() => dispatch.userModel.setIsFetchingCollection(true)}
      isLoading={isLoading}
    >
      <i className="fas fa-arrows-rotate" />
    </Button>
  );
};
