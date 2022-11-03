import { selectCurrentTapeTracks } from '@/pages/tapes/store/selectors';
import { formatTime } from '@/utils';
import { Avatar, Container, Flex, Heading, IconButton, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Tracks = () => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const tracks = useSelector(selectCurrentTapeTracks);
  return (
    <Container px={{ base: 10, md: 0 }} maxW="7xl">
      <Heading fontSize={{ base: '2xl', md: '3xl' }} mx="auto" maxWidth={'7xl'} textAlign={'start'}>
        Tracks
      </Heading>
      <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
        <Stack spacing="2">
          {tracks?.map((track) => {
            return (
              <li className={`text-sm text-gray-600 rounded-md border-green-200/60 border`} key={id + track?.displayName}>
                <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 px-2 py-2 rounded-md">
                  <Flex alignItems={'center'} gap={2}>
                    <Avatar to={`/u/${track.wallet}`} as={Link} borderRadius="full" boxSize="25px" src={track?.profilePicture} />
                    <div className="min-w-0 flex-1 sm:flex text-xs text-neutral-800 -mr-1">{track?.tracks?.[space][tape][id]?.track}.</div>
                    <span className="text-xs font-medium">{track?.displayName}</span>
                  </Flex>
                  <Flex alignItems={'center'} gap={2}>
                    <span className="mr-2 sm:mr-4 whitespace-nowrap">{formatTime(track?.tracks?.[space][tape][id]?.duration)}</span>
                    <IconButton bg="blue.200" size="xs" aria-label="play" icon={<i className="fa-solid fa-play"></i>} className="flex-shrink-0" />
                    <IconButton bg="green.200" size="xs" aria-label="add queue" icon={<i className="fa-solid fa-layer-plus"></i>} className="flex-shrink-0" />
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
