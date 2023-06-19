import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Dispatch } from '@/store';

import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const CuratorWallet = ({ goToNext, goToPrevious }: { goToNext: () => void; goToPrevious: () => void }) => {
  const [wallet, setWallet] = useState<string>('');
  const dispatch = useDispatch<Dispatch>();

  const handleClick = () => {
    dispatch.adminModel.setCuratorWallet(wallet);
    goToNext();
  };

  return (
    <Box maxW="md" mx="auto" mt={12}>
      <FormControl>
        <FormLabel color="white">Curator wallet address</FormLabel>
        <Input borderColor="gray.400" color="white" value={wallet} onChange={(e) => setWallet(e.target.value)} />
      </FormControl>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button colorScheme="teal" onClick={handleClick}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
