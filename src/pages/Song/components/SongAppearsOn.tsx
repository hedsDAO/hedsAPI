import { InfoTitle, Tape } from '@/common';
import { Box, Divider, Grid, GridItem, Stack } from '@chakra-ui/react';
import { mockTape } from '../models/constant';

const SongAppearsOn = () => {
  return (
    <>
      <Divider borderColor="heds.100" />
      <Box mt={8} maxW="80vw" mx="auto">
        <Grid py={{ base: 6, xl: 8 }} gap={8} templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(8, 1fr)' }}>
          <GridItem as={Stack} colSpan={1}>
            <InfoTitle title="Tapes" />
            <Tape tape={mockTape} />
          </GridItem>
        </Grid>
        {/* <Divider borderColor="heds.100" /> */}
      </Box>
    </>
  );
};

export default SongAppearsOn;
