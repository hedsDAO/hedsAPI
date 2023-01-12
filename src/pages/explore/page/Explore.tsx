import { CuratorCard } from '@/common/media';
import { TapeData, User } from '@/models/common';
import { Dispatch, store } from '@/store';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useBoolean,
  useBreakpointValue,
} from '@chakra-ui/react';
import { IconWaveSine } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const latestHedsTape = useSelector(store.select.tapesModel.selectLatestHedsTape);
  const allArtistsMapping = useSelector(store.select.artistModel.selectArtistMapping);
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  const mostFeaturedArtists = useSelector(store.select.artistModel.selectMostFeaturedArtists);
  const stats = [
    { label: 'Tapes Minted', value: '300' },
    { label: 'Holders', value: '400' },
    { label: 'Artist Payout', value: '$123,123,123' },
    { label: 'Artists', value: '59' },
  ];
  const numOfTapes = useBreakpointValue({
    base: 3,
    md: 8,
  });

  useEffect(() => {
    if (allArtists) {
      dispatch.artistModel.getMostFeaturedArtists([allArtists, 4]);
    }
  }, [allArtists]);
  return (
    <Box minH="100vh">
      <Box bg="purple.800" py={{ base: 20, lg: 12 }}>
        <HStack justifyContent={'space-between'} alignItems={'center'} gap={2} mx="auto" px={{ base: 10, lg: 14 }} maxW="5xl">
          <Box display={{ base: 'none', lg: 'flex' }}>
            <Text fontWeight={'semibold'} letterSpacing={'widest'} fontSize="2xl" color="white">
              LATEST TAPE
            </Text>
          </Box>
          <Flex justifyContent={'center'} gap={{ base: 7, lg: 12 }}>
            <Skeleton shadow="sm" minW={{ base: '8rem', lg: '12rem' }} minH={{ base: '8rem', lg: '12rem' }} rounded="lg" isLoaded={isImageLoaded}>
              <Image
                rounded={'lg'}
                shadow="sm"
                onLoad={setIsImageLoaded.on}
                loading="eager"
                src={latestHedsTape?.image}
                maxH={{ base: '8rem', lg: '12rem' }}
                maxW={{ base: '8rem', lg: '12rem' }}
                minW={{ base: '8rem', lg: '12rem' }}
                minH={{ base: '8rem', lg: '12rem' }}
              />
            </Skeleton>
            <Stack justifyContent={'center'}>
              <Text fontSize={{ base: 'md', lg: 'xl' }} fontFamily={"'Space Mono', monospace"} textColor={'white'}>
                {latestHedsTape?.name}
              </Text>
              <HStack pb={{ base: 4, lg: 6 }}>
                <Icon h="3" w="3" color="white" as={IconWaveSine} />
                <Avatar src={allArtistsMapping?.[latestHedsTape?.curator]?.profilePicture} size={{ base: '2xs', lg: 'xs' }} />
                <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'white'}>
                  {allArtistsMapping?.[latestHedsTape?.curator]?.displayName}
                </Text>
              </HStack>
              <Button variant={'outline'} rounded="sm" size={{ base: 'xs', lg: 'sm' }}>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'light'} textColor={'white'}>
                  View Tape
                </Text>
              </Button>
            </Stack>
          </Flex>
        </HStack>
      </Box>
      <Box bg="" py={{ base: '4', md: '8' }}>
        <Container maxW="4xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: '5', md: '6' }}>
            {stats.map(({ label, value }) => (
              <Box px={{ base: '3', md: '5' }} py={{ base: '3', md: '3' }} bg="purple.700" borderRadius="lg" boxShadow={'sm'} key={label}>
                <Stack>
                  <Text fontSize={{ base: 'xs', lg: 'sm' }} color="white">
                    {label}
                  </Text>
                  <Heading color="white" fontSize={{ base: 'sm', md: 'md', xl: 'lg' }}>
                    {value}
                  </Heading>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box bg="purple.800" px={{ base: 10, lg: 14 }} py={{ base: 10, lg: 16 }}>
        <Container maxW="6xl">
          <Text textAlign={'center'} mb={14} fontWeight={'semibold'} letterSpacing={'widest'} fontSize="xl" color="white">
            FEATURED ARTISTS
          </Text>
          <Stack maxW="5xl" mx="auto" mb={6} gap={{ base: '5', md: '6' }}>
            {mostFeaturedArtists?.length &&
              mostFeaturedArtists.map((artist: User, index: number) => {
                return (
                  <HStack justifyContent={'space-between'} gap={2} key={artist.wallet}>
                    <Flex gap={3} alignItems={'center'}>
                      <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'white'}>
                        {index + 1}.
                      </Text>
                      <Avatar src={artist.profilePicture} size={{ base: 'xs', lg: 'sm' }} />
                      <Text fontFamily={"'Space Mono', monospace"} fontSize={{ base: 'xs', lg: 'sm' }} textColor={'white'}>
                        {artist?.displayName}
                      </Text>
                    </Flex>
                    <Box>
                      <AvatarGroup size={'sm'} max={numOfTapes}>
                        {Object.values(artist?.tracks?.['heds']?.['hedstape']).map((track) => (
                          <Avatar key={track.audio} size={'sm'} name={track.album} src={track.cover} />
                        ))}
                      </AvatarGroup>
                    </Box>
                  </HStack>
                );
              })}
          </Stack>
        </Container>
      </Box>
      <Box bg="purple.900" px={{ base: 10, lg: 14 }} py={{ base: 10, lg: 16 }}>
        <Container maxW="6xl">
          <Text textAlign={'center'} mb={14} fontWeight={'semibold'} letterSpacing={'widest'} fontSize="xl" color="white">
            RECENT LISTINGS
          </Text>
        </Container>
      </Box>
    </Box>
  );
};
