import { useSelector } from 'react-redux';
import { Avatar, Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import { store } from '@/store';

interface OwnProps {
  displayName: string;
  profilePicture: string;
  wallet: string;
  vp: number;
  votesObject: { [id: number]: number };
}

export const VoterCard = ({ displayName, profilePicture, wallet, vp, votesObject }: OwnProps) => {
  const choices = useSelector(store.select.voteModel.selectChoices);
  const formatChoiceSelection = (voteObject: { [id: string]: number }) => {
    const totalScore = Object.values(voteObject).reduce((a, b) => a + b, 0);
    const selectedChoices = Object.keys(voteObject).map((id) => {
      const choiceId = parseInt(id) - 1;
      const choice = choices[choiceId];
      const percentage = +((voteObject[id] / totalScore) * 100).toFixed(2);
      return `${percentage}% for ${choice?.name ? choice.name : ''}`;
    });
    return selectedChoices.join(', ');
  };

  return (
    <Tooltip label={formatChoiceSelection(votesObject)}>
      <Box border="1px" borderColor="#9293FF" borderRadius="md" px={1} bgColor="#745CBA">
        <Flex justifyContent="space-between" p={1}>
          <Flex gap={2} alignItems={'center'}>
            <Avatar
              // onClick={() => navigate(`/u/${vote.voter.toLowerCase()}`)}
              borderRadius={'sm'}
              src={profilePicture}
              size="md"
            />
            <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide" textColor="white">
              {displayName || formatWallet(wallet)}
            </Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide" color="white">
              {vp} HED
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Tooltip>
  );
};
