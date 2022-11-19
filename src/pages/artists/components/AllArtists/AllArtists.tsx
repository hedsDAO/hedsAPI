import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { Container, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import { formatWallet } from '@/utils';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllArtists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.artistModel);
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  const totalArtists = useSelector(store.select.artistModel.selectTotalArtists);
  const scrollDataMax = useSelector(store.select.artistModel.selectScrollDataMax)
  return (
    <Container maxW="7xl" className="mx-auto">
      <div className="mx-auto w-full px-4 lg:px-1">
        <Heading fontWeight={'bold'} letterSpacing={'tight'} size={['lg', 'xl']} color={'gray.800'} mt={{ base: 5, lg: 10 }} mb={3} px={4}>
          Artists
        </Heading>
      </div>
      <InfiniteScroll
        dataLength={scrollDataMax}
        next={() => dispatch.artistModel.setScrollDataMax(scrollDataMax)}
        hasMore={scrollDataMax < totalArtists}
        loader={<h4></h4>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 px-3">
          {allArtists?.length &&
            allArtists.slice(0, scrollDataMax).map((artist) => {
              return (
                <div
                  role="button"
                  onClick={() => navigate('/u/' + artist.wallet)}
                  key={artist.wallet + artist.banner}
                  className="group bg-gray-50 relative col-span-1 rounded-sm bs-preset-1 m-1"
                >
                  <Flex direction={'column'} className="col-span-1">
                    <Skeleton fadeDuration={3} className="col-span-1" isLoaded={!loading}>
                      <Image
                        w="full"
                        maxH={{ base: 'full' }}
                        maxW={{ base: 'full' }}
                        minH={{ base: 'full' }}
                        minW={{ base: 'full' }}
                        src={artist.profilePicture}
                        alt={artist.displayName}
                        objectFit="cover"
                        rounded="sm"
                        className="aspect-square group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
                      />
                    </Skeleton>
                    <Flex direction={'column'} py={2}>
                      <Text maxW="10rem" className="truncate" fontWeight={'semibold'} fontSize={{ base: 'xs', lg: 'base' }} px={3}>
                        {artist.displayName}
                      </Text>
                      <Text px={3} textColor={'gray.400'} fontSize={'xs'}>
                        {formatWallet(artist.wallet)}
                      </Text>
                    </Flex>
                  </Flex>
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default AllArtists;
