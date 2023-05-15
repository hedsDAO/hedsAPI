import { Dispatch, store } from '@/store';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArtistCard } from '../components/ArtistCard/ArtistCard';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const artists = useSelector(store.select.artistsModel.selectArtists);
  const curators = useSelector(store.select.artistsModel.selectCurators);
  useEffect(() => {
    if (!artists || !curators) dispatch.artistsModel.getArtistsAndCurators();
  }, []);

  return (
    <Box pt={2} px={5} mx="auto">
      <SimpleGrid columns={{ base: 2, lg: 8 }} spacing={2}>
        {artists?.length &&
          artists.map((artist) => {
            return <ArtistCard key={artist.wallet + 'artists'} artist={artist} />;
          })}
      </SimpleGrid>
    </Box>
  );
};
