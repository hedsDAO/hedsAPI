import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Divider, Image } from '@chakra-ui/react';
import { LatestRelease, CarouselWrapper, HedsSolo, MostAppearances, HedsPlayer, Stats } from '@/pages/explore/components';
import { HEDS_IMG_PROPS, MAX_TOP_ARTISTS } from '@/pages/explore/store/constants';
import hedImage from '../../../public/heddot.png';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  useEffect(() => {
    if (allArtists) dispatch.artistModel.getMostFeaturedArtists([allArtists, MAX_TOP_ARTISTS]);
  }, [allArtists]);

  useEffect(() => {
    dispatch.exploreModel.getLatestSecondaryListings();
  }, []);

  return (
    <Box>
      <CarouselWrapper slides={[<LatestRelease />, <HedsSolo />, <HedsPlayer />]} />
      <Image src={hedImage} {...HEDS_IMG_PROPS} />
      <MostAppearances />
      <Divider mx="auto" w="80%" my={5} />
      <Stats />
      <Divider mx="auto" w="80%" my={5} />
      {/* <ActiveListings /> */}
    </Box>
  );
};
