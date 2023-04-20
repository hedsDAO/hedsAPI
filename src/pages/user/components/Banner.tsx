import { store } from '@/store';
import { Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const Banner = () => {
  const banner = useSelector(store.select.userModel.selectBanner);
  const [hasBannerLoaded, setHasBannerLoaded] = useBoolean();
  return (
    <Skeleton isLoaded={hasBannerLoaded} minW="100vw" minH="30vh" maxH="30vh">
      <Image onLoad={setHasBannerLoaded.on} objectFit={'cover'} minW="100vw" minH="30vh" maxH="30vh" src={banner} />
    </Skeleton>
  );
};
