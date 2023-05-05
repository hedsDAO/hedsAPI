import { SongEvents, SongEventTypes } from '@/models/common';
import { getTimePassed } from '@/utils';
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';

const songEventIcon = (eventType: string) => {
  switch (eventType) {
    case SongEventTypes.SUBMISSION:
      return (
        <Box opacity={'100%'} color={'white'} position={'absolute'} w={{ base: '19px', lg: '20px' }}>
          <i className="fa-solid fa-waveform-lines"></i>
        </Box>
      );
    case SongEventTypes.PLACEMENT:
      return (
        <Box opacity={'100%'} color={'white'} position={'absolute'} w={{ base: '15px', lg: '16px' }}>
          <i className="fa-solid fa-party-horn"></i>
        </Box>
      );
    case SongEventTypes.SONG_LIKE:
      return (
        <Box opacity={'100%'} color={'red.500'} position={'absolute'} w={{ base: '15px', lg: '16px' }}>
          <i className="fa-solid fa-heart"></i>
        </Box>
      );
  }
};

const songEventIconBg = (eventType: string) => {
  switch (eventType) {
    case SongEventTypes.SUBMISSION:
      return 'heds.700';
    case SongEventTypes.PLACEMENT:
      return 'heds.700';
    case SongEventTypes.SONG_LIKE:
      return 'white';
  }
};

const SongEvent = ({ event_type, event_data, event_timestamp }: SongEvents) => {
  return (
      <Flex p={1.5} alignItems="center" gap={5}>
        <Center rounded="lg" bg={songEventIconBg(event_type)}>
          <Box opacity={'0%'} shadow={'lg'} rounded={'lg'} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
          {songEventIcon(event_type)}
        </Center>
        <Stack justifyContent={'center'}>
          <Flex alignItems={'baseline'} gap={1.5}>
            <Text fontFamily="inter" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'widest'} color={'white'}>
              {event_data.message}
            </Text>
          </Flex>
          <Text mt={'0 !important'} opacity="60%" fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'white'}>
            {event_data.subject}
          </Text>
        </Stack>
        <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="inter" fontSize="2xs" color={'white'} opacity={'60%'}>
          {getTimePassed(event_timestamp)}
        </Text>
      </Flex>
  );
};

export default SongEvent;
