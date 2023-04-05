import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { mockArtist, mockSong } from './models/constant';
import { SongAppearsOn, SongDetails, SongHeader, SongLikes, SongWaveform } from './components';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from './models/common';
import { getCyaniteData } from '@/utils';
import { mockTapeArtists } from '../Tape/models/constant';
import { useParams } from 'react-router-dom';


export const Song = () => {
  const { id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const [cyaniteData, setCyaniteData] = useState(null);
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  useEffect(() => {
    console.log(id)
    dispatch.songModel.getSongData(id);
    const fetchCyaniteData = async () => {
      console.log(mockSong.cyanite_id);
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
      {currentTab === SongNavbarTabs.DETAILS && <SongDetails cyanite={cyaniteData} curator={mockArtist} />}
      {currentTab === SongNavbarTabs.APPEARS_ON && <SongAppearsOn />}
      {currentTab === SongNavbarTabs.LIKES && <SongLikes users={mockTapeArtists} />}
    </Box>
  );
};
