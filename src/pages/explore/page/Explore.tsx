import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Divider, Image } from '@chakra-ui/react';
import { ActiveListings, CarouselWrapper, HedsSolo, MostAppearances, NewestTape, Stats } from '@/pages/explore/components';
import { HEDS_IMG_PROPS, MAX_TOP_ARTISTS } from '@/pages/explore/store/constants';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  useEffect(() => {
    if (allArtists) dispatch.artistModel.getMostFeaturedArtists([allArtists, MAX_TOP_ARTISTS]);
    dispatch.exploreModel.getLatestSecondaryListings();
  }, [allArtists]);

  return (
    <Box>
      <CarouselWrapper slides={[<HedsSolo />, <NewestTape />]} />
      <Image {...HEDS_IMG_PROPS} />
      <Divider mx="auto" w="80%" my={5} />
      <MostAppearances />
      <Divider mx="auto" w="80%" my={5} />
      <Stats />
      <Divider mx="auto" w="80%" my={5} />
      <ActiveListings />
    </Box>
  );
};
