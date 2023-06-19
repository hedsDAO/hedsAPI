import { Dispatch, store } from '@/store';
import { Box, Flex, Stack, Text, Button, useBoolean, Skeleton, SliderFilledTrack, Slider, SliderThumb, SliderTrack, Center, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/common';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';

export const ReplaceScreen = () => {
  const [progress, setProgress] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);
  const [hasSoundLoaded, setHasSoundLoaded] = useBoolean();
  const [isSoundPlaying, setIsSoundPlaying] = useBoolean();
  const [soundId, setSoundId] = useState<number | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  const prevSubmission = useSelector(store.select.submitModel.selectPrevSubmission);

  useEffect(() => {
    const newSound = new Howl({
      src: [prevSubmission?.audio],
      autoplay: false,
      format: ['mp3', 'wav'],
    });
    setHasSoundLoaded.on();
    setSound(newSound);
  }, []);

  const playSound = () => {
    if (sound && soundId === null) {
      const id = sound.play();
      setSoundId(id);
      setIsSoundPlaying.on();
    } else if (sound) {
      sound.play(soundId);
      setIsSoundPlaying.on();
    }
  };

  const pauseSound = () => {
    if (sound && soundId !== null) {
      sound.pause(soundId);
      setIsSoundPlaying.off();
    }
  };
  useEffect(() => {
    if (sound) sound.seek(seekPosition);
  }, [seekPosition]);

  useEffect(() => {
    sound?.on('end', () => {
      setIsSoundPlaying.off();
      setProgress(0);
      setSoundId(null);
    });
    let intervalId: NodeJS.Timeout | null = null;
    if (isSoundPlaying) {
      intervalId = setInterval(() => {
        if (sound && soundId) {
          const currentProgress = sound.seek(soundId) as number;
          setProgress(currentProgress);
        }
      }, 100);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSoundPlaying, sound, soundId]);

  const changeProgress = (value: number) => {
    if (sound && soundId) {
      sound.seek(value, soundId);
    }
  };

  return (
    <Stack gap={2}>
      <Flex gap={4}>
        <Skeleton startColor="heds.bg2" endColor="heds.400" fitContent isLoaded={hasSoundLoaded}>
          <Center boxSize={'14'}>
            <Image
              boxSize={'14'}
              src={prevSubmission?.submission_data?.sub_image}
              opacity={'70%'}
              rounded="sm"
              alignItems={'center'}
              justifyContent="center"
              bg="heds.bg2"
            />
            {isSoundPlaying ? (
              <Text pos={'absolute'} role="button" as={'i'} className={'fas fa-pause'} color="white" onClick={pauseSound} />
            ) : (
              <Text pos={'absolute'} role="button" as={'i'} className={'fas fa-play'} color="white" onClick={playSound} />
            )}
          </Center>
        </Skeleton>
        <Stack justifyContent={'center'}>
          <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color={'white'}>
            {displayName}
          </Text>
          <Text fontSize={'xs'} mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color="whiteAlpha.600">
            {prevSubmission?.submission_data?.sub_id}
          </Text>
        </Stack>
      </Flex>
      <Slider onChange={setSeekPosition} value={progress} min={0} max={sound?.duration() || 60} step={1}>
        <SliderTrack bg="heds.bg2">
          <SliderFilledTrack bg="heds.200" />
        </SliderTrack>
        <SliderThumb _focus={{ boxShadow: 'none' }} color="heds.500" boxSize={2} />
      </Slider>
      <Flex py={5}>
        <Box textAlign={'center'} fontSize="xs" fontWeight={'bold'} color="white">
          REPLACING YOUR SUBMISSION WILL OVERWRITE THE CURRENT TRACK.{' '}
          <Text as="span" color="red.500">
            THIS CANNOT BE UNDONE.
          </Text>
        </Box>
      </Flex>
      <Flex gap={2} w="full">
        <Button onClick={() => dispatch.modalModel.setModal(null)} colorScheme="whiteAlpha" size="sm" color="white" width="50%">
          BACK
        </Button>
        <Button
          onClick={() => {
            dispatch.submitModel.deleteSubmission(prevSubmission?.id);
            dispatch.submitModel.setCurrentStep(SubmitModelSteps.TERMS);
          }}
          colorScheme="red"
          size="sm"
          color="white"
          width="50%"
        >
          REPLACE
        </Button>
      </Flex>
    </Stack>
  );
};
