import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { Box, Divider, Image, Skeleton, Stack } from '@chakra-ui/react';
import { TimelineButtons } from '../components/TimelineButtons/TimelineButtons';
import { TapeDetails } from '../components/TapeDetails/TapeDetails';
import { Tracks } from '../components/Tracks/Tracks';

// Constants
import { Dispatch, store } from '@/store';

// Styles
import * as styles from '@/pages/tape/screens/styles';

export const Tape = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const cover = useSelector(store.select.tapeModel.selectTapeCover);
  const isLoading = useSelector(store.select.tapeModel.selectIsLoading);
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  useEffect(() => {
    console.log('tape', tape);
  }, [tape]);

  return (
    <Box>
      <Stack {...styles.$tapeStackStyles}>
        <Skeleton isLoaded={!isLoading}>
          <Image src={cover} alt="tape-cover" {...styles.$tapeImageStyles} />
        </Skeleton>
        <TapeDetails />
        <TimelineButtons />
      </Stack>
      <Divider {...styles.$tapeDividerStyles} />
      <Tracks />
    </Box>
  );
};
