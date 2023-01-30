import { User } from '@/models/common';
import { RootState } from '@/store';
import { formatWallet } from '@/utils';
import { Flex, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CuratorCard = ({ curator }: { curator: User }) => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const isLoading = useSelector((state: RootState) => state.loading.models.artistModel);
  const navigate = useNavigate();
  return (
    <div
      role="button"
      onClick={() => navigate('/u/' + curator.wallet)}
      key={curator.wallet + curator.banner}
      className="group bg-fuchsia-50 border border-neutral-900 relative col-span-1 rounded-sm bs-preset-1 m-2"
    >
      <Flex direction={'column'} className="col-span-1">
        <Skeleton rounded="sm" m={2} className="col-span-1" isLoaded={!isLoading && isImageLoaded}>
          <Image
            onLoad={() => setIsImageLoaded.on()}
            maxH={{ base: '10rem', lg: '10rem' }}
            maxW={{ base: 'full', lg: '10rem' }}
            minH={{ base: '10rem', lg: '10rem' }}
            minW={{ base: 'full', lg: '10rem' }}
            bg="blackAlpha.100"
            _hover={{ bg: 'white', borderColor: 'gray.800' }}
            border={'1px'}
            borderColor={'gray.900'}
            src={curator.profilePicture}
            alt={curator.displayName}
            objectFit="cover"
            rounded="lg"
            className="aspect-square bs-preset-1 group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
          />
        </Skeleton>
        <Flex direction={'column'} pb={2}>
          <Text maxW="10rem" className="truncate" fontWeight={'semibold'} fontSize={{ base: 'xs', lg: 'base' }} px={3}>
            {curator.displayName}
          </Text>
          <Text fontFamily={'"Space Mono", monospace'} px={3} textColor={'gray.400'} fontSize={'xs'}>
            {formatWallet(curator.wallet)}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default CuratorCard;
