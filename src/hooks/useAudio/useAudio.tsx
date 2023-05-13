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
  const isOnOwnSongPage: boolean = song?.audio?.split('/ipfs/')[1] === pathname?.split('/song/')[1];

  useEffect(() => {
    if (state.howlerInstance) {
      state.howlerInstance.on('end', () => {
        if (upNext) {
          createHowlerInstance(upNext.audio);
          dispatch.audioModel.setSong(upNext);
          dispatch.audioModel.setIsPlaying(true);
        } else {
          dispatch.audioModel.setIsPlaying(false);
          dispatch.audioModel.setProgress(0);
        }
      });
    }
  }, [state.howlerInstance]);

  /**
   * Handle global audio state based on the song page
   */

  useEffect(() => {
    if (isOnOwnSongPage) dispatch.globalAudioModel.setIsOpen(false);
    else if (!isOnOwnSongPage && song) dispatch.globalAudioModel.setIsOpen(true);
    else dispatch.globalAudioModel.setIsOpen(false);
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
      dispatch.audioModel.getNextSong(requestedSong);
      createHowlerInstance(requestedSong.audio);
      dispatch.audioModel.setSong(requestedSong);
      dispatch.audioModel.setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (previous) {
      dispatch.audioModel.getNextSong(previous);
      createHowlerInstance(previous.audio);
      dispatch.audioModel.setSong(previous);
      dispatch.audioModel.setIsPlaying(true);
    }
  };

  const handleUpNext = () => {
    if (upNext) {
      dispatch.audioModel.getNextSong(upNext);
      createHowlerInstance(upNext.audio);
      dispatch.audioModel.setSong(upNext);
      dispatch.audioModel.setIsPlaying(true);
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

  const handleMute = () => {
    if (state.howlerInstance) {
      const requestedMuteAction = !state.howlerInstance.mute();
      dispatch.audioModel.setIsMuted(requestedMuteAction);
      state.howlerInstance.mute(requestedMuteAction);
    }
  };

  return { handlePlayPause, getProgress, getDuration, seek, handleMute, handlePrevious, handleUpNext, isOnOwnSongPage };
};
