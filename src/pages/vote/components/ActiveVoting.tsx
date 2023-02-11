import { Heading, Stack } from '@chakra-ui/react';
import { VoteChoice } from '../store/voteModel';

interface OwnProps {
  voteOptions: VoteChoice[];
}

export const ActiveVoting = () => {
  return (
    <>
      <Heading
        py={{ base: 0, lg: 2 }}
        className="animate__animated animate__fadeIn"
        fontWeight="light"
        letterSpacing="widest"
        size={['xs', 'sm']}
        color={'gray.900'}
      >
        VOTES
      </Heading>
      <Stack border="1px" borderColor="gray.700" borderRadius="md" p={1}></Stack>
    </>
  );
};
