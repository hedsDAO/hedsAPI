import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const CuratorWallet = ({ goToNext }: { goToNext: () => void }) => {
  return (
    <Box maxW="sm">
      <FormControl>
        <FormLabel color="white">Curator wallet address</FormLabel>
        <Input />
      </FormControl>
      <Button onClick={goToNext}>next</Button>
    </Box>
  );
};
