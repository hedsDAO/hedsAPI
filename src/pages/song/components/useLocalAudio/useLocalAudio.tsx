import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import formWavesurferOptions from '@/utils/formWavesurferOptions';
import WaveSurfer from 'wavesurfer.js';

export const useLocalAudio = (waveformRef: React.RefObject<HTMLDivElement>) => {
  const dispatch = useDispatch<Dispatch>();
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const song = useSelector(store.select.songModel.selectSong);

  useEffect(() => {
    var options: WaveSurferParams;
    if (waveformRef?.current) options = formWavesurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    if (waveformRef.current) {
      if (song?.audio) wavesurfer.current?.load(song?.audio);
      if (wavesurfer?.current) dispatch.songModel.setIsLoading(true);
      wavesurfer.current?.on('ready', () => {
        setTimeout(() => dispatch.globalAudioModel.setIsLoading(false), 1000);
      });
    }
  }, [waveformRef?.current, song?.audio]);

  const handlePlayPause = () => {
    const current = wavesurfer?.current?.isPlaying();
    if (current) {
      dispatch.songModel.setIsPlaying(false);
      wavesurfer?.current?.pause();
    } else {
      dispatch.songModel.setIsPlaying(true);
      wavesurfer?.current?.play();
    }
  };

  return { handlePlayPause, wavesurfer };
};
