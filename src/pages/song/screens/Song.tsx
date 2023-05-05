import { useEffect, useRef } from 'react';
import { Box, Divider, Skeleton, keyframes } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Header } from '@/pages/song/components/Header/Header';
import { useParams } from 'react-router-dom';
import { useLocalAudio } from '@/pages/song/components/useLocalAudio/useLocalAudio';
import { Waveform } from '@/pages/song/components/Waveform/Waveform';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from '@/pages/song/models/common';
import { Details } from '@/pages/song/components/Details/Details';
import { AppearsOn } from '@/pages/song/components/AppearsOn/AppearsOn';
import { Related } from '../components/Related/Related';
import { Likes } from '@/pages/song/components/Likes/Likes';

export const Song = () => {
  const dispatch = useDispatch<Dispatch>();
  const { id } = useParams();
  const waveformRef = useRef<HTMLDivElement>(null);
  const { handlePlayPause } = useLocalAudio(waveformRef);
  const song = useSelector(store.select.songModel.selectSong);
  const navbarTabs = useSelector(store.select.songModel.selectNavbarTabs);
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  const isLoading = useSelector(store.select.songModel.selectIsLoading);


  useEffect(() => {
    dispatch.navModel.setCurrentTab(SongNavbarTabs.DETAILS);
    if (id?.length) dispatch.songModel.getSongData(id);
  }, [id]);

  return (
    <Box>
      <Header handlePlayPause={handlePlayPause} />
      {song?.audio && <Waveform waveformRef={waveformRef} />}
      <Skeleton isLoaded={!!navbarTabs?.length && !isLoading} startColor="heds.bg3" endColor="heds.bg1" w="100vw" fitContent>
        <Box maxW={{ lg: '85vw' }} mx="auto">
          <Nav tabs={navbarTabs || ['Details', 'Related']} />
        </Box>
      </Skeleton>
      <Divider mt={{ lg: 2 }} borderColor="heds.100" />
      <Box px={6} maxW={{ lg: '8xl' }} mx="auto">
        {currentTab === SongNavbarTabs.DETAILS && <Details />}
        {currentTab === SongNavbarTabs.RELATED && <Related />}
        {currentTab === SongNavbarTabs.LIKES && <Likes />}
        {currentTab === SongNavbarTabs.APPEARS_ON && <AppearsOn />}
      </Box>
    </Box>
  );
};
