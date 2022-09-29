import { useContractReads, erc721ABI } from 'wagmi';

export const useTapeOwnership = () => {
    
  const getTapeOwnership = (wallet: string, tapeDataForOwnership: any) => {
    console.log(tapeDataForOwnership, '1');
    console.log(wallet, '2');
    if (tapeDataForOwnership && wallet) {
      const contractArgs = Object.entries(tapeDataForOwnership).map(([key, value]) => ({
        addressOrName: key,
        functionName: 'balanceOf',
        contractInterface: erc721ABI,
        args: wallet,
      }));
      console.log(contractArgs, 'args');
      

    }
    return 'sorry';
  };
  return { getTapeOwnership };
};
