import { User } from '@/models/common';
import { Dispatch, store } from '@/store';
import { formatReadContractArgs, isEmpty } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContractReads } from 'wagmi';

const RefreshCollectionButton = ({ profileData }: { profileData: User }) => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const collectionTapeData = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const { data, isRefetching, refetch } = useContractReads({
    contracts: formatReadContractArgs(profileData?.wallet, collectionTapeData) || [],
    allowFailure: true,
    enabled: isEmpty(profileData.collection) || isFetching,
  });
  useEffect(() => {

    if (data?.length && profileData?.wallet && isEmpty(profileData?.collection)) dispatch.profileModel.updateUserCollection([profileData?.wallet, data]);
  }, [data]);

  useEffect(() => {
    if (isFetching && data?.length && profileData?.wallet) {
      dispatch.profileModel.updateUserCollection([profileData?.wallet, data]);
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
