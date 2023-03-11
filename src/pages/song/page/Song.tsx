import { AspectRatio, Box, Button, Container, Flex, Grid, GridItem, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { formWaveSurferOptions } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import WaveSurfer from 'wavesurfer.js';
import { PlayIcon } from '@heroicons/react/24/solid';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import { HeartIcon } from '@heroicons/react/24/outline';
import { testData } from '../store/constants';

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
              <PlayIcon width={30}></PlayIcon>
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
      <Grid py={10} px={10} bgColor="blackAlpha.400" gap={3} w="full" alignItems={'center'} templateColumns="repeat(12, 1fr)">
        <Button fontWeight={'normal'} bg="white" letterSpacing="wider" px={3} size="xs" rounded="full">
          TAPE DATA
        </Button>
        <Button fontWeight={'normal'} bg="white" letterSpacing="wider" px={3} size="xs" rounded="full">
          APPEARS ON
        </Button>
        <Button fontWeight={'normal'} bg="white" letterSpacing="wider" px={3} size="xs" rounded="full">
          LIKES
        </Button>
        <Button fontWeight={'normal'} bg="white" letterSpacing="wider" px={3} size="xs" rounded="full">
          AI SENTIMENT
        </Button>
      </Grid>
      <Box px={12} pt={3} pb={10} bgColor="blackAlpha.400">
        <Stack>
          <Flex gap={2}>
            <Text fontSize="sm" fontWeight={'bold'}>
              TAPE:
            </Text>
            <Text fontSize="sm">{testData?.album}</Text>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};
