import { Howl } from 'howler';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAudioController } from '@/hooks/useAudio/models/AudioContext';
import { Song } from '@/models/common';
import { Dispatch, store } from '@/store';

/**
 * Custom hook to manage audio playback
 */
export const useAudio = () => {
  const dispatch = useDispatch<Dispatch>();
  const { state, setState } = useAudioController();
  const { pathname } = useLocation();
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const progress = useSelector(store.select.audioModel.selectProgress);
  const song = useSelector(store.select.audioModel.selectSong);
  const upNext = useSelector(store.select.audioModel.selectUpNext);
  const previous = useSelector(store.select.audioModel.selectPrevious);
  const isOnOwnSongPage: boolean = song?.audio?.split('/ipfs/')[1] === pathname?.split('/song/')[1] || pathname.includes('/vote');
  const isOnHomePage: boolean = pathname === '/';

  useEffect(() => {
    if (state.howlerInstance) {
      state.howlerInstance.on('end', () => {
        if (upNext) {
          dispatch.audioModel.setIsLoading(true);
          dispatch.audioModel.setIsPlaying(false);
          createHowlerInstance(upNext.audio);
          dispatch.audioModel.setSong(upNext);
          dispatch.audioModel.setIsPlaying(true);
          dispatch.audioModel.setIsLoading(false);
        } else {
          dispatch.audioModel.setIsLoading(true);
          dispatch.audioModel.getNextSong(song);
          dispatch.audioModel.getPrevious(song);
          dispatch.audioModel.setIsPlaying(false);
          dispatch.audioModel.setIsLoading(false);
          dispatch.audioModel.setProgress(0);
          dispatch.audioModel.clearState();
          dispatch.globalAudioModel.setIsOpen(false);
        }
      });
      state.howlerInstance.on('load', () => {
        dispatch.audioModel.setIsLoading(false);
      });
    }
  }, [state.howlerInstance]);

  /**
   * Handle global audio state based on the song page
   */

  useEffect(() => {
    if (song) {
      dispatch.audioModel.getNextSong(song);
      dispatch.audioModel.getPrevious(song);
    }
    if (isOnOwnSongPage || isOnHomePage) dispatch.globalAudioModel.setIsOpen(false);
    else if (!isOnOwnSongPage && song?.audio && progress >= 0) {
      dispatch.globalAudioModel.setIsOpen(true);
      dispatch.audioModel.getSongLikes(song);
      if (!previous) dispatch.audioModel.setPrevious(song);
      if (!upNext) dispatch.audioModel.getNextSong(song);
      dispatch.audioModel.setIsLoading(false);
    } else dispatch.globalAudioModel.setIsOpen(false);
  }, [song.audio, pathname]);

  /**
   * Update audio progress in audioModel
   */

  useEffect(() => {
    let positionInterval: NodeJS.Timeout | undefined;
    if (!isOnOwnSongPage && isPlaying && state.howlerInstance) {
      positionInterval = setInterval(() => {
        const progress = state.howlerInstance.seek() as number;
        dispatch.audioModel.setProgress(progress);
      }, 100);
    } else clearInterval(positionInterval);

    return () => {
      clearInterval(positionInterval);
    };
  }, [isPlaying, state.howlerInstance, dispatch.audioModel, isOnOwnSongPage]);

  /**
   * Create howler instance for the current song
   * @param {string} src - The audio URL
   */

  const createHowlerInstance = (src: string) => {
    if (state.howlerInstance instanceof Howl) state.howlerInstance.unload();
    const newInstance = new Howl({
      src: [src],
      html5: true,
    });
    setState({ howlerInstance: newInstance });
  };

  /**
   * Toggle play/pause for the current audio
   */
  const handlePlayPause = (requestedSong: Song) => {
    if (song?.audio === requestedSong?.audio && state.howlerInstance instanceof Howl) {
      dispatch.audioModel.setIsPlaying(!isPlaying);
    } else {
      dispatch.audioModel.setIsLoading(true);
      createHowlerInstance(requestedSong.audio);
      dispatch.audioModel.setSong(requestedSong);
      dispatch.audioModel.setIsPlaying(true);
      dispatch.audioModel.setIsLoading(false);
    }
  };

  const handlePrevious = async () => {
    dispatch.audioModel.setIsPlaying(false);
    dispatch.audioModel.setIsLoading(true);
    if (!previous) {
      await dispatch.audioModel.getPrevious(previous);
      await dispatch.audioModel.getSongLikes(previous);
      dispatch.audioModel.setSong(previous);
      createHowlerInstance(previous.audio);
      dispatch.audioModel.setProgress(0);
      dispatch.audioModel.setIsLoading(false);
    } else {
      createHowlerInstance(previous.audio);
      await dispatch.audioModel.getSongLikes(previous);
      dispatch.audioModel.setSong(previous);
      dispatch.audioModel.setProgress(0);
      dispatch.audioModel.setIsLoading(false);
    }
  };

  const handleUpNext = async () => {
    dispatch.audioModel.setIsPlaying(false);
    dispatch.audioModel.setIsLoading(true);
    if (!upNext) {
      await dispatch.audioModel.getNextSong(upNext);
      await dispatch.audioModel.getSongLikes(upNext);
      createHowlerInstance(upNext.audio);
      dispatch.audioModel.setPrevious(song);
      dispatch.audioModel.setSong(upNext);
      dispatch.audioModel.setProgress(0);
      dispatch.audioModel.setIsLoading(false);
    } else {
      dispatch.audioModel.setIsLoading(true);
      dispatch.audioModel.setPrevious(song);
      await dispatch.audioModel.getSongLikes(upNext);
      createHowlerInstance(upNext.audio);
      dispatch.audioModel.setSong(upNext);
      dispatch.audioModel.setProgress(0);
      dispatch.audioModel.setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state.howlerInstance instanceof Howl) {
      const current = state.howlerInstance.playing();
      if (isPlaying && !current) state.howlerInstance.play();
      else if (!isPlaying && current) state.howlerInstance.pause();
    }
  }, [isPlaying, state.howlerInstance]);

  /**
   * Get the current progress of the audio
   * @returns {number} - The current progress in seconds
   */
  const getProgress = () => {
    if (state.howlerInstance) return state.howlerInstance.seek() as number;
    else return 0;
  };

  /**
   * Get the duration of the current audio
   * @returns {number} - The duration in seconds
   */
  const getDuration = () => {
    if (state.howlerInstance) return state.howlerInstance.duration() as number;
    else return 0;
  };

  /**
   * Seek the audio to a specific position
   * @param {number} e - A value between 0 and 1 representing the position to seek to
   */
  const seek = (e: number) => {
    if (state.howlerInstance) state.howlerInstance.seek(e * state.howlerInstance.duration());
  };

  /**
   * Toggle mute for the current audio
   */

  const handleMute = () => {
    if (state.howlerInstance) {
      const requestedMuteAction = !state.howlerInstance.mute();
      dispatch.audioModel.setIsMuted(requestedMuteAction);
      state.howlerInstance.mute(requestedMuteAction);
      dispatch.globalAudioModel.setIsMuted(requestedMuteAction);
      if (requestedMuteAction) dispatch.globalAudioModel.setVolume(0);
      else dispatch.globalAudioModel.setVolume(1);
    }
  };

  /**
   * Set the desired volume of the audio player
   * @param {number} e - A value between 0 and 1 representing the volume level
   */

  const handleVolume = (e: number) => {
    dispatch.globalAudioModel.setVolume(e);
    state?.howlerInstance?.volume(e);
  };

  /**
   * Closes and mutes the global audio player
   */

  const handleClose = () => {
    dispatch.globalAudioModel.setIsPlaying(false);
    dispatch.globalAudioModel.setIsOpen(false);
  };

  return { handlePlayPause, getProgress, getDuration, seek, handleMute, handlePrevious, handleUpNext, handleVolume, handleClose, isOnOwnSongPage };
};
