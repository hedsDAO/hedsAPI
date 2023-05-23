import { useSelector } from 'react-redux';
import { Box, Heading, Flex, Stack, Text, Tooltip, useBoolean, Button, Avatar } from '@chakra-ui/react';
import { store } from '@/store';
import { Vote } from '@/pages/vote/models/voteModel';
import { formatWallet } from '@/utils';

export const VoterResults = () => {
  const votes = useSelector(store.select.voteModel.selectVotes);

  return (
    <Stack my={2} border="1px" borderColor="gray.700" borderRadius="md" p={1} overflow="scroll" maxWidth="20%" height="500px">
      {votes.length > 0 && votes.sort((a, b) => b.vp - a.vp).map((vote) => <VoterCard vote={vote} key={vote.voter} />)}
    </Stack>
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
    <Box border="1px" borderColor="gray.400" borderRadius="md" px={1} bgColor="gray.50">
      <Flex justifyContent="space-between" px={1} py={2}>
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
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
            {vp} HED
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
