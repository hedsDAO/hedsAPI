import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WaveSurfer from 'wavesurfer.js';
import { useAudioController } from '@/hooks/useAudio/models/AudioContext';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { Song } from '@/models/common';
import { Dispatch, store } from '@/store';
import { formWaveSurferOptions } from '@/utils';

/**
 * useWaveform is a custom hook for managing waveform visualization and interaction
 * @param {Object} params - The parameters for the hook
 * @param {React.RefObject<HTMLDivElement>} params.waveformRef - The ref for the waveform container
 * @param {Song} params.song - The song object
 * @returns {Object} - Returns an object containing the `isWaveformLoading` state
 */
export const useWaveform = ({ waveformRef, song }: { waveformRef: React.RefObject<HTMLDivElement>; song: Song }) => {
  const { isOnOwnSongPage } = useAudio();
  const { state } = useAudioController();
  const [seekPosition, setSeekPosition] = useState(0);
  const dispatch = useDispatch<Dispatch>();
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const isUserSeeking = useRef(false);
  const playbackPositionRef = useRef(0);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const isWaveformLoading = useSelector(store.select.waveformModel.selectIsLoading);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const currentSong = useSelector(store.select.audioModel.selectSong);

  /**
   * Handle updating the playback position of the waveform
   */
  useEffect(() => {
    let positionInterval: NodeJS.Timeout | undefined;
    if (isOnOwnSongPage && isPlaying && state.howlerInstance) {
      positionInterval = setInterval(() => {
        if (!isUserSeeking.current) {
          dispatch.audioModel.setProgress(state.howlerInstance?.seek());
          setPlaybackPosition(state.howlerInstance?.seek());
          playbackPositionRef.current = state.howlerInstance?.seek();
        }
      }, 100);
    } else clearInterval(positionInterval);

    return () => {
      clearInterval(positionInterval);
    };
  }, [isPlaying, state.howlerInstance]);

  /**
   * Update the position of the waveform's seek bar
   */
  useEffect(() => {
    if (wavesurfer.current && isOnOwnSongPage) {
      const requestedPosition = playbackPosition / wavesurfer.current?.getDuration();
      if (requestedPosition < 1 && requestedPosition > 0) {
        wavesurfer.current.seekTo(playbackPosition / wavesurfer.current.getDuration());
      }
    }
  }, [playbackPosition]);

  /**
   * Handle seeking on the waveform
   * @param {number} e - The seek position (0-1 range)
   */
  useEffect(() => {
    if (!state.howlerInstance) return;
    const requestedTime = Math.round(seekPosition * wavesurfer.current?.getDuration() * 10) / 10;
    const currentTime = Math.round(playbackPositionRef.current * 10) / 10;
    if (requestedTime !== currentTime && isUserSeeking.current) {
      state.howlerInstance.seek(seekPosition * wavesurfer.current?.getDuration());
      isUserSeeking.current = false;
    }
  }, [seekPosition]);

  /**
   * Initialize and manage the waveform instance
   */
  useEffect(() => {
    dispatch.audioModel.setIsLoading(true);
    if (!waveformRef.current || !song.audio) return;
    if (song.audio !== currentSong?.audio && waveformRef.current) wavesurfer.current?.destroy();
    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(song.audio);
    wavesurfer.current.on('waveform-ready', () => dispatch.audioModel.setIsLoading(false));
    wavesurfer.current.on('ready', () => {
      dispatch.audioModel.setIsLoading(false)
      wavesurfer?.current?.setVolume(0)
    });
    wavesurfer.current.on('seek', (e) => setSeekPosition(e));
    waveformRef.current.addEventListener('click', () => (isUserSeeking.current = true));
    return () => {
      isUserSeeking.current = false;
      wavesurfer.current?.destroy();
    };
  }, [waveformRef.current, song.audio]);

  return { isWaveformLoading };
};
