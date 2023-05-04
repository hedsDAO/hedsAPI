import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import WaveSurfer from 'wavesurfer.js';

import { Dispatch, store } from '@/store';
import { formGlobalWavesurferOptions } from '@/utils';
import { useDisclosure } from '@chakra-ui/react';

export const useGlobalAudio = (waveformRef: React.RefObject<HTMLDivElement>) => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<Dispatch>();
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const currentSong = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const currentSongHash = useSelector(store.select.globalAudioModel.selectCurrentSongHash);
  const isMuted = useSelector(store.select.globalAudioModel.selectIsMuted);
  const volume = useSelector(store.select.globalAudioModel.selectVolume);

  useEffect(() => {
    var options: WaveSurferParams; // wavesurfer params
    // if (!pathname.includes(currentSongHash)) {
    dispatch.globalAudioModel.setIsLoading(true);
    if (waveformRef) options = formGlobalWavesurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    if (currentSong?.audio) wavesurfer.current?.load(currentSong?.audio);
    wavesurfer.current?.on('ready', () => {
      setTimeout(() => dispatch.globalAudioModel.setIsLoading(false), 1000);
    });
    // }
  }, [waveformRef, isOpen, currentSongHash]);

  useEffect(() => {
    var options: WaveSurferParams; // wavesurfer params
    if (currentSong?.audio) {
      console.log(pathname.includes(currentSongHash));
      if (!pathname.includes(currentSongHash) && waveformRef?.current) onOpen();
      else {
        console.log('here');
        dispatch.globalAudioModel.setIsLoading(true);
        if (waveformRef) options = formGlobalWavesurferOptions(waveformRef.current);
        if (options) wavesurfer.current = WaveSurfer.create(options);
        if (currentSong?.audio) wavesurfer.current?.load(currentSong?.audio);
        wavesurfer.current?.on('ready', () => {
          setTimeout(() => dispatch.globalAudioModel.setIsLoading(false), 1000);
        });
      }
      wavesurfer.current?.load(currentSong?.audio);
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    const current = wavesurfer?.current?.isPlaying();
    if (current) {
      dispatch.globalAudioModel.setIsPlaying(false);
      wavesurfer?.current?.pause();
    } else {
      dispatch.globalAudioModel.setIsPlaying(true);
      wavesurfer?.current?.play();
    }
  };

  const handleVolume = (volume: number) => {
    const percent = volume / 100;
    dispatch.globalAudioModel.setVolume(percent);
    wavesurfer?.current?.setVolume(percent);
  };

  const handleMute = () => {
    const bool = !isMuted;
    if (isMuted) {
      dispatch.globalAudioModel.setIsMuted(bool);
      wavesurfer?.current?.setMute(bool);
      for (let i = 0; i <= 100; i++) handleVolume(i);
    } else {
      dispatch.globalAudioModel.setIsMuted(bool);
      wavesurfer?.current?.setMute(bool);
      for (let i = 100; i >= 0; i--) handleVolume(i);
    }
  };

  const handleClose = () => {
    onClose();
    wavesurfer?.current?.destroy();
    setTimeout(() => dispatch.globalAudioModel.clearState(), 500);
  };

  return { handlePlayPause, handleVolume, handleMute, handleClose, onOpen, onClose, isOpen, wavesurfer };
};
