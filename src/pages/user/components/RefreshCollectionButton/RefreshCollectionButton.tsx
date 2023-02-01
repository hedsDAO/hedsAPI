import { Dispatch, store } from '@/store';
import { formatReadContractArgs, isEmpty } from '@/utils';
import { Button, Tooltip } from '@chakra-ui/react';
import { IconHourglass, IconRefresh } from '@tabler/icons';
import { Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContractReads } from 'wagmi';
import { Result } from 'ethers/lib/utils';
import { DateTime } from 'luxon';
import { useLocation } from 'react-router-dom';
import * as gaEvents from '@/events';

const RefreshCollectionButton = () => {
  const { pathname } = useLocation();
  const now = DateTime.now().setZone('utc').toMillis();
  const dispatch = useDispatch<Dispatch>();
  const hedsTapes = useSelector(store.select.tapesModel.selectAllHedsTapes);
  const allTapeData = useSelector(store.select.tapesModel.selectAllTapeData);
  const wallet = useSelector(store.select.userModel.selectCurrentUserWallet);
  const displayName = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const userCollection = useSelector(store.select.userModel.selectCurrentUserCollection);
  const { data, refetch, isLoading, isFetching, isRefetching } = useContractReads({
    contracts: formatReadContractArgs(wallet, allTapeData),
    cacheOnBlock: true,
    staleTime: 5000000,
    watch: true,
    enabled: false,
    structuralSharing: true,
    onSuccess(data: Result[]) {
      handleUpdateCollection(data);
    },
    onError(err) {},
  });

  const handleUpdateCollection = useCallback(
    (data: Result[]) => {
      if (data?.length && !isEmpty(allTapeData)) {
        dispatch.userModel.updateCurrentUserCollection([wallet?.toLowerCase(), data, allTapeData]);
      }
    },
    [data],
  );
  return (
    <Fragment>
      {now - userCollection?.lastUpdated < 30000 && userCollection?.lastUpdated !== 0 ? (
        <Tooltip placement="top" label="updated < 30s ago">
          <Button
            bg={'gray.50'}
            borderColor={'gray.700'}
            border={'1px'}
            rounded="sm"
            className="bg-transparent hover:scale-110 ease-in-out duration-500 delay-75"
            size="xs"
            isDisabled={!isEmpty(hedsTapes) || !wallet?.length || now - userCollection?.lastUpdated < 30000}
            isLoading={isFetching || isRefetching || isLoading}
            color="purple.800"
          >
            <IconHourglass className="hover:scale-110 ease-in-out" height={14} width={14} />
          </Button>
        </Tooltip>
      ) : (
        <Button
          rounded="sm"
          borderColor={'gray.700'}
          border={'1px'}
          bg={'gray.50'}
          className="bg-transparent hover:scale-110 ease-in-out duration-500 delay-75"
          size="xs"
          disabled={!isEmpty(hedsTapes) && !wallet?.length}
          isLoading={isFetching || isRefetching || isLoading}
          color="purple.800"
          onClick={() => {
            gaEvents.clickRefreshCollection(displayName);
            refetch().then(() => refetch());
          }}
        >
          <IconRefresh className="hover:scale-110 ease-in-out" height={14} width={14} />
        </Button>
      )}
    </Fragment>
  );
};

export default RefreshCollectionButton;
