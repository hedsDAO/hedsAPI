import { selectUserCollection, selectUserWallet } from '@/pages/user/store/selectors';
import { Dispatch, RootState } from '@/store';
import { formatReadContractArgs, isEmpty } from '@/utils';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useContractReads } from 'wagmi';

const RefreshCollectionButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const hedsTapes = useSelector((state: RootState) => state.tapesModel.hedsTapes);
  const collection = useSelector(selectUserCollection);
  const wallet = useSelector(selectUserWallet);
  const { data, refetch } = useContractReads({
    contracts: formatReadContractArgs(wallet, hedsTapes),
    allowFailure: true,
    enabled: false,
    structuralSharing: (prev, next) => (prev === next ? prev : next),
    onSuccess(data) {
      handleUpdateCollection();
    },
    onSettled() {
      setIsFetching(false);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleUpdateCollection = useCallback(() => {
    if (data?.length) dispatch.userModel.updateUserCollection([wallet?.toLowerCase(), data, hedsTapes]);
  }, [data]);

  return (
    <Button
      bg={'transparent'}
      className="bg-transparent hover:rotate-180 ease-in-out duration-500 delay-75"
      size="sm"
      disabled={!isEmpty(hedsTapes) && !wallet?.length}
      color="blackAlpha.900"
      onClick={() => refetch()}
    >
      <IconRefresh className="hover:rotate-180 ease-in-out" height={14} width={14} />
    </Button>
  );
};

export default RefreshCollectionButton;
