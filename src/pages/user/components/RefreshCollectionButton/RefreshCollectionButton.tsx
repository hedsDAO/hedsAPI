import { Button } from '@chakra-ui/react';
import { formatContractArgs } from '@/utils';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useState } from 'react';
import { useContractReads } from 'wagmi';

export const RefreshCollectionButton = () => {
  const [enabled, setEnabled] = useState(false);
  const currentWallet = useSelector(store.select.userModel.selectWallet);
  const { data, isLoading } = useContractReads({
    contracts: formatContractArgs(currentWallet),
    cacheOnBlock: true,
    staleTime: 5000000,
    enabled: enabled,
    structuralSharing: true,
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {},
  });

  return (
    <Button onClick={() => setEnabled(true)} isLoading={isLoading} mr={{ base: 3, lg: 1 }} size="xs">
      <i className="fas fa-arrows-rotate" />
    </Button>
  );
};
