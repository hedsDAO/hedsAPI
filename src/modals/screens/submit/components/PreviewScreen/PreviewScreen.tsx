import { Dispatch, store } from '@/store';
import { Box, Flex, Stack, Text, Button, useBoolean, Skeleton, SliderFilledTrack, Slider, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/common';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';

export const PreviewScreen = () => {
  const [progress, setProgress] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);
  const [hasSoundLoaded, setHasSoundLoaded] = useBoolean();
  const [isSoundPlaying, setIsSoundPlaying] = useBoolean();
  const [soundId, setSoundId] = useState<number | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  const userFile = useSelector(store.select.submitModel.selectFile);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const soundBlob = new Blob([new Uint8Array(e.target?.result as ArrayBuffer)]);
      const soundUrl = URL.createObjectURL(soundBlob);
      const newSound = new Howl({
        src: [soundUrl],
        autoplay: false,
        format: ['mp3', 'wav'],
      });
      setHasSoundLoaded.on();
      setSound(newSound);
    };
    reader.readAsArrayBuffer(userFile);
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
          <Flex rounded="sm" alignItems={'center'} justifyContent="center" bg="heds.bg2" boxSize={'14'}>
            {isSoundPlaying ? (
              <Text role="button" as={'i'} className={'fas fa-pause'} color="white" onClick={pauseSound} />
            ) : (
              <Text role="button" as={'i'} className={'fas fa-play'} color="white" onClick={playSound} />
            )}
          </Flex>
        </Skeleton>
        <Stack justifyContent={'center'}>
          <Text mt={'0 !important'} fontFamily={'inter'} letterSpacing="wide" color={'white'}>
            {displayName}
          </Text>
          <Box minH="1ch" minW="14ch" bg="whiteAlpha.600" opacity={'70%'} rounded="lg" />
        </Stack>
      </Flex>
      <Slider onChange={setSeekPosition} value={progress} min={0} max={sound?.duration() || 60} step={1}>
        <SliderTrack bg="heds.bg2">
          <SliderFilledTrack bg="heds.200" />
        </SliderTrack>
        <SliderThumb _focus={{ boxShadow: 'none' }} color="heds.500" boxSize={2} />
      </Slider>
      <Button
        onClick={() => {
          dispatch.submitModel.setCurrentStep(SubmitModelSteps.LOADING);
        }}
        colorScheme="whiteAlpha"
        size="sm"
        color="white"
      >
        UPLOAD
      </Button>
    </Stack>
  );
};
