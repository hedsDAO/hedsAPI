import { store } from '@/store';
import { Button } from '@chakra-ui/react';
import { IconRefresh } from '@tabler/icons';
import { useContractReads, erc721ABI } from 'wagmi';

const ProfileCollection = ({ wallet, loading }: { wallet: string; loading: boolean }) => {
  const tapeDataForOwnership = store.select.tapesModel.getTapeDataForOwnership(store.getState());
  const contractArgs = tapeDataForOwnership ? Object.entries(tapeDataForOwnership).map(([key, value]) => ({
    addressOrName: key,
    functionName: 'balanceOf',
    contractInterface: erc721ABI,
    args: wallet,
  })) : [];
  console.log(contractArgs, 'args');
  const { data } = useContractReads({
    contracts: contractArgs || [],
    onSuccess(data) {
      console.log(data, 'yay!');
      return data;
    },
    onError(err) {
      console.log(err);
    },
  });
  console.log(data)
  return (
    <Button onClick={() => {}}>
      <IconRefresh height={8} width={8} />
    </Button>
  );
};

export default ProfileCollection;
