import { formatWallet } from '@/utils';
import { SkeletonText } from '@chakra-ui/react';
import { useEnsName } from 'wagmi';

const FetchEns = ({ address }: { address: string }) => {
  const { data, isError, isLoading } = useEnsName({
    // @ts-ignore
    address: address,
  });
  if (isError || !data?.length) return <>{formatWallet(address)}</>;
  if (isLoading) return <SkeletonText skeletonHeight={3} />;
  return <>{data}</>;
};

export default FetchEns;
