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
      if (song?.audio) (setTimeout(() => wavesurfer.current?.load(song?.audio), 2000));
      if (wavesurfer?.current) dispatch.songModel.setIsLoading(true);
      wavesurfer.current?.on('ready', () => {
        dispatch.songModel.setIsLoading(false);
      });
      wavesurfer.current?.on('waveform-ready', () => {
        dispatch.songModel.setIsLoading(false);
      });
    }
    return () => {
      if (wavesurfer?.current?.isPlaying()) {
        const progress = wavesurfer?.current?.getCurrentTime();
        dispatch.globalAudioModel.setProgresss(progress);
      }
      dispatch.songModel.setIsPlaying(false);
      wavesurfer?.current?.destroy();
    };
  }, [waveformRef?.current, song?.audio]);

  const handlePlayPause = () => {
    setTimeout(() => dispatch.globalAudioModel.setCurrentSong(song), 1000);
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
