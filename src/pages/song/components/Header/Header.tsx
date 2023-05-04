import { AspectRatio, Avatar, Box, Button, Divider, Flex, GridItem, Image, SimpleGrid, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

export const Header = ({ handlePlayPause }: { handlePlayPause: () => void }) => {
  const [hasLargeCoverLoaded, setHasLargeCoverLoaded] = useBoolean();
  const [hasSmallCoverLoaded, setHasSmallCoverLoaded] = useBoolean();
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const isPlaying = useSelector(store.select.songModel.selectIsPlaying);
  const cover = useSelector(store.select.songModel.selectSongCover);
  const subCover = useSelector(store.select.songModel.selectSongSubmissionCover);
  const songArtists = useSelector(store.select.songModel.selectSongArtists);
  const songName = useSelector(store.select.songModel.selectSongTrackName);

  return (
    <Box pos="relative">
      <Box display={{ base: 'block', lg: 'none' }}>
        <Skeleton isLoaded={hasLargeCoverLoaded}>
          <Image onLoad={setHasLargeCoverLoaded.on} opacity={{ base: '10%', xl: '30%' }} borderRadius="0" src={cover} w="100%" h="100%" />
        </Skeleton>
        <Box position={'absolute'} top={4} right={4}>
          <Skeleton isLoaded={hasSmallCoverLoaded} w="16" h="16">
            <Avatar onLoad={setHasSmallCoverLoaded.on} size="lg" shadow="md" borderRadius="0" src={subCover} />
          </Skeleton>
        </Box>
      </Box>
      <SimpleGrid columns={{ base: 1, lg: 10 }}>
        <GridItem
          w="full"
          as={Flex}
          gap={7}
          alignItems={'center'}
          colSpan={7}
          direction={{ base: 'row', lg: 'row' }}
          position={{ base: 'absolute', lg: 'static' }}
          bottom={{ base: 32, lg: 'auto' }}
          left={{ base: 0, lg: 'auto' }}
          zIndex={1}
        >
          <Button onClick={handlePlayPause} bg="heds.bg5" py={'8'} px={'6'} minW="16" maxW="16" mb={{ base: 4, lg: 0 }} ml={{ base: 6, lg: 32 }}>
            <Text fontSize={'3xl'} color="white" as="i" className={isPlaying ? 'fas fa-pause' : 'fas fa-play'} />
          </Button>
          <Stack mt={{ base: -4, lg: 2 }} alignItems={'start'} justifyContent={'center'}>
            <Stack alignItems={'end'}>
              <Flex alignItems={'baseline'} gap={1.5}>
                <Text fontFamily={'inter'} fontSize={{ base: 'xs', lg: 'sm' }} color="white" fontWeight={'medium'} letterSpacing={'wide'}>
                  ARTIST
                </Text>
                <Text fontFamily={'inter'} fontSize={{ base: 'xs', lg: 'sm' }} color="heds.200" fontWeight={'medium'} letterSpacing={'wide'}>
                  {songArtists?.map((name: string) => name).join(', ')}
                </Text>
              </Flex>
              <Divider border="1px" my={'0.5 !important'} color="heds.bg5" />
            </Stack>
            <Text fontFamily={'inter'} fontWeight={'bold'} letterSpacing={'wide'} mt={'-1 !important'} fontSize={{ base: 'lg', lg: '3xl' }} color="heds.100">
              {songName}
            </Text>
          </Stack>
          <Button mr={3} bg="transparent" _hover={{ bg: 'transparent' }} ml="auto" mb={{ base: 4, lg: 0 }}>
            <Text fontSize={{ base: '2xl', lg: '3xl' }} color="heds.bg5" as="i" className="fas fa-heart" />
          </Button>
        </GridItem>
        <GridItem colSpan={3} display={{ base: 'none', lg: 'block' }}>
          <AspectRatio ratio={1}>
            <Box>
              <Skeleton isLoaded={hasLargeCoverLoaded}>
                <Image onLoad={setHasLargeCoverLoaded.on} opacity={{ base: '35%', xl: '30%' }} rounded="none" src={cover} />
              </Skeleton>
            </Box>
          </AspectRatio>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
