import { store } from '@/store';
import { GridItem, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DEFAULT_BANNER_PICTURE from '/public/banner.jpg';

const Banner = () => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const banner = useSelector(store.select.userModel.selectCurrentUserBanner);
  return (

      <Skeleton startColor="purple.100" endColor="purple.200" minHeight={'40'} maxHeight={'40'} isLoaded={isImageLoaded} fadeDuration={2}>
        <Image
          onLoad={setIsImageLoaded.on}
          data-testid="user-banner"
          shadow={'lg'}
          loading="eager"
          src={banner?.length ? banner : DEFAULT_BANNER_PICTURE}
          className="object-fit object-cover w-screen mx-auto -mb-20 bg-gray-600 shadow-sm"
          h="40"
        />
      </Skeleton>
  );
};

export default Banner;
