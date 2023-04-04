import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { mockArtist, mockSong, mockTape } from './models/constant';
import { SongAppearsOn, SongDetails, SongHeader, SongLikes, SongWaveform } from './components';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from './models/common';
import { getCyaniteData } from '@/utils';
import { mockTapeArtists } from '../Tape/models/constant';

export const Song = () => {
  const [cyaniteData, setCyaniteData] = useState(null);
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  useEffect(() => {
    const fetchCyaniteData = async () => {
      console.log(mockSong.cyanite_id)
      let data = await getCyaniteData(parseInt(mockSong.cyanite_id));
      setCyaniteData(data.result);
    };
    fetchCyaniteData();
  }, []);
  return (
    <Box>
      <SongHeader />
      <SongWaveform />
      <Nav tabs={['Details', 'Appears On', 'Likes']} />
      {currentTab === SongNavbarTabs.DETAILS && <SongDetails cyanite={cyaniteData} curator={mockArtist} tape={mockTape} />}
      {currentTab === SongNavbarTabs.APPEARS_ON && <SongAppearsOn />}
      {currentTab === SongNavbarTabs.LIKES && <SongLikes users={mockTapeArtists} />}
    </Box>
  );
};
