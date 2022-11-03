import { Fragment } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatWallet } from '@/utils';
import { Container, Divider, Flex, Heading, Image, Skeleton, Text } from '@chakra-ui/react';
import Marquee from 'react-fast-marquee';

export const Artists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.artistModel);
  const { allArtists, allCurators, currentPage, currentSort } = useSelector((state: RootState) => state.artistModel);
  return (
    <>
      {allArtists && (
        <Fragment>
          <Container maxW="7xl" className="mx-auto pb-5">
            <div className="mx-auto w-full px-4 lg:px-1">
              <Heading fontWeight={'bold'} letterSpacing={'tight'} size={['lg', 'xl']} color={'gray.800'} mt={{ base: 5, lg: 10 }} mb={3} p={1}>
                Sample Curators
              </Heading>
            </div>
            <Marquee gradient={false}>
              {allCurators?.length &&
                allCurators.map((curator) => {
                  return (
                    <div
                      role="button"
                      onClick={() => navigate('/u/' + curator.wallet)}
                      key={curator.wallet + curator.banner}
                      className="group bg-gray-50 relative col-span-1 rounded-sm bs-preset-1 m-2"
                    >
                      <Flex direction={'column'} className="col-span-1">
                        <Skeleton fadeDuration={3} className="col-span-1" isLoaded={!loading}>
                          <Image
                            maxH={{ base: '10rem', lg: '10rem' }}
                            maxW={{ base: 'full', lg: '10rem' }}
                            minH={{ base: '10rem', lg: '10rem' }}
                            minW={{ base: 'full', lg: '10rem' }}
                            src={curator.profilePicture}
                            alt={curator.displayName}
                            objectFit="contain"
                            rounded="sm"
                            className="aspect-square group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
                          />
                        </Skeleton>
                        <Flex direction={'column'} py={2}>
                          <Text maxW="10rem" className="truncate" fontWeight={'semibold'} fontSize={{ base: 'xs', lg: 'base' }} px={3}>
                            {curator.displayName}
                          </Text>
                          <Text px={3} textColor={'gray.400'} fontSize={'xs'}>
                            {formatWallet(curator.wallet)}
                          </Text>
                        </Flex>
                      </Flex>
                    </div>
                  );
                })}
            </Marquee>
          </Container>
          <Divider my={3} />
          <Container maxW="7xl" className="mx-auto">
            <div className="mx-auto w-full px-4 lg:px-1">
              <Heading fontWeight={'bold'} letterSpacing={'tight'} size={['xl', '2xl']} color={'gray.800'} mt={{ base: 5, lg: 10 }} mb={3} p={1}>
                Artists
              </Heading>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 px-3">
              {allArtists?.length &&
                allArtists.map((artist) => {
                  return (
                    <Flex className="col-span-1">
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
                    </Flex>
                  );
                })}
            </div>
          </Container>
        </Fragment>
      )}
    </>
  );
};
