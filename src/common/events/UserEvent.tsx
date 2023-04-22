import { UserEvents, UserEventTypes } from '@/models/common';
import { Box, Center, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { getTimePassed } from '@/utils';

const UserEventIcons = {
  [UserEventTypes.USER_CREATED]: (
    <Box opacity={'100%'} color={'white'} position={'absolute'} zIndex="20" w={{ base: '19px', lg: '16px' }}>
      <i className="fa-solid fa-headphones"></i>
    </Box>
  ),
};

export const UserEvent = ({ name, event }: { name: string; event: UserEvents }) => {
  return (
    <Box data-testid="user-event-item">
      <Flex p={1} alignItems="center" gap={5}>
        <Center rounded="lg" bg="heds.700">
          <Box opacity={'0%'} shadow={'lg'} rounded={'lg'} w={{ base: '10', lg: '12' }} h={{ base: '10', lg: '12' }} />
          {UserEventIcons[event.event_type]}
        </Center>
        <Stack justifyContent={'center'}>
          <Flex alignItems={'baseline'} gap={1}>
            <Text fontWeight={'bold'} opacity={'70%'} fontFamily="karla" fontSize={{ base: 'xs', lg: 'sm' }} letterSpacing={'wide'} color={'white'}>
              {name}
            </Text>
            <Text opacity={'70%'} fontFamily="karla" fontSize={{ base: '2xs', lg: 'xs' }} letterSpacing={'wide'} color={'white'}>
              {event.event_data.message}
            </Text>
          </Flex>
          <Text mt={'0 !important'} fontFamily="karla" fontSize="2xs" letterSpacing={'wide'} color={'white'}>
            {event.event_data.subject}
          </Text>
        </Stack>
        <Text ml={'auto'} mr={{ base: 1, lg: 2 }} mt={'0 !important'} fontFamily="karla" fontSize="2xs" letterSpacing={'wide'} color={'white'}>
          {getTimePassed(event.event_timestamp)}
        </Text>
      </Flex>
    </Box>
  );
};
