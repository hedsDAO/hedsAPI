import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { formatTime, formWaveSurferOptions } from '@/utils';
import { Dispatch, store } from '@/store';
import { useLocation } from 'react-router-dom';
import Wavesurfer from 'wavesurfer.js';

const PersistentAudio = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  const location = useLocation();
  const src = useSelector(store.select.persistentAudioModel.selectSrc);
  const duration = useSelector(store.select.persistentAudioModel.selectDuration);
  const currentTime = useSelector(store.select.persistentAudioModel.selectCurrentTime);
  const isPlaying = useSelector(store.select.persistentAudioModel.selectIsPlaying);
  const wavesurfer = useSelector(store.select.persistentAudioModel.selectWavesurfer);
  const isShowingOverlay = useSelector(store.select.persistentAudioModel.selectIsShowingOverlay);

  const handleSeek = (value: number) => {
    if (wavesurfer) {
      wavesurfer.setCurrentTime(value);
      dispatch.persistentAudioModel.setCurrentTime(value);
    }
  };

  return (
    <Fragment>
      {!isShowingOverlay ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Fragment>
          {children}
          <Box position="fixed" left="0" bottom="0" width="100%" backgroundColor="gray.100" padding="1rem" boxShadow="0px -4px 10px rgba(0, 0, 0, 0.2)">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Button onClick={() => dispatch.persistentAudioModel.setIsPlaying([wavesurfer, !isPlaying])}>{isPlaying ? 'Pause' : 'Play'}</Button>
              <Box ml={4} display="flex" alignItems="center" w="50%">
                <Slider mr={2} min={0} max={duration} value={currentTime} onChange={handleSeek} aria-label="slider-ex-1">
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Box mr={2}>{formatTime(currentTime)}</Box>
                <Box>{formatTime(duration)}</Box>
              </Box>
            </Box>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
};

export default PersistentAudio;
