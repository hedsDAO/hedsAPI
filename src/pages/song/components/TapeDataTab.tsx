import { Avatar, Badge, Flex, Stack, Text } from '@chakra-ui/react';
import { TrackType } from '../store/songModel';
import { DateTime } from 'luxon';

interface OwnProps {
  artist: string;
  wallet: string;
  subId: string;
  subImage: string;
  created?: number;
  type?: TrackType;
}

export const TapeDataTab = ({ artist, wallet, subId, subImage, created, type }: OwnProps) => {
  const renderTrackType = (type: TrackType) => {
    if (type === TrackType.SUBMISSION) return <Badge colorScheme={'green'}>Submission</Badge>;
  };

  const date = DateTime.fromMillis(created).toLocaleString({ month: 'numeric', day: 'numeric', year: 'numeric' });

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
        <Flex>
          <Text fontSize="sm" fontWeight="extrabold" pr="0.5rem">
            PUBLISHED:
          </Text>
          <Text fontSize="sm" fontWeight="light">
            {date}
          </Text>
        </Flex>
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
        <Text fontSize="sm" fontWeight="light">
          The sample includes recordings from an original TR-808, a Moog MiniMoog Model D, a Yamaha CS-80 and more. Sounds were recorded through a Universal
          Audio Apollo 16.
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
