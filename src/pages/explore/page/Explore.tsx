import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Divider } from '@chakra-ui/react';
import { ActiveListings, ExploreHeader, MostAppearances, NewestTape, Stats } from '../components';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  useEffect(() => {
    if (allArtists) dispatch.artistModel.getMostFeaturedArtists([allArtists, 4]);
    dispatch.exploreModel.getLatestSecondaryListings();
  }, [allArtists]);

  return (
    <Box maxW="full">
      <ExploreHeader />
      <Divider mx="auto" w="80%" my={5} />
      <Stats />
      <Divider mx="auto" w="80%" my={5} />
      <NewestTape />
      <Divider mx="auto" w="80%" my={5} />
      <MostAppearances />
      <Divider mx="auto" w="80%" my={5} />
      <ActiveListings />
    </Box>
  );
};
