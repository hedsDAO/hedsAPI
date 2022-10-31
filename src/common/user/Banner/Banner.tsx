import { selectUserBanner } from '@/pages/user/store/selectors';
import { Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Banner = () => {
  const banner = useSelector(selectUserBanner);
  return <Image shadow={'lg'} src={banner} className="object-fit object-cover w-screen -mb-32 bg-gray-600 shadow-sm" h="48" />;
};

export default Banner;
