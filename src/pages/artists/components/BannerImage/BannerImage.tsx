import { Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { BANNER_IMAGE_URL } from '@/pages/artists/models/constants';

export const BannerImage = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Skeleton rounded={'lg'} startColor="heds.bg2" endColor="heds.400" minW="full" h="32" fitContent isLoaded={hasImageLoaded}>
      <Image onLoad={setHasImageLoaded.on} rounded="lg" maxH="32" minW={'full'} objectFit={'cover'} src={BANNER_IMAGE_URL} />
    </Skeleton>
  );
};
