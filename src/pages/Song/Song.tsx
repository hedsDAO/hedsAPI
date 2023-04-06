import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { mockArtist } from './models/constant';
import { SongAppearsOn, SongDetails, SongHeader, SongLikes, SongWaveform } from './components';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from './models/common';
import { useParams } from 'react-router-dom';
import { mockTapeArtists } from '../Tape/models/constant';

export const Song = () => {
  const { id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);

  useEffect(() => {
    dispatch.songModel.getSongData(id);
  }, [id]);

  return (
    <Box>
      <SongHeader />
      <SongWaveform />
      <Nav tabs={['Details', 'Appears On', 'Likes']} />
      {currentTab === SongNavbarTabs.DETAILS && <SongDetails cyanite={cyaniteData} curator={mockArtist} />}
      {currentTab === SongNavbarTabs.APPEARS_ON && <SongAppearsOn />}
      {currentTab === SongNavbarTabs.LIKES && <SongLikes users={mockTapeArtists} />}
    </Box>
  );
};
