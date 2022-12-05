import { TrackMetadata } from '@/models/common';
import { formatTime } from '@/utils';
import { Dispatch, store } from '@/store';
import { Avatar, Container, Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';

const Tracks = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const tracks = useSelector(store.select.tapesModel.selectCurrentTapeTracks);
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };

  const addToQueue = (submission: TrackMetadata) => {
    dispatch.audioModel.pushTrackToQueue(submission);
  };

  return (
    <Fragment>
      {tracks?.length ? (
        <Container px={{ base: 2, md: 0 }} maxW="7xl">
          <Heading fontSize={{ base: '2xl', md: '3xl' }} mx="auto" maxWidth={'7xl'} textAlign={'start'}>
            Tracks
          </Heading>
          <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
            <Stack spacing="2">
              {tracks?.map((track) => {
                const current = track.tracks[space][tape][id];
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
                          onClick={() => handlePlay(current)}
                          className="flex-shrink-0 mr-1 border"
                        />
                        <Avatar borderRadius="full" boxSize="25px" src={track?.profilePicture} />
                        <span className="text-xs font-bold lg:inline hidden">{track.displayName} -</span>
                        <div className="min-w-0 max-w-[20ch] flex-1 sm:flex text-xs text-neutral-800 truncate">{current.track}</div>
                      </Flex>
                      <Flex alignItems={'center'} gap={2}>
                        <span className="mr-2 whitespace-nowrap text-xs lg:text-sm">{formatTime(current.duration)}</span>
                        <IconButton
                          bg="green.200"
                          borderColor={'green.300'}
                          textColor={'blackAlpha.800'}
                          size={{ base: 'xs', lg: 'xs' }}
                          aria-label="add queue"
                          icon={<i className="fa-solid fa-layer-plus"></i>}
                          onClick={() => addToQueue(current)}
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
      ) : null}
    </Fragment>
  );
};

export default Tracks;
