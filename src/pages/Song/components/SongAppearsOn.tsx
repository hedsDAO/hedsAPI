import { Tape } from '@/common';
import { Pagination } from '@/components/Pagination/Pagination';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { mockTape } from '../models/constant';
const SongAppearsOn = () => {
  return (
    <Box pb={4}>
      <Grid p={6} templateColumns={'repeat(7, 1fr)'}>
        <GridItem colSpan={1}>
          <Tape tape={mockTape} />
        </GridItem>
      </Grid>
      <Pagination />
    </Box>
  );
};

export default SongAppearsOn;
