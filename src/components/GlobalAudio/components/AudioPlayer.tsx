import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  Slider,
  Box,
  Flex,
  Image,
  Text,
  Stack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useBoolean,
  SimpleGrid,
  GridItem,
  AspectRatio,
} from '@chakra-ui/react';
import { Dispatch, store } from '@/store';
import { song } from '@/tests/mocks/data/song';
import Wavesurfer from 'wavesurfer.js';
import { formatDuration } from '@/utils';

const MotionBox = motion.div;

export const AudioPlayer = () => {
  const dispatch = useDispatch<Dispatch>();
  const currentSong = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const isPlaying = useSelector(store.select.globalAudioModel.selectIsPlaying);
  const volume = useSelector(store.select.globalAudioModel.selectVolume);
  const wavesurferRef = useRef(null);
  const waveSurferContainerRef = useRef(null);

  const boxControls = useAnimation();
  const [isHoverVolume, setIsHoverVolume] = useBoolean(false);

  useEffect(() => {
    if (currentSong && !wavesurferRef.current) {
      wavesurferRef.current = Wavesurfer.create({
        container: waveSurferContainerRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
      });

      wavesurferRef.current.on('ready', () => {
        if (isPlaying) {
          wavesurferRef.current.play();
        }
      });
    }

    if (wavesurferRef.current) {
      wavesurferRef.current.load(currentSong.audio);
      wavesurferRef.current.setVolume(volume);
    }
  }, [currentSong, isPlaying, volume]);

  useEffect(() => {
    boxControls.start({
      opacity: isHoverVolume ? 1 : 0,
      width: isHoverVolume ? '40%' : '0px',
      translateX: '5%',
      transition: { duration: 0.3 },
    });
  }, [isHoverVolume, boxControls]);

  return (
    <Box position="fixed" bottom={0} left={0} maxH="100px" zIndex={50} bg="heds.bg4" m={4} rounded="lg">
      <Text fontSize="xs" right={0} m={1.5} position={'absolute'} color="white" opacity={'75%'} as={'i'} className="fa-solid fa-xmark"></Text>
      <SimpleGrid gap={5} columns={6}>
        <GridItem m={1.5} colSpan={1}>
          <AspectRatio h="80px" width={'80px'} ratio={1}>
            <Image h="80px" rounded="md" objectFit={'cover'} src={song.cover} />
          </AspectRatio>
        </GridItem>
        <GridItem as={Flex} alignItems={'center'} colSpan={2}>
          <Stack>
            <Text fontSize={{ base: '2xs', lg: 'sm' }} letterSpacing={'widest'} fontFamily={'inter'} fontWeight={'medium'} color="white" mt={'0 !important'}>
              {song?.submission_data?.sub_id}
            </Text>
            <Text fontSize={{ base: '2xs', lg: 'sm' }} fontFamily={'inter'} fontWeight={'hairline'} color="white" opacity="60%" mt={'0 !important'}>
              rahmteen
            </Text>
          </Stack>
        </GridItem>
        <GridItem as={Flex} alignItems={'center'} colSpan={1}>
          <Flex gap={3} alignItems={'center'}>
            <Text color="white" as={'i'} className="fa-solid fa-backward"></Text>
            <Text color="white" fontSize="2xl" as={'i'} className="fa-solid fa-play"></Text>
            <Text color="white" as={'i'} className="fa-solid fa-forward"></Text>
          </Flex>
        </GridItem>
        <GridItem ml={5} gap={2} onMouseEnter={setIsHoverVolume.on} onMouseLeave={setIsHoverVolume.off} as={Flex} alignItems={'center'} colSpan={2}>
          <Text mt={'0 !important'} fontSize="md" as={'i'} className="fa-solid fa-volume" color="white" />
          <MotionBox animate={boxControls} transition={{ type: 'spring', damping: 0, stiffness: 100 }}>
            <Slider mb={'0.75px !important'} size="sm" defaultValue={100} onChange={(val) => dispatch.globalAudioModel.setVolume(val)}>
              <SliderTrack bg="heds.500">
                <SliderFilledTrack bg="heds.100" />
              </SliderTrack>
              <SliderThumb _focus={{ boxShadow: 'none', outlineColor: 'transparent' }} />
            </Slider>
          </MotionBox>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default AudioPlayer;
