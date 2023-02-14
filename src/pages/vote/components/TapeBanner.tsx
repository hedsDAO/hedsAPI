import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { store } from '@/store';
import { Box, Image, Skeleton, useBoolean } from '@chakra-ui/react';

export const TapeBanner = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const { tape, id } = useParams();
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));

  return (
    <Box pb={10} pt={5}>
      <Skeleton rounded="2xl" isLoaded={hasImageLoaded}>
        <Image shadow="sm" onLoad={setHasImageLoaded.on} w="7xl" h="6rem" rounded="xl" objectFit={'cover'} src={currentTape?.image} />
      </Skeleton>
    </Box>
  );
};
