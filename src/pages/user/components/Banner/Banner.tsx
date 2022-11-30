import { RootState, store } from '@/store';
import { Image, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DEFAULT_BANNER_PICTURE from '/public/banner.jpg';

const Banner = () => {
  const banner = useSelector(store.select.userModel.selectCurrentUserBanner);
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  return (
    <Skeleton startColor='gray.50' endColor='blackAlpha.200' minHeight={'40'} maxHeight={'40'} minW="fit-content" fadeDuration={1} speed={0.5} isLoaded={!loading}>
      <Image
        data-testid="user-banner"
        shadow={'lg'}
        loading="eager"
        src={banner?.length && !loading ? banner : DEFAULT_BANNER_PICTURE}
        className="object-fit object-cover w-screen -mb-20 bg-gray-600 shadow-sm"
        h="40"
      />
    </Skeleton>
  );
};

export default Banner;
