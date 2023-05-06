import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import formWavesurferOptions from '@/utils/formWavesurferOptions';
import WaveSurfer from 'wavesurfer.js';

/**
 * @function useLocalAudio
 * @description A custom React hook that initializes and manages a local audio player using WaveSurfer.js.
 * @param {React.RefObject<HTMLDivElement>} waveformRef - A reference to the waveform container element.
 * @returns {Object} - An object containing the handlePlayPause function and the wavesurfer instance.
 **/

export const useLocalAudio = (waveformRef: React.RefObject<HTMLDivElement>) => {
  const dispatch = useDispatch<Dispatch>();
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const song = useSelector(store.select.songModel.selectSong);

  useEffect(() => {
    var options: WaveSurferParams;
    if (waveformRef?.current) options = formWavesurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    if (waveformRef.current) {
      if (song?.audio) setTimeout(() => wavesurfer.current?.load(song?.audio), 2000);
      if (wavesurfer?.current){}
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

  useEffect(() => {
    return () => {
      wavesurfer?.current?.destroy();
    };
  }, []);

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
