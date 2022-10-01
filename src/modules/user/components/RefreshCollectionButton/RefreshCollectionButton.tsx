import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { formatReadContractArgs } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContractReads } from 'wagmi';

const RefreshCollectionButton = ({ userData }: { userData: User }) => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data } = useContractReads({
    contracts: formatReadContractArgs(userData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: !userData?.collection || isFetching,
  });
  useEffect(() => {
    if (!userData?.collection) setIsFetching(true);
  }, [userData]);

  useEffect(() => {
    if (isFetching && data?.length && userData?.wallet) {
      dispatch.userModel.updateUserCollection([userData?.wallet, data]);
      setIsFetching(false);
    }
  }, [data, isFetching]);

  return (
    <Button bg="gray.200" color="blackAlpha.900" onClick={() => setIsFetching(true)}>
      <IconRefresh height={12} width={12} />
    </Button>
  );
};

export default RefreshCollectionButton;
