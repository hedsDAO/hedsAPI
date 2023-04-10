import { useEffect } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { mockArtist } from './models/constant';
import { SongAppearsOn, SongDetails, SongHeader, SongLikes, SongRelatedTracks, SongWaveform } from './components';
import { Nav } from '@/components/Nav/Nav';
import { SongNavbarTabs } from './models/common';
import { useParams } from 'react-router-dom';
import { mockTapeArtists } from '../Tape/models/constant';

export const Song = () => {
  const { id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const currentTab = useSelector(store.select.navModel.selectCurrentTab);
  const cyaniteData = useSelector(store.select.songModel.selectCyaniteData);
  const isSongPageLoading = useSelector((state: RootState) => state.loading.models.songModel);

  useEffect(() => {
    dispatch.songModel.getSongData(id);
  }, [id]);

  return (
    <Box>
      {isSongPageLoading ? (
        <Flex alignItems={'center'} justifyContent="center" minH="100vh" minW="100vw">
          <Spinner color="white" />
        </Flex>
      ) : (
        <>
          <SongHeader />
          <SongWaveform />
          <Nav tabs={['Related Tracks', 'Details', 'Appears On', 'Likes']} />
          {currentTab === SongNavbarTabs.RELATED_TRACKS && <SongRelatedTracks />}
          {currentTab === SongNavbarTabs.DETAILS && <SongDetails cyanite={cyaniteData} curator={mockArtist} />}
          {currentTab === SongNavbarTabs.APPEARS_ON && <SongAppearsOn />}
          {currentTab === SongNavbarTabs.LIKES && <SongLikes users={mockTapeArtists} />}
        </>
      )}
    </Box>
  );
};
