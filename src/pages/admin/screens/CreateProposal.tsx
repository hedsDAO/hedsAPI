import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

// Components
import { Box, Button, Select, Stack, Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

export const CreateProposal = () => {
  const dispatch = useDispatch<Dispatch>();
  const tapes = useSelector(store.select.tapesModel.selectAllTapes);
  const currentTape = useSelector(store.select.tapeModel.selectCurrentTape);
  const [tapeId, setTapeId] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    dispatch.tapesModel.getTapes();
  }, []);

  useEffect(() => {
    if (tapeId) dispatch.tapeModel.getTape(tapeId);
  }, [tapeId]);

  const handleClick = () => {
    console.log('currentTape', currentTape);
  };

  return (
    <Box pt={2} px={5} maxW="7xl" mx="auto">
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl isRequired>
          <FormLabel color="gray.200">Select tape</FormLabel>
          {tapes.length && (
            <Select borderColor="gray.400" color="white" placeholder="Select tape" onChange={(e) => setTapeId(e.target.value)}>
              {tapes.map((tape) => {
                return (
                  <option key={tape.id} value={tape.id}>
                    {tape.name}
                  </option>
                );
              })}
            </Select>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Description</FormLabel>
          <Textarea borderColor="gray.400" color="white" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
      </Stack>
      <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
        <Button colorScheme="blue" onClick={handleClick}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};
