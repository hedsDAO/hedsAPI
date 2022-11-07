import { selectCurrentTapeTracks } from '@/pages/tapes/store/selectors';
import { TrackMetadata } from '@/models/common';
import { formatTime } from '@/utils';
import { Dispatch } from '@/store';
import { Avatar, Container, Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Tracks = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const tracks = useSelector(selectCurrentTapeTracks);
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };

  const addToQueue = (submission: TrackMetadata) => {
    dispatch.audioModel.pushTrackToQueue(submission);
  };

  return (
    <Container px={{ base: 2, md: 0 }} maxW="7xl">
      <Heading fontSize={{ base: '2xl', md: '3xl' }} mx="auto" maxWidth={'7xl'} textAlign={'start'}>
        Tracks
      </Heading>
      <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
        <Stack spacing="2">
          {tracks?.map((track) => {
            return (
              <li className={`text-sm text-gray-600 rounded-md border-neutral-200 border`} key={id + track?.displayName}>
                <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Flex alignItems={'center'} gap={2}>
                    <IconButton
                      bg="blue.200"
                      borderColor={'blue.300'}
                      textColor={'blackAlpha.800'}
                      size={{ base: 'xs', lg: 'xs' }}
                      aria-label="play"
                      icon={<i className="fa-solid fa-play"></i>}
                      onClick={() => handlePlay(track?.tracks?.[space][tape][id])}
                      className="flex-shrink-0 mr-1 border"
                    />
                    <Avatar to={`/u/${track.wallet}`} as={Link} borderRadius="full" boxSize="25px" src={track?.profilePicture} />
                    <div className="min-w-0 flex-1 sm:flex text-xs text-neutral-800 -mr-1">{track?.tracks?.[space][tape][id]?.track}.</div>
                    <span className="text-xs font-medium">{track?.displayName}</span>
                  </Flex>
                  <Flex alignItems={'center'} gap={2}>
                    <span className="mr-2 whitespace-nowrap text-xs lg:text-sm">{formatTime(track?.tracks?.[space][tape][id]?.duration)}</span>
                    <IconButton
                      bg="green.200"
                      borderColor={'green.300'}
                      textColor={'blackAlpha.800'}
                      size={{ base: 'xs', lg: 'xs' }}
                      aria-label="add queue"
                      icon={<i className="fa-solid fa-layer-plus"></i>}
                      onClick={() => addToQueue(track?.tracks?.[space][tape][id])}
                      className="flex-shrink-0 border"
                    />
                  </Flex>
                </div>
              </li>
            );
          })}
        </Stack>
      </ul>
    </Container>
  );
};

export default Tracks;
