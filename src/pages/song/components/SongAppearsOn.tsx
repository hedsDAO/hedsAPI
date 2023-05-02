// import { Tape } from '@/common';
import { Box, Divider, Grid, GridItem } from '@chakra-ui/react';
// import { mockTape } from '../models/constant';

const SongAppearsOn = () => {
  return (
    <Box pb={4}>
      <Divider></Divider>
      <Grid px={{ base: 6, xl: 8 }} py={{ base: 6, xl: 8 }} templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(8, 1fr)' }}>
        <GridItem colSpan={1}>
          {/* <Tape tape={mockTape} /> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SongAppearsOn;
