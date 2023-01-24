import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Timeline, Tracks, ViewTapesButton } from '@/pages/listen/screens/hedstape/components';
import { Dispatch, store } from '@/store';
import { Container, Divider, Flex } from '@chakra-ui/react';

export const HedsTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const timeline = useSelector(store.select.hedstapeModel.selectTapeTimeline);
  const tracks = useSelector(store.select.tapesModel.selectCurrentTapeTracks);
  useEffect(() => {
    dispatch.hedstapeModel.getTapeTimeline(currentTape);
  }, []);
  return (
    <Container minW="full" px={{ base: 4, lg: 2 }}>
      <ViewTapesButton />
      <Header />
      <Divider my={5} />
      {timeline && <Timeline />}
      <Divider my={5} />
      {tracks?.length !== 0 && <Tracks />}
    </Container>
  );
};
