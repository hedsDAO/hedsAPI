import { Box, Center, Flex, Image, Stack, Text } from '@chakra-ui/react';

export enum SongEventType {
  SUBMISSION = 'tape_submission',
  PLACEMENT = 'tape_placement',
}

interface SongEventProps {
  type: SongEventType;
  message: string;
  subject: string;
  timestamp: string;
}

const songEventIcon = (eventType: string) => {
  switch (eventType) {
    case SongEventType.SUBMISSION:
      return (
        <Box opacity={'100%'} color={'white'} position={'absolute'} zIndex="20" w={{ base: '19px', lg: '20px' }}>
          <i className="fa-solid fa-waveform-lines"></i>
        </Box>
      );
    case SongEventType.PLACEMENT:
      return (
        <Box opacity={'100%'} color={'white'} position={'absolute'} zIndex="20" w={{ base: '15px', lg: '16px' }}>
          <i className="fa-solid fa-party-horn"></i>
        </Box>
      );
  }
};

const SongEvent = ({ type, message, subject, timestamp }: SongEventProps) => {
  return (
    <Box mt={'0 !important'}>
      <Flex p={1.5} alignItems="center" gap={5}>
        <Center rounded="lg" bg="gray.700">
          <Box opacity={'0%'} shadow={'lg'} rounded={'lg'} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
          {songEventIcon(type)}
        </Center>
        <Stack justifyContent={'center'}>
          <Flex alignItems={'baseline'} gap={1.5}>
            <Text fontFamily="inter" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'widest'} color={'blackAlpha.700'}>
              {message}
            </Text>
          </Flex>
          <Text mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.500'}>
            {subject}
          </Text>
        </Stack>
        <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="inter" fontSize="2xs" letterSpacing={'widest'} color={'blackAlpha.600'}>
          {timestamp}
        </Text>
      </Flex>
    </Box>
  );
};

export default SongEvent;
