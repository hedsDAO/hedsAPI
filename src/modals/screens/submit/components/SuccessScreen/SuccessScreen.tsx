import { Dispatch, store } from '@/store';
import { Box, Flex, Stack, Text, Button, useBoolean, Skeleton, SliderFilledTrack, Slider, SliderThumb, SliderTrack, Center, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/common';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';
import * as constants from '@/modals/screens/submit/models/constants';
import * as styles from '@/modals/screens/submit/components/SuccessScreen/styles';

export const SuccessScreen = () => {
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
      setProgress(value);
    }
  };

  return (
    <Stack {...styles.$successStackStyles}>
      <Flex {...styles.$successFlexStyles}>
        <Skeleton {...styles.$successSkeletonStyles(hasSoundLoaded)}>
          <Center {...styles.$successCenterStyles}>
            <Image {...styles.$successImageStyles(prevSubmission?.submission_data?.sub_image)} />
            {isSoundPlaying ? <Text {...styles.$pauseIconStyles} onClick={pauseSound} /> : <Text {...styles.$playIconStyles} onClick={playSound} />}
          </Center>
        </Skeleton>
        <Stack {...styles.$successDisplayNameStackStyles}>
          <Text {...styles.$successDisplayNameTextStyles}>{displayName}</Text>
          <Text {...styles.$successSubIdTextStyles}>{prevSubmission?.submission_data?.sub_id}</Text>
        </Stack>
      </Flex>
      <Slider onChange={changeProgress} {...styles.$successSliderStyles(progress, sound?.duration() || 60)}>
        <SliderTrack {...styles.$sliderTrackStyles}>
          <SliderFilledTrack {...styles.$sliderFilledTrackStyles} />
        </SliderTrack>
        <SliderThumb {...styles.$sliderThumbStyles} />
      </Slider>
      <Flex {...styles.$successInfoFlexStyles}>
        <Box {...styles.$successInfoBoxStyles}>
          {constants.SUCCESS_TEXT} <Text {...styles.$successWarningTextStyles}>{constants.SUCCESS_WARNING_TEXT}</Text>
        </Box>
      </Flex>
      <Flex {...styles.$successButtonsFlexStyles}>
        <Button {...styles.$successBackButtonStyles(() => dispatch.modalModel.setModal(null))}>{constants.REPLACE_BACK_BUTTON_TEXT}</Button>
        <Button
          {...styles.$successSubmitButtonStyles(() => {
            dispatch.submitModel.deleteSubmission(prevSubmission?.song_id);
            dispatch.submitModel.setCurrentStep(SubmitModelSteps.LOADING);
          })}
        >
          {constants.REPLACE_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
