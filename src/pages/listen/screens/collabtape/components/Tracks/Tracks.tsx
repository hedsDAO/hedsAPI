import { store } from '@/store';
import { Container, Heading, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { AudioTrack } from '@/common/media';

const Tracks = () => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const tracks = useSelector(store.select.tapesModel.selectCurrentTapeTracks);
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  return (
    <Fragment>
      {allTapes && tracks?.length ? (
        <Container px={{ base: 2, md: 0 }} maxW="6xl">
          <Heading fontSize={{ base: '2xl', md: '3xl' }} mx="auto" maxWidth={'7xl'} textAlign={'start'}>
            Tracks
          </Heading>
          <ul data-testid="user-submissions" role="list" className="divide-y divide-gray-200 py-3">
            <Stack spacing="2">
              {tracks?.map((track) => {
                return <AudioTrack key={track.wallet + track.joined} track={track?.tracks?.[space][tape][id]} />;
              })}
            </Stack>
          </ul>
        </Container>
      ) : null}
    </Fragment>
  );
};

export default Tracks;
