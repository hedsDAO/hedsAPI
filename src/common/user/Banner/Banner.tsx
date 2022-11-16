import { selectUserBanner } from '@/pages/user/store/selectors';
import { RootState } from '@/store';
import { Image, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DEFAULT_BANNER_PICTURE from '/public/banner.jpg';

const Banner = () => {
  const banner = useSelector(selectUserBanner);
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  return (
    <Skeleton minHeight={'48'} maxHeight={'48'} minW="fit-content" speed={2} isLoaded={!loading}>
      <Image
        data-testid="user-banner"
        shadow={'lg'}
        loading="eager"
        src={banner?.length && !loading ? banner : DEFAULT_BANNER_PICTURE}
        className="object-fit object-cover w-screen -mb-32 bg-gray-600 shadow-sm"
        h="48"
      />
    </Skeleton>
  );
};

export default Banner;
