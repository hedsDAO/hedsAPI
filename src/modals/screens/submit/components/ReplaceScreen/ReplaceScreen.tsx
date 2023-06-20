import { Dispatch, store } from '@/store';
import { Box, Flex, Stack, Text, Button, useBoolean, Skeleton, SliderFilledTrack, Slider, SliderThumb, SliderTrack, Center, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitModelSteps } from '../../models/common';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';
import * as constants from '@/modals/screens/submit/models/constants';
import * as styles from '@/modals/screens/submit/components/ReplaceScreen/styles';

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

  return (
    <Stack {...styles.$replaceStackStyles}>
      <Flex {...styles.$replaceFlexStyles}>
        <Skeleton {...styles.$replaceSkeletonStyles(hasSoundLoaded)}>
          <Center {...styles.$replaceCenterStyles}>
            <Image {...styles.$replaceImageStyles(prevSubmission?.submission_data?.sub_image)} />
            {isSoundPlaying ? <Text {...styles.$pauseIconStyles} onClick={pauseSound} /> : <Text {...styles.$playIconStyles} onClick={playSound} />}
          </Center>
        </Skeleton>
        <Stack {...styles.$replaceDisplayNameStackStyles}>
          <Text {...styles.$replaceDisplayNameTextStyles}>{displayName}</Text>
          <Text {...styles.$replaceSubIdTextStyles}>{prevSubmission?.submission_data?.sub_id}</Text>
        </Stack>
      </Flex>
      <Slider {...styles.$replaceSliderStyles(progress, sound?.duration() || 60)}>
        <SliderTrack {...styles.$sliderTrackStyles}>
          <SliderFilledTrack {...styles.$sliderFilledTrackStyles} />
        </SliderTrack>
        <SliderThumb {...styles.$sliderThumbStyles} />
      </Slider>
      <Flex {...styles.$replaceInfoFlexStyles}>
        <Box {...styles.$replaceInfoBoxStyles}>
          {constants.REPLACE_TEXT_INFO} <Text {...styles.$replaceWarningTextStyles}>{constants.REPLACE_TEXT_WARNING}</Text>
        </Box>
      </Flex>
      <Flex {...styles.$replaceButtonsFlexStyles}>
        <Button {...styles.$replaceBackButtonStyles(() => dispatch.modalModel.setModal(null))}>{constants.REPLACE_BACK_BUTTON_TEXT}</Button>
        <Button
          {...styles.$replaceSubmitButtonStyles(() => {
            dispatch.submitModel.deleteSubmission(prevSubmission?.id);
            dispatch.submitModel.setCurrentStep(SubmitModelSteps.TERMS);
          })}
        >
          {constants.REPLACE_BUTTON_TEXT}
        </Button>
      </Flex>
    </Stack>
  );
};
