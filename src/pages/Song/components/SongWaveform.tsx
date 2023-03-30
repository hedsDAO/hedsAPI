import { Dispatch, store } from '@/store';
import { formWaveSurferOptions } from '@/utils';
import { Grid, GridItem } from '@chakra-ui/react';
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
    <Grid gap={2} w="full" alignItems={'center'} templateColumns="repeat(12, 1fr)">
      <GridItem h="80px" overflowY={'hidden'} mt={'-80px'} colSpan={12}>
        <div id={`waveform-${mockSong.audio.split('/ipfs/')[1]}`} className={'w-full'} />
      </GridItem>
    </Grid>
  );
};

export default SongWaveform;
