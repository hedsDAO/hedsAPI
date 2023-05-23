import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { Dispatch, store } from '@/store';
import { Vote } from '@/pages/vote/models/voteModel';
import { formatWallet } from '@/utils';
import { getManyUsersByWalletId } from '@api/user';

export const VoterResults = () => {
  const dispatch = useDispatch<Dispatch>();
  const votes = useSelector(store.select.voteModel.selectVotes);

  const handleFetch = async () => {
    if (votes.length) {
      const wallets = votes.map((vote) => vote.voter);
      const response = await getManyUsersByWalletId(wallets);
      console.log('response', response);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

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
        {votes.length > 0 && votes.sort((a, b) => b.vp - a.vp).map((vote) => <VoterCard vote={vote} key={vote.voter} />)}
      </Stack>
    </Box>
  );
};

const VoterCard = ({ vote }: { vote: Vote }) => {
  const { voter, vp } = vote;
  // const choices = useSelector(store.select.voteModel.selectChoices);
  // const resultsUserData = useSelector(store.select.voteModel.selectResultsUserData);
  // const navigate = useNavigate();
  // const formatChoiceSelection = (voteObject: { [id: string]: number }) => {
  //   const totalScore = Object.values(voteObject).reduce((a, b) => a + b, 0);
  //   const selectedChoices = Object.keys(voteObject).map((id) => {
  //     const choiceId = parseInt(id) - 1;
  //     const choice = choices[choiceId];
  //     const percentage = +((voteObject[id] / totalScore) * 100).toFixed(2);
  //     return `${percentage}% for ${choice?.name ? choice.name : ''}`;
  //   });
  //   return selectedChoices.join(', ');
  // };

  return (
    <Box border="1px" borderColor="#9293FF" borderRadius="md" px={1} bgColor="#745CBA">
      <Flex justifyContent="space-between" p={1}>
        {/* <Flex gap={2} alignItems={'center'}>
          <Avatar
            onClick={() => navigate(`/u/${vote.voter.toLowerCase()}`)}
            borderRadius={'sm'}
            src={resultsUserData?.[vote.voter.toLowerCase()]?.profilePicture}
            size="xs"
          />
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
            {resultsUserData?.[vote.voter.toLowerCase()]?.displayName || formatWallet(voter)}
          </Text>
        </Flex> */}
        <Text>{formatWallet(voter)}</Text>
        <Flex gap={2} alignItems="center">
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide" color="white">
            {vp} HED
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
