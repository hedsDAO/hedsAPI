import { Avatar, Badge, Flex, Stack, Text } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { TrackType } from '../store/songModel';

interface OwnProps {
  artist: string;
  wallet: string;
  subId: string;
  subImage: string;

  type?: TrackType;
}

export const TapeDataTab = ({ artist, wallet, subId, subImage, type }: OwnProps) => {
  const renderTrackType = (type: TrackType) => {
    if (type === TrackType.SUBMISSION) return <Badge colorScheme={'green'}>Submission</Badge>;
  };

  return (
    <Flex>
      <Stack w="50%">
        <Flex>
          <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
            ARTIST:
          </Text>
          <Text fontSize="sm" fontWeight="light">
            {artist}
          </Text>
        </Flex>
        <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
          PUBLISHED:
        </Text>
        <Flex>
          <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
            RELEASE TYPE:
          </Text>
          {renderTrackType(type)}
        </Flex>
      </Stack>
      <Stack w="50%">
        <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
          AI DESCRIPTION:
        </Text>
        <Flex>
          <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
            SUBMISSION ID:
          </Text>
          <Text fontSize="sm" fontWeight="light" pr="0.5rem">
            {subId}
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="sm" fontWeight="extrabold" alignItems="center" pr="0.5rem">
            AVATAR:
          </Text>
          <Avatar name="artist sub image" size="xs" src={subImage} alignSelf="center" />
        </Flex>
      </Stack>
    </Flex>
  );
};
