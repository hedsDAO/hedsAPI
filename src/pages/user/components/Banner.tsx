import { store } from '@/store';
import { Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Banner = () => {
  const banner = useSelector(store.select.userModel.selectBanner);
  const [hasBannerLoaded, setHasBannerLoaded] = useBoolean();
  return (
    <Skeleton data-testid="user-banner-skeleton" isLoaded={hasBannerLoaded} minW="100vw" minH="30vh" maxH="30vh">
      <Image data-testid="user-banner-image" onLoad={setHasBannerLoaded.on} objectFit={'cover'} minW="100vw" minH="30vh" maxH="30vh" src={banner} />
    </Skeleton>
  );
};
