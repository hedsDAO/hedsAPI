import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Image, Skeleton, useBoolean } from '@chakra-ui/react';
import * as styles from '@/pages/user/components/Banner/styles';

/**
 * @function Banner
 * @description Renders a users' banner image with a skeleton before loading.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Banner = () => {
  const banner = useSelector(store.select.userModel.selectBanner);
  const [hasBannerLoaded, setHasBannerLoaded] = useBoolean();
  return (
    <Skeleton data-testid="user-banner-skeleton" isLoaded={hasBannerLoaded} {...styles.$skeletonStyles}>
      <Image data-testid="user-banner-image" onLoad={setHasBannerLoaded.on} src={banner} {...styles.$imageStyles} />
    </Skeleton>
  );
};
