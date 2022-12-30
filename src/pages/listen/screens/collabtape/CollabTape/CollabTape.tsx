import { Divider, Container } from '@chakra-ui/react';
import { Header, Tracks, ViewTapesButton, Timeline } from '@/pages/listen/screens/collabtape/components';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Fragment, useEffect } from 'react';

export const CollabTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const timeline = useSelector(store.select.collabModel.selectTapeTimeline);
  const tracks = useSelector(store.select.tapesModel.selectCurrentTapeTracks);
  useEffect(() => {
    dispatch.collabModel.getTapeTimeline(currentTape);
  }, []);
  return (
    <Container maxW="8xl" pt={3}>
      <ViewTapesButton />
      <Header />
      <Divider my={5} />
      {tracks?.length === 0 ? (
        <Fragment>
          {timeline && <Timeline />}
          <Divider my={5} />
          <Tracks />
        </Fragment>
      ) : (
        <Fragment>
          <Tracks />
          <Divider my={5} />
          {timeline && <Timeline />}
        </Fragment>
      )}
    </Container>
  );
};
