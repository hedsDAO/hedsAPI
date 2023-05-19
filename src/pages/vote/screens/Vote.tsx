import { Button } from '@chakra-ui/react';
import { createClient } from 'hedsvote';
import { useSigner } from 'wagmi';
import mockProposal from './mocks';
import { Proposal } from './models';

export const Vote = () => {
  const { data: signer } = useSigner();
  const { createSpace, createProposal } = createClient();

  const handleCreateSpace = async () => {
    try {
      const spaceData = {
        name: 'test',
        authors: ['0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF', '0x55C59AE5b124261d021421f07C6cad699C993b3d', '0x3a62e7e7Ff39927f687C560C106fCdBC820BB976'],
      };
      const newSpace = await createSpace(signer, spaceData);
      console.log(newSpace);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProposal = async () => {
    try {
      const proposal = await createProposal(signer, mockProposal);
      console.log(proposal);
    } catch (e) {
      console.error(e);
    }
  };

  const takeProposal = (proposal: Proposal) => {
    return proposal;
  };

  takeProposal(mockProposal);

  return <Button onClick={handleCreateProposal}>Click</Button>;
};
