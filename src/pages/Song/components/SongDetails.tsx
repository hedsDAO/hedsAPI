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
    <Box>
      <Divider />
      <SimpleGrid gap={{ base: 0, xl: 4 }} columns={{ base: 1, xl: 10 }}>
        <GridItem p={basePadding} as={Stack} colSpan={2}>
          <UserComponent user={curator} />
          <Stack py={2}>
            <InfoPair inline label="duration" value={formatDuration(mockSong.duration)} />
            <InfoPair inline label="release date" value="Feb. 3, 2023" />
            <InfoPair inline label="submission" value="hedsTAPE 11" />
          </Stack>
          <Flex alignItems={'center'} gap={2}>
            <IconButton aria-label="sound" icon={<i className="fa-kit fa-sound" />} rounded="sm" size="xs" bg="blackAlpha.900" color="white" px={2} />
            <Button children={'SHARE'} leftIcon={<i className="fa-brands fa-twitter" />} rounded="sm" size="xs" bg="blue.400" color="white" variant="solid" />
            <IconButton aria-label="more" rounded="sm" size="sm" icon={<i className="fa-solid fa-ellipsis" />} bg="transparent" color="black" variant="solid" />
          </Flex>
        </GridItem>
        <GridItem p={basePadding} as={Stack} gap={4} colSpan={5}>
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
        <GridItem p={basePadding} as={Stack} colSpan={3}>
          <InfoTitle title="Mood Spectrogram" />
          {cyanite?.mood && <RadialChart data={cyanite?.mood} />}
        </GridItem>
      </SimpleGrid>
      <Divider />
    </Box>
  );
};

export default SongDetails;
