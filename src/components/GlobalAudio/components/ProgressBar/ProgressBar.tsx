import { useEffect, useState } from 'react';
import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { useDispatch, useSelector } from 'react-redux';
import { store, Dispatch } from '@/store';
import { useAudioController } from '@/hooks/useAudio/models/AudioContext';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

export const ProgressBar = () => {
  const slideBoxControls = useAnimation();
  const dispatch = useDispatch<Dispatch>();
  const [seekPosition, setSeekPosition] = useState(0);
  const duration = useSelector(store.select.audioModel.selectDuration);
  const progress = useSelector(store.select.audioModel.selectProgress);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const { state } = useAudioController();
  const MotionBox = motion.div;

  useEffect(() => {
    if (state.howlerInstance) {
      state.howlerInstance.seek(seekPosition);
    }
  }, [seekPosition]);

  useEffect(() => {
    const isHowler = state.howlerInstance instanceof Howl;
    slideBoxControls.start({
      opacity: isPlaying || isHowler ? 1 : 0,
      width: isPlaying || isHowler ? '100%' : '0px',
      height: isPlaying || isHowler ? 'auto' : '2px',
      marginTop: '-8px',
      paddingLeft: '8px',
      paddingRight: '8px',
      transition: { duration: 0.35 },
    });
  }, [isPlaying, slideBoxControls, state.howlerInstance]);

  return (
    <MotionBox animate={slideBoxControls}>
      <Slider
        data-testid="ga-progress-slider"
        value={state?.howlerInstance?.seek() || 0}
        min={0}
        max={state?.howlerInstance?.duration() || 60}
        step={1}
        onChange={setSeekPosition}
      >
        <SliderTrack bg="heds.bg2">
          <SliderFilledTrack bg="heds.200" />
        </SliderTrack>
        <SliderThumb _focus={{boxShadow: 'none'}} color="heds.500" boxSize={2} />
      </Slider>
    </MotionBox>
  );
};
