import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { Box, Divider, Image, Stack } from '@chakra-ui/react';
import { TimelineButtons } from '../components/TimelineButtons/TimelineButtons';
import { TapeDetails } from '../components/TapeDetails/TapeDetails';
import { Tracks } from '../components/Tracks/Tracks';

// Constants
import { Dispatch, store } from '@/store';

export const Tape = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const cover = useSelector(store.select.tapeModel.selectTapeCover);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  return (
    <Box>
      <Stack
        pt={{ base: 2, lg: 12 }}
        mx={{ base: 2, lg: 8 }}
        px={{ sm: '20px', md: '80px', lg: '120px' }}
        spacing={['30px', '80px']}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Image src={cover} alt="tape-cover" boxSize={['sm', 'md', 'lg']} border="1px" borderColor="#DC89FF" />
        <TapeDetails />
        <TimelineButtons />
      </Stack>
      <Divider orientation="horizontal" colorScheme="#9293FF" py={8} />
      <Tracks />
    </Box>
  );
};
