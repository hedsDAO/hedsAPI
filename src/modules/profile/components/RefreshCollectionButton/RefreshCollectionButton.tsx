import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { formatReadContractArgs } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContractReads } from 'wagmi';

const RefreshCollectionButton = ({ loading, profileData }: { loading: boolean; profileData: User }) => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  useContractReads({
    contracts: formatReadContractArgs(profileData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: isFetching,
    onSuccess(data) {
      if (data?.length) {
        dispatch.profileModel.updateUserCollection([profileData?.wallet?.toLowerCase(), data]);
      }
    },
    onSettled() {
      setIsFetching(false);
    },
  });

  useEffect(() => {
    if (!loading && profileData?.wallet && !profileData?.collection) setIsFetching(true);
    return () => setIsFetching(false);
  }, [loading, profileData]);

  return (
    <Button bg="gray.200" color="blackAlpha.900" onClick={() => setIsFetching(true)}>
      <IconRefresh height={12} width={12} />
    </Button>
  );
};

export default RefreshCollectionButton;
