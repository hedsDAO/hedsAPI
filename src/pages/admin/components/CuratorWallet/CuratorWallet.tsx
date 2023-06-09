import { Box, Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const CuratorWallet = ({ goToNext, goToPrevious }: { goToNext: () => void; goToPrevious: () => void }) => {
  return (
    <Box maxW="md" mx="auto" mt={12}>
      <FormControl>
        <FormLabel color="white">Curator wallet address</FormLabel>
        <Input />
      </FormControl>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button onClick={goToNext}>next</Button>
      </Flex>
    </Box>
  );
};
