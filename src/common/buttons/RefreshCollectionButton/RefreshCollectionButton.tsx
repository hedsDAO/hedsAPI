import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { formatReadContractArgs } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContractReads } from 'wagmi';

const RefreshCollectionButton = ({ userData, loading }: { userData: User; loading: boolean }) => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  useContractReads({
    contracts: formatReadContractArgs(userData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: !loading && !userData?.collection || isFetching,
    onSuccess(data) {
      if (data?.length) dispatch.userModel.updateUserCollection([userData?.wallet?.toLowerCase(), data]);
    },
    onSettled() {
      setIsFetching(false);
    },
  });

  useEffect(() => {
    if (!loading && !userData?.collection) setIsFetching(true);
    return () => setIsFetching(false);
  }, [loading, userData]);

  return (
    <Button bg="gray.200" color="blackAlpha.900" onClick={() => setIsFetching(true)}>
      <IconRefresh height={12} width={12} />
    </Button>
  );
};

export default RefreshCollectionButton;
