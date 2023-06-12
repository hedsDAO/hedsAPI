import { useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const CuratorWallet = ({ handleCuratorWallet, goToPrevious }: { handleCuratorWallet: (wallet: string) => void; goToPrevious: () => void }) => {
  const [wallet, setWallet] = useState<string>('');
  return (
    <Box maxW="md" mx="auto" mt={12}>
      <FormControl>
        <FormLabel color="white">Curator wallet address</FormLabel>
        <Input value={wallet} onChange={(e) => setWallet(e.target.value)} />
      </FormControl>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button onClick={() => handleCuratorWallet(wallet)}>next</Button>
      </Flex>
    </Box>
  );
};
