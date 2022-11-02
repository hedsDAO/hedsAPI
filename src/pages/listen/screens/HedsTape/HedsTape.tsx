import { Button, Divider, Flex, Heading, Text, Avatar, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { useParams } from 'react-router-dom';
import { Header, Timeline } from '@/pages/listen/components';
import { formatTime, formatWallet } from '@/utils';

export const HedsTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  return (
    <div className="pt-10">
      <Header />
      <Divider my={5} />
      <Flex rounded="sm" w={{ base: '90%', sm: '95%', lg: 'full' }} maxW="7xl" mx={'auto'} h="32" bg="gray.200"></Flex>
      <Divider my={5} />
      <Timeline />
      <Divider my={5} />
      <Heading fontSize={{ base: 'xl', md: '2xl' }} mx="auto" maxWidth={'7xl'} textAlign={['center', 'center', 'center', 'start']}>
        Tracks
      </Heading>
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={'column'} gap={2} px={[10, 6, 4, 0]} py={4}>
        {currentTape?.tracks?.map((track) => {
          return (
            <Flex
              as={Button}
              key={track.wallet + space + tape + id}
              onClick={() => {
                dispatch.audioModel.setIsShowingPlayer(true);
                dispatch.audioModel.setCurrentTrack(track?.tracks?.[space]?.[tape]?.[id]);
              }}
              justify={'space-between'}
            >
              <Flex gap={2} alignItems={'center'}>
                <Avatar src={track.profilePicture} size={'sm'} />
                <Flex direction={'column'} alignItems="start">
                  <Text fontSize={'xs'}>{track.displayName}</Text>
                  <Text fontSize={'2xs'}>{formatWallet(track.wallet)}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize={'2xs'}>{formatTime(track.tracks?.[space]?.[tape]?.[id]?.duration)}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};
