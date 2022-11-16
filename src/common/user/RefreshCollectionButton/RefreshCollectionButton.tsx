import { Dispatch, RootState, store } from '@/store';
import { formatReadContractArgs, isEmpty } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContractReads } from 'wagmi';
import { Result } from 'ethers/lib/utils';
import { useLocation } from 'react-router-dom';

const RefreshCollectionButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const hedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const { pathname } = useLocation();
  const { data, refetch } = useContractReads({
    contracts: formatReadContractArgs(wallet, hedsTapes),
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
      if (data?.length && !isEmpty(hedsTapes)) {
        if (pathname.includes('/u')) dispatch.userModel.updateCurrentUserCollection([wallet?.toLowerCase(), data, hedsTapes]);
        else if (pathname.includes('/profile')) dispatch.userModel.updateConnectedUserCollection([wallet?.toLowerCase(), data, hedsTapes]);
      }
    },
    [data],
  );

  return (
    <Button
      bg={'transparent'}
      className="bg-transparent hover:rotate-180 ease-in-out duration-500 delay-75"
      size="sm"
      disabled={!isEmpty(hedsTapes) && !wallet?.length}
      color="blackAlpha.900"
      onClick={() => refetch().then(() => refetch())}
    >
      <IconRefresh className="hover:rotate-180 ease-in-out" height={14} width={14} />
    </Button>
  );
};

export default RefreshCollectionButton;
