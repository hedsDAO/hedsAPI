import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Divider, Image, Spinner, VStack } from '@chakra-ui/react';
import { LatestRelease, CarouselWrapper, HedsSolo, MostAppearances, HedsPlayer, Stats } from '@/pages/explore/components';
import { HEDS_IMG_PROPS, MAX_TOP_ARTISTS } from '@/pages/explore/store/constants';
import hedImage from '../../../public/heddot.png';

const carouselMapping: { [key: string]: JSX.Element } = {
  latestRelease: <LatestRelease />,
  hedSolo: <HedsSolo />,
  hedsPlayer: <HedsPlayer />,
};

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  const carouselOrder = useSelector(store.select.exploreModel.selectCarouselOrder);

  useEffect(() => {
    if (allArtists) dispatch.artistModel.getMostFeaturedArtists([allArtists, MAX_TOP_ARTISTS]);
  }, [allArtists]);

  useEffect(() => {
    dispatch.exploreModel.getExploreData();
    dispatch.exploreModel.getLatestSecondaryListings();
  }, []);

  return (
    <Box>
      {carouselOrder?.length ? (
        <CarouselWrapper slides={carouselOrder?.map((key) => carouselMapping[key])} />
      ) : (
        <VStack justifyContent={'center'} minH="70vh">
          <Spinner size="md" />
        </VStack>
      )}
      <Image src={hedImage} {...HEDS_IMG_PROPS} />
      <MostAppearances />
      <Divider mx="auto" w="80%" my={5} />
      <Stats />
      <Divider mx="auto" w="80%" my={5} />
    </Box>
  );
};
