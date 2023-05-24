import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Text } from '@chakra-ui/react';
import { VoterCard } from '@/pages/vote/components/VoterCard/VoterCard';
import { Dispatch, store } from '@/store';

export const VoterResults = () => {
  const dispatch = useDispatch<Dispatch>();
  const votes = useSelector(store.select.voteModel.selectVotes);
  const userResultsInfo = useSelector(store.select.voteModel.selectUserResultsInfo);

  useEffect(() => {
    if (votes.length) {
      const wallets = votes.map((vote) => vote.voter);
      dispatch.voteModel.getManyUsers(wallets);
    }
  }, [votes]);

  useEffect(() => {
    console.log(Object.keys(userResultsInfo).length > 0);
  }, [userResultsInfo]);

  return (
    <Box pt={4}>
      <Box border="1px" borderRadius="md" p={4} borderColor="#745CBA" bgColor="#4F4F4F">
        <Text color="white" fontSize="xs" textAlign="center">
          Voting is closed. For more info please visit heds twitter or discord
        </Text>
        <Box borderRadius="md" textAlign="center" bgColor="#3C3C3C" py={2} mt={2}>
          <Text color="white" fontSize="xs">
            VOTING IS CLOSED
          </Text>
        </Box>
      </Box>
      <Stack my={2} border="1px" borderColor="#745CBA" borderRadius="md" bgColor="#4F4F4F" overflowY="scroll" height="500px" py={2} px={2}>
        {votes.length > 0 &&
          Object.keys(userResultsInfo).length > 0 &&
          votes
            .sort((a, b) => b.vp - a.vp)
            .map((vote) => {
              const { vp, voter } = vote;
              const wallet = voter.toLowerCase();
              return (
                <VoterCard
                  displayName={userResultsInfo[wallet].display_name}
                  profilePicture={userResultsInfo[wallet].profile_picture}
                  vp={vp}
                  wallet={voter}
                  key={voter}
                />
              );
            })}
      </Stack>
    </Box>
  );
};
