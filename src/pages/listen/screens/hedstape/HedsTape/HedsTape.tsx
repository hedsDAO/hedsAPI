import { Divider, Container } from '@chakra-ui/react';
import { Header, Timeline, Tracks } from '@/pages/listen/screens/hedstape/components';
import { ViewTapesButton } from '@/common/buttons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

export const HedsTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const timeline = useSelector(store.select.hedstapeModel.selectTapeTimeline);
  useEffect(() => {
    dispatch.hedstapeModel.getTapeTimeline(currentTape);
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
