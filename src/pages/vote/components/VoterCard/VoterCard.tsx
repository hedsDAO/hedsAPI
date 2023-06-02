import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import { Link } from 'react-router-dom';

interface OwnProps {
  displayName: string;
  profilePicture: string;
  wallet: string;
  vp: number;
  votesObject: { [id: number]: number };
  handleVoterChoices: (votesObj: { [id: number]: number }) => void;
}

export const VoterCard = ({ displayName, profilePicture, wallet, vp, votesObject, handleVoterChoices }: OwnProps) => {
  return (
    <Box
      border="1px"
      borderColor="#9293FF"
      borderRadius="md"
      px={1}
      bgColor="#745CBA"
      onMouseEnter={() => handleVoterChoices(votesObject)}
      onMouseLeave={() => handleVoterChoices({})}
      _hover={{ cursor: 'auto', bgColor: '#DC89FF' }}
    >
      <Flex justifyContent="space-between" p={1}>
        <Flex gap={2} alignItems={'center'}>
          <Avatar
            as={Link}
            to={`/u/${wallet.toLowerCase()}`}
            _hover={{ cursor: 'pointer' }}
            borderRadius={'sm'}
            src={profilePicture}
            size="md"
          />
          <Text fontSize="xs" fontFamily="space" letterSpacing="wide" textColor="white">
            {displayName || formatWallet(wallet)}
          </Text>
        </Flex>
        <Flex gap={2} alignItems="center">
          <Text fontSize="xs" fontFamily="space" letterSpacing="wide" color="white">
            {vp} HED
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
