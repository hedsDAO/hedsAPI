import { Howl } from 'howler';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Button, Flex, Skeleton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text, useBoolean } from '@chakra-ui/react';
import * as styles from '@/modals/screens/submit/components/PreviewScreen/styles';
import * as constants from '@/modals/screens/submit/models/constants';

export const PreviewScreen = () => {
  const [progress, setProgress] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);
  const [hasSoundLoaded, setHasSoundLoaded] = useBoolean();
  const [isSoundPlaying, setIsSoundPlaying] = useBoolean();
  const [soundId, setSoundId] = useState<number | null>(null);
  const [sound, setSound] = useState<Howl | null>(null);
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  const userId = useSelector(store.select.authModel.selectUserId);
  const wallet = useSelector(store.select.authModel.selectWallet);
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
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
      setProgress(value);
    }
  };

  return (
    <Stack {...styles.$previewStackStyles}>
      <Flex {...styles.$previewFlexStyles}>
        <Skeleton {...styles.$previewSkeletonStyles(hasSoundLoaded)}>
          <Flex {...styles.$previewAudioFlexStyles}>
            {isSoundPlaying ? <Text {...styles.$pauseIconStyles} onClick={pauseSound} /> : <Text {...styles.$playIconStyles} onClick={playSound} />}
          </Flex>
        </Skeleton>
        <Stack {...styles.$previewDisplayNameStackStyles}>
          <Text {...styles.$previewDisplayNameTextStyles}>{displayName}</Text>
          <Box {...styles.$previewBoxStyles} />
        </Stack>
      </Flex>
      <Slider onChange={changeProgress} {...styles.$previewSliderStyles(progress, sound?.duration() || 60)}>
        <SliderTrack {...styles.$sliderTrackStyles}>
          <SliderFilledTrack {...styles.$sliderFilledTrackStyles} />
        </SliderTrack>
        <SliderThumb {...styles.$sliderThumbStyles} />
      </Slider>
      <Button
        {...styles.$previewButtonStyles(() => {
          dispatch.submitModel.uploadSubmission([userFile, wallet, userId, tape?.id]);
        })}
      >
        {constants.UPLOAD_BUTTON_TEXT}
      </Button>
    </Stack>
  );
};
