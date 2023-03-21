import { useEffect, useRef, useState } from 'react';
import { formWaveSurferOptions } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';

// Components
import { AspectRatio, Flex, Grid, GridItem, Image, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Text } from '@chakra-ui/react';
import { TapeDataTab } from '../components/TapeDataTab';
import { AppearsOnTab } from '../components/AppearsOnTab';
import { LikesTab } from '../components/LikesTab';
import { PlayIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

const testData = {
  track: 'internal dingo',
  duration: 59,
  type: 0,
  space: 'heds',
  stats: {
    likedBy: {},
    plays: 1,
    likes: 0,
  },
  artist: 'harris cole',
  cover: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F2.png?alt=media&token=b37ac39b-243e-411f-820f-17c9b8e454df',
  no: 4,
  id: '2',
  tape: 'hedstape',
  subImage: 'https://www.heds.cloud/ipfs/Qmdyz7xSWZjDBBe9uRS8QU4NFRCP24zjExVJLS4mbkTshv',
  album: 'hedsTAPE 02',
  public: true,
  wallet: '0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83',
  subId: 'internalDINGO',
  audio: 'https://www.heds.cloud/ipfs/QmNMrUBhK5wUwjVDhADvMQnh4gq3d2hhZjKwu6rXjonaHr',
  created: 1679363005000,
};

export const Song = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isPlaying, setIsPlaying] = useState(false);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>();

  useEffect(() => {
    if (testData.audio?.length) {
      dispatch.voteModel.setIsLoading(true);
      var options; // wavesurfer params
      if (waveformRef.current) {
        options = {
          container: waveformRef.current,
          waveColor: '#000000',
          progressColor: '#C025D3',
          cursorColor: 'transparent',
          barWidth: 2.5,
          barRadius: 0,
          responsive: true,
          height: 220,
          normalize: true,
          hideScrollbar: true,
        };
      }
      if (options) wavesurfer.current = WaveSurfer.create(options);
      if (typeof testData.audio === 'string') wavesurfer?.current?.load(testData.audio);
      wavesurfer?.current?.on('ready', () => dispatch.voteModel.setIsLoading(false));
      wavesurfer?.current?.on('finish', () => {
        setIsPlaying(false);
        wavesurfer?.current?.stop();
      });
    }
    return () => {
      setIsPlaying(false);
      if (wavesurfer?.current) {
        wavesurfer?.current?.destroy();
      }
    };
  }, []);

  return (
    <>
      <Grid maxW="full" templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={7}>
          <Stack mt="-10" pl={20} gap={4} justifyContent={'center'} h="full">
            <Flex direction="column">
              <Text letterSpacing={'widest'} fontSize={'md'} textColor={'gray.500'}>
                TRACK
              </Text>
              <Text letterSpacing={'widest'} fontSize={'3xl'}>
                {testData?.subId}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text letterSpacing={'widest'} fontSize={'md'} textColor={'gray.500'}>
                ARTIST
              </Text>
              <Text letterSpacing={'widest'} fontSize={'3xl'}>
                {testData?.artist}
              </Text>
            </Flex>
            <Flex pt={6} gap={3}>
              <PlayIcon
                width={30}
                onClick={() => {
                  wavesurfer?.current?.playPause();
                  setIsPlaying(!isPlaying);
                }}
              ></PlayIcon>
              <HeartIcon width={30}></HeartIcon>
            </Flex>
          </Stack>
        </GridItem>
        <GridItem colSpan={5}>
          <AspectRatio ratio={1}>
            <Image src={testData.cover} />
          </AspectRatio>
        </GridItem>
      </Grid>
      <Grid gap={2} w="full" alignItems={'center'} templateColumns="repeat(12, 1fr)">
        <GridItem h="110px" overflowY={'hidden'} mt={'-110px'} colSpan={12}>
          <div ref={waveformRef} className={'w-full'}></div>
        </GridItem>
      </Grid>
      <Tabs variant="soft-rounded" colorScheme="blackAlpha" bgColor="blackAlpha.400" p="2rem">
        <TabList>
          <Tab fontSize="sm">TAPE DATA</Tab>
          <Tab fontSize="sm">APPEARS ON</Tab>
          <Tab fontSize="sm">LIKES</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TapeDataTab
              artist={testData.artist}
              wallet={testData.wallet}
              subId={testData.subId}
              subImage={testData.subImage}
              type={testData.type}
              created={testData.created}
            />
          </TabPanel>
          <TabPanel>
            <AppearsOnTab />
          </TabPanel>
          <TabPanel>
            <LikesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
