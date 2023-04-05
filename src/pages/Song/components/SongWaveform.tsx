import { Dispatch, store } from '@/store';
import { formWaveSurferOptions } from '@/utils';
import { Grid, GridItem, SliderFilledTrack, SliderThumb, SliderTrack, Slider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mockSong } from '../models/constant';
import Wavesurfer from 'wavesurfer.js';


const SongWaveform = () => {
  const dispatch = useDispatch<Dispatch>();
  const src = mockSong.audio;
  const isPlaying = useSelector(store.select.persistentAudioModel.selectIsPlaying);
  var wavesurfer = null as Wavesurfer;
  // const wavesurfer = useSelector(store.select.persistentAudioModel.selectWavesurfer);
  useEffect(() => {
    if (!src) return;
    wavesurfer = Wavesurfer.create(formWaveSurferOptions(`#waveform-${src.split('/ipfs/')[1]}`));
    dispatch.persistentAudioModel.setSrc(src);
    wavesurfer.load(src);
    wavesurfer.on('ready', () => dispatch.persistentAudioModel.setDuration(wavesurfer.getDuration()));
    wavesurfer.on('audioprocess', () => dispatch.persistentAudioModel.setCurrentTime(wavesurfer.getCurrentTime()));
    return () => {
      wavesurfer.destroy();
    };
  }, [src, dispatch.persistentAudioModel]);

  useEffect(() => {
    if (wavesurfer) {
      if (!isPlaying && wavesurfer.isPlaying()) wavesurfer.pause();
      if (isPlaying && !wavesurfer.isPlaying()) wavesurfer.play();
    }
  }, [isPlaying]);
  return (
    <Grid gap={2} w={'full'} alignItems={'center'} templateColumns="repeat(1, 1fr)">
      <GridItem w={{base: '0px', xl: "full"}} h="80px" overflowY={'hidden'} mt={'-80px'} colSpan={1}>
        <div id={`waveform-${mockSong.audio.split('/ipfs/')[1]}`} className={'w-full'} />
      </GridItem>
      <GridItem display={{ xl: 'none' }} mt={'-18px'} mb={'-6px'} colSpan={{ base: 1, xl: 0 }}>
        <Slider aria-label="slider-ex-1" defaultValue={20}>
          <SliderTrack h='2'>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb h="5" w='5' />
        </Slider>
      </GridItem>
    </Grid>
  );
};

export default SongWaveform;
