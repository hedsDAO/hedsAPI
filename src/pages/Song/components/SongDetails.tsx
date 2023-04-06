import { Box, Divider, Flex, GridItem, SimpleGrid, Stack, Button, IconButton, ButtonProps } from '@chakra-ui/react';
import { InfoPair, InfoTitle, SongEvent, User as UserComponent } from '@/common';
import { User } from '@/models/common';
import { mockSong } from '../models/constant';
import { formatDuration } from '@/utils';
import { RadialChart } from '@/common';
import { SongEventType } from '@/common/events/SongEvent/SongEvent';
import SongInsights from './SongInsights';

const basePadding = { base: 4, xl: 8 };
const SongDetails = ({ cyanite, curator }: { cyanite?: { [key: string]: any }; curator: User }) => {
  return (
    <>
      <Divider borderColor="heds.100" />
      <Box maxW="80vw" mx="auto">
        <SimpleGrid mt={16} gap={{ base: 0, xl: 20 }} columns={{ base: 1, xl: 10 }}>
          <GridItem as={Stack} gap={4} colSpan={7}>
            <Stack>
              <InfoTitle title="Recent" />
              <SongEvent type={SongEventType.SUBMISSION} message="submitted to a tape" subject={'hedsTAPE 11'} timestamp="3 weeks ago" />
              <SongEvent type={SongEventType.PLACEMENT} message="made it on the tape" subject={'hedsTAPE 11'} timestamp="2 weeks ago" />
            </Stack>
            <Stack>
              <InfoTitle title="Insights" />
              <SongInsights cyanite={cyanite} />
            </Stack>
          </GridItem>
          <GridItem as={Stack} colSpan={3}>
            <InfoTitle title="Mood Spectrogram" />
            {cyanite?.mood && <RadialChart data={cyanite?.mood} />}
          </GridItem>
        </SimpleGrid>
      </Box>
      <Divider borderColor="heds.100" />
    </>
  );
};

export default SongDetails;
