import { Divider, Container } from '@chakra-ui/react';
import { Header, Tracks, ViewTapesButton, Timeline } from '@/pages/listen/screens/collabtape/components';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useEffect } from 'react';

export const CollabTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const timeline = useSelector(store.select.collabModel.selectTapeTimeline);
  useEffect(() => {
    dispatch.collabModel.getTapeTimeline(currentTape);
  }, []);
  return (
    <Container maxW="7xl" pt={3}>
      <ViewTapesButton />
      <Header />
      <Divider my={5} />
      {timeline && <Timeline />}
      <Divider my={5} />
      <Tracks />
    </Container>
  );
};
