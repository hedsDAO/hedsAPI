import { Dispatch, store } from '@/store';
import { formatReadContractArgs, isEmpty } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContractReads } from 'wagmi';
import { Result } from 'ethers/lib/utils';

const RefreshCollectionButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const hedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const allTapeData = useSelector(store.select.tapesModel.selectAllTapeData);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const { data, refetch, isLoading, isFetching, isRefetching } = useContractReads({
    contracts: formatReadContractArgs(wallet, allTapeData),
    allowFailure: true,
    cacheOnBlock: true,
    staleTime: 5000000,
    enabled: false,
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    onSuccess(data) {
      handleUpdateCollection(data);
    },
    onSettled() {},
    onError(err) {},
  });

  const handleUpdateCollection = useCallback(
    (data: Result[]) => {
      if (data?.length && !isEmpty(allTapeData)) {
        if (wallet === connectedWallet) dispatch.userModel.updateConnectedUserCollection([wallet?.toLowerCase(), data, allTapeData]);
        dispatch.userModel.updateCurrentUserCollection([wallet?.toLowerCase(), data, allTapeData]);
      }
    },
    [data],
  );

  return (
    <Button
      bg={'transparent'}
      className="bg-transparent hover:scale-110 ease-in-out duration-500 delay-75"
      size="sm"
      disabled={!isEmpty(hedsTapes) && !wallet?.length}
      isLoading={isFetching || isRefetching || isLoading}
      color="blackAlpha.900"
      onClick={() => refetch().then(() => refetch())}
    >
      <IconRefresh className="hover:scale-110 ease-in-out" height={14} width={14} />
    </Button>
  );
};

export default RefreshCollectionButton;
