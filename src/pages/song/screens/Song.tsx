import { useEffect, useRef, useState } from 'react';
import { Box, Grid, GridItem, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { SongAppearsOn, SongDetails, SongHeader, SongLikes, SongWaveform } from '../components';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from '../models/common';
import { useLocation } from 'react-router-dom';
import { User } from '@/models/common';
import { useGlobalAudio } from '@/components/GlobalAudio/components/useGlobalAudio/useGlobalAudio';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import { formWaveSurferOptions } from '@/utils';

export const Song = () => {
  const { pathname } = useLocation();
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement>(null);
  // const { handleMute } = useGlobalAudio(waveformRef);
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);
  const currentSongHash = useSelector(store.select.globalAudioModel.selectCurrentSongHash);
  const song = useSelector(store.select.songModel.selectSong);

  useEffect(() => {
    const id = pathname?.split('/song/')?.[1];
    if (id) dispatch.songModel.getSongData(id);
  }, []);

  useEffect(() => {
    var options: WaveSurferParams; // wavesurfer params
    if (song?.audio) {
      if (waveformRef) options = formWaveSurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      if (song?.audio) wavesurfer.current?.load(song?.audio);
      wavesurfer.current?.on('ready', () => {
        setTimeout(() => dispatch.globalAudioModel.setIsLoading(false), 1000);
      });
      wavesurfer.current?.load(song?.audio);
    }
  }, [song]);

  return (
    <Box>
      {song && <SongHeader song={song} />}
      {song && <div ref={waveformRef} className={'w-full'} />}
      {/* {song && <SongWaveform song={song} />} */}
      {/* <Nav tabs={['Details', 'Appears On', 'Likes']} /> */}
      {/* {currentTab === SongNavbarTabs.DETAILS && <SongDetails cyanite={cyaniteData} curator={{} as User} song={song} />}
      {currentTab === SongNavbarTabs.APPEARS_ON && <SongAppearsOn />} */}
      {/* {currentTab === SongNavbarTabs.LIKES && <SongLikes users={mockTapeArtists} />} */}
    </Box>
  );
};
