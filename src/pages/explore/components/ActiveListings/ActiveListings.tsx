import { useDispatch, useSelector } from 'react-redux';
import { FetchEns } from '@/hooks';
import { Dispatch, store } from '@/store';
import { Box, Button, Flex, Heading, Icon, IconButton, Image, Link, SimpleGrid, Spinner, Stack, Text } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { LISTINGS_BUTTON, LISTINGS_DESC, LISTINGS_TITLE } from '@/pages/explore/store/constants';

const ActiveListings = () => {
  const dispatch = useDispatch<Dispatch>();
  const latestSecondaryListings = useSelector(store.select.exploreModel.selectLatestSecondaryListings);
  const hasFetchedAllListings = useSelector(store.select.exploreModel.selectHasFetchedAllListings);
  const isLoading = useSelector(store.select.exploreModel.selectIsLoading);
  return (
    <Box px={{ base: 5, lg: 10 }} pt={10} pb={10} mx={{ lg: 'auto' }} maxW="7xl">
      <Heading color={'gray.600'} fontSize={{ base: 'lg', lg: 'xl' }} fontFamily="'Space Mono', monospace">
        {LISTINGS_TITLE}
      </Heading>
      <Text fontFamily="'Space Mono', monospace" mt={2} color={'gray.600'} fontSize="xs">
        {LISTINGS_DESC}
      </Text>
      {latestSecondaryListings && !isLoading ? (
        <>
          <SimpleGrid justifyItems={{ base: 'start', lg: 'center' }} gap={4} mt={4} columns={{ base: 2, xl: 5 }}>
            {latestSecondaryListings.flat().map((listing) => {
              return (
                <Box key={listing.name + listing.tokenId} border="1px" borderColor="black" p={4} rounded="lg" w="full">
                  <Box pos={'relative'}>
                    <Image border="1px" borderColor="black" rounded="lg" src={listing.image} />
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
                      <Button as={Link} href={listing.link} target="_blank" px={2} variant={'explore'} size="xs">
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
          {!hasFetchedAllListings ? (
            <Flex mt={{ base: 4, lg: 2 }} w="full" justifyContent={'end'}>
              <Flex alignItems="center" gap={2}>
                <Text
                  className="hover-underline-animation"
                  fontSize="xs"
                  textColor={'gray.600'}
                  onClick={() => dispatch.exploreModel.getLatestSecondaryListings(true)}
                  role="button"
                >
                  {LISTINGS_BUTTON}
                </Text>
                <Icon color={'gray.600'} h="3" w="3" as={IconArrowRight} />
              </Flex>
            </Flex>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Stack w="full" justifyContent={'center'} alignItems="center" minH="20rem">
          <Spinner size={'md'} />
        </Stack>
      )}
    </Box>
  );
};

export default ActiveListings;
