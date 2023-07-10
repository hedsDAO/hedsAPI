import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useBlockNumber } from 'wagmi';

// Components
import { Box, Button, Select, Stack, Text, Flex, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

// Utils
import { createClient, Proposal } from 'hedsvote';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { formatProposalPayload, formatStrategiesPayload } from '@/pages/admin/helpers';
import { editTape } from '@/api/tape';

// Constants
import { adminWallets } from '@/pages/admin/model/constants';

export const CreateProposal = () => {
  const dispatch = useDispatch<Dispatch>();

  const adminWallet = useSelector(store.select.authModel.selectWallet);
  const tapes = useSelector(store.select.tapesModel.selectAllTapes);
  const currentTape = useSelector(store.select.tapeModel.selectCurrentTape);
  const artistsWallets = useSelector(store.select.adminModel.selectAllArtistsWallets);

  const [tapeId, setTapeId] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { data: block } = useBlockNumber();
  const client = createClient();
  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

  useEffect(() => {
    dispatch.tapesModel.getTapes();
    dispatch.adminModel.getArtists();
  }, []);

  useEffect(() => {
    if (tapeId) dispatch.tapeModel.getTape(tapeId);
  }, [tapeId]);

  const isFormDisabled = () => {
    if (!tapeId || !description) return true;
    return false;
  };

  const handleClick = async () => {
    const signer = await connector?.getSigner();
    const formattedProposal = formatProposalPayload(currentTape);
    const formattedStrategies = formatStrategiesPayload(artistsWallets);

    const proposalPayload: Proposal = {
      ...formattedProposal,
      author: adminWallet,
      block,
      description,
      spaceName: 'test',
      title: currentTape.name,
      strategies: formattedStrategies,
    };
    const newProposal = await client.createProposal(signer, proposalPayload);

    if (typeof newProposal !== 'string') {
      console.log(newProposal.data.ipfsHash);
      // editTape(tapeId, newProposal.data.ipfsHash);
    }
  };

  return (
    <Box pt={12} px={5} maxW="3xl" mx="auto" height="fit-content">
      {adminWallets.includes(adminWallet) ? (
        <>
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
            <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
              <Button colorScheme="blue" onClick={handleClick} isDisabled={isFormDisabled()}>
                Submit
              </Button>
            </Flex>
          </Stack>
        </>
      ) : (
        <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
          You are not authorized to create a tape
        </Text>
      )}
    </Box>
  );
};
