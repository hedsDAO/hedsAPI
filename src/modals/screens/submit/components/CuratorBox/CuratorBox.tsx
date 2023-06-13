import { store } from '@/store';
import { formatWallet } from '@/utils';
import { Avatar, Flex, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const CuratorBox = () => {
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  return (
    <Flex gap={6} pb={5} alignItems={'center'}>
      <Avatar size="xl" src={tape.sampleArtists[0].profile_picture} name={tape.sampleArtists[0].display_name} />
      <Stack>
        <Text mt={'0 !important'} color="white" letterSpacing={'wider'} fontFamily={'karla'} fontSize="2xl">
          {tape.sampleArtists[0].display_name}
        </Text>
        <Text mt={'0 !important'} fontFamily={'space'} color="white" fontSize={'md'} opacity={'50%'}>
          {formatWallet(tape.sampleArtists[0].wallet)}
        </Text>
      </Stack>
    </Flex>
  );
};
