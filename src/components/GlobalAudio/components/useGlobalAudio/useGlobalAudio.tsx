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
  const isPlaying = useSelector(store.select.globalAudioModel.selectIsPlaying);
  const isLocalAudioPlaying = useSelector(store.select.songModel.selectIsPlaying);
  const volume = useSelector(store.select.globalAudioModel.selectVolume);
  const progress = useSelector(store.select.globalAudioModel.selectProgress);

  useEffect(() => {
    dispatch.globalAudioModel.setIsLoading(true);
    var options: WaveSurferParams;
    const isOnSongPage = currentSongHash === pathname.split('/song/')[1];
    if (currentSong?.audio && !isOnSongPage && !isLocalAudioPlaying) {
      onOpen();
      if (waveformRef) options = formGlobalWavesurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      if (currentSong?.audio) wavesurfer.current?.load(currentSong?.audio);
      wavesurfer.current?.on('ready', () => {
        wavesurfer.current?.seekTo(progress);
        setTimeout(() => dispatch.globalAudioModel.setIsLoading(false), 1000);
      });
    } else {
      onClose();
      wavesurfer?.current?.destroy();
    }
    return () => {
      onClose();
      dispatch.globalAudioModel.setIsPlaying(false);
      wavesurfer?.current?.destroy();
    };
  }, [currentSong, isLocalAudioPlaying]);

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
