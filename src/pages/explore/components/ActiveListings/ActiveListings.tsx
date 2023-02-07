import { useDispatch, useSelector } from 'react-redux';
import { FetchEns } from '@/hooks';
import { Dispatch, store } from '@/store';
import { Box, Button, Flex, Heading, Icon, IconButton, Image, Link, SimpleGrid, Skeleton, Stack, Text, useBoolean, useBreakpointValue } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { LISTINGS_DESC, LISTINGS_TITLE } from '@/pages/explore/store/constants';
import * as gaEvents from '@/events';
import InfiniteScroll from 'react-infinite-scroll-component';

const ActiveListings = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const amountOfListings = useBreakpointValue({ base: 4, lg: 5 });
  const dispatch = useDispatch<Dispatch>();
  const latestSecondaryListings = useSelector(store.select.exploreModel.selectLatestSecondaryListings);
  const isLoading = useSelector(store.select.exploreModel.selectIsLoading);
  const scrollDataMax = useSelector(store.select.exploreModel.selectScrollDataMax);
  return (
    <Box data-testid="explore-listings" px={{ base: 8, lg: 10 }} py={{ base: 6, lg: 10 }} mx={'auto'} maxW="7xl">
      <Heading color={'gray.600'} fontSize={{ base: 'lg', lg: 'xl' }} fontFamily="'Space Mono', monospace">
        {LISTINGS_TITLE}
      </Heading>
      <Text fontFamily="'Space Mono', monospace" mt={2} color={'gray.600'} fontSize="xs">
        {LISTINGS_DESC}
      </Text>
      {latestSecondaryListings && !isLoading ? (
        <>
          <InfiniteScroll
            dataLength={scrollDataMax}
            next={() => dispatch.exploreModel.setScrollDataMax(scrollDataMax)}
            hasMore={scrollDataMax < latestSecondaryListings?.flat()?.length}
            loader={<h4></h4>}
          >
            <SimpleGrid data-testid="explore-listings-container" justifyItems={{ base: 'start', lg: 'center' }} gap={4} my={8} columns={{ base: 2, lg: 4 }}>
              {latestSecondaryListings
                .flat()
                .slice(0, scrollDataMax)
                .map((listing, index) => {
                  return (
                    <Box key={listing.name + listing.tokenId} border="1px" borderColor="black" p={4} rounded="lg" w="full">
                      <Box pos={'relative'}>
                        <Skeleton isLoaded={hasImageLoaded}>
                          <Image
                            onLoad={setHasImageLoaded.on}
                            data-testid={`explore-listing-image-${index}`}
                            border="1px"
                            borderColor="black"
                            rounded="lg"
                            src={listing.image}
                          />
                        </Skeleton>
                        {listing.market === 'opensea' && (
                          <Flex justifyContent={'space-between'} zIndex={'50'} top="2" right="2" position={'absolute'}>
                            <IconButton
                              shadow="md"
                              size="sm"
                              colorScheme={'twitter'}
                              borderRadius="full"
                              aria-label="opensea"
                              icon={<i style={{ color: 'white', fontSize: '1.1rem' }} className="fak fa-opensea" />}
                            />
                          </Flex>
                        )}
                      </Box>
                      <Stack mt={6}>
                        <Text lineHeight={'4'} fontFamily={"'Space Mono', monospace"} fontSize="xs" color="gray.600">
                          {listing.name}
                        </Text>
                        <Text lineHeight={'4'} fontFamily={"'Space Mono', monospace"} fontSize="sm" color="gray.800" fontWeight={'semibold'}>
                          #{listing.tokenId}
                        </Text>
                        <Flex justifyContent={'space-between'}>
                          <Text letterSpacing={'tight'} fontFamily={"'Space Mono', monospace"} fontSize="lg" color="gray.600">
                            {listing.price} Ξ
                          </Text>
                          <Button
                            onClick={() => gaEvents.clickLinkToSecondaryListing()}
                            as={Link}
                            href={listing.link}
                            target="_blank"
                            px={2}
                            variant={'explore'}
                            size="xs"
                          >
                            <Icon color="gray.600" h="4" w="4" as={IconArrowRight}></Icon>
                          </Button>
                        </Flex>
                        <Text display={{ base: 'none', lg: 'flex' }} fontFamily={"'Space Mono', monospace"} fontSize="2xs" color="gray.600">
                          <FetchEns address={listing.seller} />
                        </Text>
                      </Stack>
                    </Box>
                  );
                })}
            </SimpleGrid>
          </InfiniteScroll>
        </>
      ) : (
        <SimpleGrid data-testid="explore-listings-container" justifyItems={{ base: 'start', lg: 'center' }} gap={4} my={8} columns={{ base: 2, lg: 4 }}>
          {[1, 2, 3, 4].map((index) => {
            return (
              <Box key={`explore-asset-skeleton-${index}`} border="1px" borderColor="black" p={4} rounded="lg" w="full">
                <Box pos={'relative'}>
                  <Skeleton
                    minH={{ base: '7rem', sm: '8rem', md: '10rem', lg: '12rem', xl: '16rem' }}
                    minW={{ base: '7rem', sm: '8rem', md: '10rem', lg: '12rem', xl: '16rem' }}
                    rounded="lg"
                    isLoaded={hasImageLoaded}
                  />
                  <Flex justifyContent={'space-between'} zIndex={'50'} top="2" right="2" position={'absolute'}>
                    <IconButton
                      shadow="md"
                      size="sm"
                      colorScheme={'twitter'}
                      borderRadius="full"
                      aria-label="opensea"
                      icon={<i style={{ color: 'white', fontSize: '1.1rem' }} className="fak fa-opensea" />}
                    />
                  </Flex>
                </Box>
                <Stack mt={6}>
                  <Text lineHeight={'4'} fontFamily={"'Space Mono', monospace"} fontSize="xs" color="gray.600">
                    hedsTAPE 0
                  </Text>
                  <Text lineHeight={'4'} fontFamily={"'Space Mono', monospace"} fontSize="sm" color="gray.800" fontWeight={'semibold'}>
                    #0
                  </Text>
                  <Flex justifyContent={'space-between'}>
                    <Text letterSpacing={'tight'} fontFamily={"'Space Mono', monospace"} fontSize="lg" color="gray.600">
                      0 Ξ
                    </Text>
                    <Button isDisabled px={2} variant={'explore'} size="xs">
                      <Icon color="gray.600" h="4" w="4" as={IconArrowRight}></Icon>
                    </Button>
                  </Flex>
                  <Text display={{ base: 'none', lg: 'flex' }} fontFamily={"'Space Mono', monospace"} fontSize="2xs" color="gray.600">
                    0x0000
                  </Text>
                </Stack>
              </Box>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ActiveListings;
