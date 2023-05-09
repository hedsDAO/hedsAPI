import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import formWavesurferOptions from '@/utils/formWavesurferOptions';
import WaveSurfer from 'wavesurfer.js';
import { Howl } from 'howler';

export const useLocalAudio = (waveformRef: React.RefObject<HTMLDivElement>) => {
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const playbackPositionRef = useRef(0);
  const isUserSeeking = useRef(false);
  const dispatch = useDispatch<Dispatch>();
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const song = useSelector(store.select.songModel.selectSong);
  const audioInstance = useRef<Howl | null>(null);
  const isPlaying = useSelector(store.select.songModel.selectIsPlaying);

  useEffect(() => {
    let positionInterval: NodeJS.Timeout | undefined;
    if (isPlaying && audioInstance.current) {
      positionInterval = setInterval(() => {
        if (!isUserSeeking.current) {
          setPlaybackPosition(audioInstance.current.seek() as number);
          playbackPositionRef.current = audioInstance.current.seek() as number;
        }
      }, 100);
    } else {
      clearInterval(positionInterval);
    }
    return () => {
      clearInterval(positionInterval);
    };
  }, [isPlaying, audioInstance.current]);

  useEffect(() => {
    if (wavesurfer.current && !wavesurfer.current.isPlaying()) {
      wavesurfer.current.seekTo(playbackPosition / audioInstance.current?.duration());
    }
  }, [playbackPosition]);

  const handleSeek = (e: number) => {
    const seekedValue = Math.round(e * wavesurfer.current?.getDuration() * 10) / 10;
    const currentValue = Math.round(playbackPositionRef.current * 10) / 10;
    if (seekedValue !== currentValue && isUserSeeking.current) {
      audioInstance.current?.seek(e * wavesurfer.current?.getDuration());
      isUserSeeking.current = false;
    }
  };

  useEffect(() => {
    if (song?.audio) audioInstance.current = new Howl({ src: [song.audio], html5: true });
    var options: WaveSurferParams;
    if (waveformRef?.current) options = formWavesurferOptions(waveformRef.current);
    if (options) wavesurfer.current = WaveSurfer.create(options);
    if (waveformRef.current) wavesurfer.current?.load(song?.audio);
    if (wavesurfer?.current) {
      wavesurfer.current?.on('ready', () => dispatch.songModel.setIsLoading(false));
      wavesurfer.current?.on('seek', (e) => handleSeek(e));
      waveformRef.current?.addEventListener('click', (e) => {
        isUserSeeking.current = true;
      });
    }
    return () => {
      audioInstance.current?.unload();
      wavesurfer?.current?.destroy();
    };
  }, [waveformRef?.current, song?.audio]);

  useEffect(() => {
    if (isPlaying) {
      audioInstance.current?.play();
    } else {
      audioInstance.current?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    dispatch.songModel.setIsPlaying(!isPlaying);
  };

  return { handlePlayPause, wavesurfer };
};
