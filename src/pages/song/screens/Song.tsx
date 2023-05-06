import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Nav } from '@/components/Nav/Nav';
import { Header } from '@/pages/song/components/Header/Header';
import { Dispatch, store } from '@/store';
import { Box, Divider, Skeleton } from '@chakra-ui/react';
import { DEFAULT_NAV_TABS } from '@pages/song//models/constants';
import { AppearsOn } from '@pages/song/components/AppearsOn/AppearsOn';
import { Details } from '@pages/song/components/Details/Details';
import { Likes } from '@pages/song/components/Likes/Likes';
import { Related } from '@pages/song/components/Related/Related';
import { useLocalAudio } from '@pages/song/components/useLocalAudio/useLocalAudio';
import { Waveform } from '@pages/song/components/Waveform/Waveform';
import { SongNavbarTabs } from '@pages/song/models/common';
import * as styles from '@pages/song/screens/styles';

/**
 * @function Song
 * @description The main Song component that renders and manages song-related sub-components and data.
 * This component is responsible for fetching the song data based on the song ID, displaying the header,
 * waveform, and navigation tabs, and switching between different content sections like Details, Related, Likes, and Appears On.
 * @returns {JSX.Element} The rendered Song component containing all sub-components and content.
 **/

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
      <Skeleton fitContent {...styles.$navSkeletonStyles(navbarTabs, isLoading)}>
        <Box {...styles.$navBoxStyles}>
          <Nav tabs={navbarTabs || DEFAULT_NAV_TABS} />
        </Box>
      </Skeleton>
      <Divider {...styles.$dividerStyles} />
      <Box {...styles.$contentBoxStyles}>
        {currentTab === SongNavbarTabs.DETAILS && <Details />}
        {currentTab === SongNavbarTabs.RELATED && <Related />}
        {currentTab === SongNavbarTabs.LIKES && <Likes />}
        {currentTab === SongNavbarTabs.APPEARS_ON && <AppearsOn />}
      </Box>
    </Box>
  );
};
