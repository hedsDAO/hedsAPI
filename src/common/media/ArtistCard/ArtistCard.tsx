import { User } from '@/models/common';
import { RootState } from '@/store';
import { formatWallet } from '@/utils';
import { Flex, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as gaEvents from '@/events';

const ArtistCard = ({ artist }: { artist: User }) => {
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const isLoading = useSelector((state: RootState) => state.loading.models.artistModel);

  return (
    <div
      role="button"
      onClick={() => {
        navigate('/u/' + artist.wallet);
        gaEvents.clickArtistCard(artist.displayName);
      }}
      key={artist.wallet + artist.banner}
      className="group border border-neutral-900 bg-gray-50 relative col-span-1 rounded-sm bs-preset-1 m-1"
    >
      <Flex direction={'column'} className="col-span-1">
        <Skeleton m={2} className="col-span-1 aspect-square" isLoaded={!isLoading && isImageLoaded}>
          <Image
            onLoad={() => setIsImageLoaded.on()}
            w="full"
            shadow={'sm'}
            maxH={{ base: 'full' }}
            maxW={{ base: 'full' }}
            minH={{ base: 'full' }}
            minW={{ base: 'full' }}
            bg="blackAlpha.100"
            _hover={{ bg: 'white', borderColor: 'gray.800' }}
            border={'1px'}
            borderColor={'gray.900'}
            src={artist.profilePicture}
            alt={artist.displayName}
            objectFit="cover"
            rounded="lg"
            className="aspect-square group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
          />
        </Skeleton>
        <Flex direction={'column'} pb={2}>
          <Text maxW="10rem" className="truncate" fontWeight={'semibold'} fontSize={{ base: 'xs', lg: 'base' }} px={3}>
            {artist.displayName}
          </Text>
          <Text fontFamily={'"Space Mono", monospace'} px={3} textColor={'gray.400'} fontSize={'xs'}>
            {formatWallet(artist.wallet)}
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default ArtistCard;
