import { useContractReads } from 'wagmi';

export const useCollection = (contractArgs: any) => {
  if (contractArgs) {
    const { data, isLoading } = useContractReads({
      contracts: contractArgs,
      cacheOnBlock: true,
      staleTime: 5000000,
      watch: true,
      enabled: false,
      structuralSharing: true,
      onSuccess(data) {},
      onError(err) {},
    });
    return { data, isLoading };
  } else return;
};
