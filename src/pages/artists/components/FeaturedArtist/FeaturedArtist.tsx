import { store } from '@/store';
import { Box, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { FEATURED_ARTIST_PROMO_IMG } from '../../store/constants';

const FeaturedArtist = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const artistMapping = useSelector(store.select.artistModel.selectArtistMapping);

  return (
    <Fragment>
      {Object.values(artistMapping)?.length && (
        <Box px={{ base: 5, lg: 4 }} pb={10} pt={5} maxW="7xl" mx="auto">
          <Skeleton rounded="2xl" isLoaded={hasImageLoaded}>
            <Image onLoad={setHasImageLoaded.on} border="1px" w="7xl" h="12rem" rounded="2xl" objectFit={'cover'} src={FEATURED_ARTIST_PROMO_IMG} />
          </Skeleton>
        </Box>
      )}
    </Fragment>
  );
};

export default FeaturedArtist;
