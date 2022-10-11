import { Fragment, useState } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { PlayerButtons, TrackDetails } from '@/modules/audio/screens/mobile/components';

const MobileAudio = () => {
  const [isShowingQueue, setIsShowingQueue] = useState<boolean>(false);
  return (
    <Fragment>
      <Grid display={{ base: 'grid', lg: 'none' }} height="6rem" templateColumns="repeat(8, 1fr)">
        <GridItem colSpan={7} bg="gray.200">
          <TrackDetails />
          <PlayerButtons />
        </GridItem>
        <GridItem colSpan={1} bg="gray.500">
          <Flex h="full" justifyContent={'center'} alignItems={'center'}>
            <Button onClick={() => setIsShowingQueue(!isShowingQueue)} bg="transparent" _hover={{ bg: 'transparent' }} _active={{ bg: 'transparent' }}>
              <i className="fa-sharp fa-solid fa-layer-group"></i>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Fragment>
  );
};

export default MobileAudio;
