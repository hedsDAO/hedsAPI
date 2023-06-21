import { Dispatch, store } from '@/store';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArtistCard } from '../components/ArtistCard/ArtistCard';
import { CuratorCard } from '../components/CuratorCard/CuratorCard';
import { BannerImage } from '../components/BannerImage/BannerImage';
import { Metatags, MetatagTypes } from '@/common/utilities/Metatags';
import Marquee from 'react-fast-marquee';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const artists = useSelector(store.select.artistsModel.selectArtists);
  const curators = useSelector(store.select.artistsModel.selectCurators);
  useEffect(() => {
    if (!artists || !curators) dispatch.artistsModel.getArtistsAndCurators();
  }, []);

  return (
    <Metatags type={MetatagTypes.ARTISTS}>
      <Box pt={2} px={5} maxW="7xl" mx="auto">
        <BannerImage />
        <Text mb={3} mt={10} color="heds.100" fontWeight={'bold'} fontSize="lg" fontFamily="poppins" letterSpacing={'widest'}>
          SAMPLE CURATORS
        </Text>
        <Box maxW="7xl" mx="auto">
          <Marquee speed={25} gradient={false}>
            <SimpleGrid columns={curators?.length}>
              {curators?.length &&
                curators.map((curator) => {
                  return <CuratorCard curator={curator} key={curator.wallet + 'curators'} />;
                })}
            </SimpleGrid>
          </Marquee>
        </Box>
        <Text mb={3} mt={10} color="heds.100" fontWeight={'bold'} fontSize="lg" fontFamily="poppins" letterSpacing={'widest'}>
          ARTISTS
        </Text>
        <Box maxW="7xl" mx="auto">
          <SimpleGrid columns={{ base: 2, lg: 7 }} spacing={2}>
            {artists?.length &&
              artists.map((artist) => {
                return <ArtistCard key={artist.wallet + 'artists'} artist={artist} />;
              })}
          </SimpleGrid>
        </Box>
      </Box>
    </Metatags>
  );
};
