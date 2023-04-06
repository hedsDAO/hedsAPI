import { Grid, GridItem, Stack, Flex, AspectRatio, Box, Text, Image, Avatar, Button, Divider } from '@chakra-ui/react';
import { mockTape } from '../models/constant';
import { PlayIcon, HeartIcon, PauseIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { User } from '@/models/common';
import { useState } from 'react';

const SongHeader = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);
  const songArtists = useSelector(store.select.songModel.selectSongArtists);
  const songName = useSelector(store.select.songModel.selectSongName);
  const songSubId = useSelector(store.select.songModel.selectSongSubId);
  const songCover = useSelector(store.select.songModel.selectSongCover);
  const songSubImage = useSelector(store.select.songModel.selectSongSubImage);
  return (
    <Grid maxW="full" templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(10, 1fr)' }} gap={6}>
      <GridItem
        direction={{ base: 'row', lg: 'column' }}
        gap={1.5}
        pl={{ xl: 20 }}
        justifyContent={{ base: 'space-between', lg: 'center' }}
        as={Stack}
        colSpan={{ base: 1, xl: 7 }}
      >
        <Stack pb={5}>
          <Flex direction="row">
            {songArtists?.map((artist: User) => (
              <Flex direction="column" gap={1} alignItems="start">
                <Flex alignItems="baseline" gap={1}>
                  <Text opacity={'70%'} fontFamily={'karla'} fontSize={'2xs'} color="white">
                    ARTIST
                  </Text>
                  <Text opacity={'70%'} mt={'-1 !important'} fontFamily={'poppins'} fontWeight="200" color="heds.400" fontSize={{ base: '2xs', xl: 'xs' }}>
                    {artist.display_name}
                  </Text>
                </Flex>
                <Divider pt={1} borderColor={'button.dark'} />
              </Flex>
            ))}
          </Flex>
        </Stack>
        <Flex justifyContent={'space-between'} alignItems={'center'} gap={4}>
          <Flex gap={4}>
            <Flex display={{ base: 'none', xl: 'flex' }} gap={3}>
              {isPlaying ? (
                <Button
                  rounded="md"
                  onClick={() => setIsPlaying(!isPlaying)}
                  color="button.light"
                  px={6}
                  py={9}
                  bg="button.dark"
                  _hover={{ bg: 'button.light', color: 'button.dark' }}
                  _focus={{ bg: 'button.light', color: 'button.dark' }}
                >
                  <PlayIcon width={32} />
                </Button>
              ) : (
                <Button
                  rounded="md"
                  onClick={() => setIsPlaying(!isPlaying)}
                  _focus={{ bg: 'button.dark', color: 'button.light' }}
                  color="button.dark"
                  px={6}
                  py={9}
                  bg="button.light"
                >
                  <PauseIcon width={32} />
                </Button>
              )}
            </Flex>
            <Flex pt={1.5} direction="column">
              <Text fontFamily={'karla'} fontSize={'md'} color="white">
                TRACK
              </Text>
              <Text mt={'-2 !important'} letterSpacing={'wide'} fontFamily={'poppins'} fontWeight="700" color="heds.200" fontSize={{ base: 'lg', xl: '3xl' }}>
                {songName || songSubId}
              </Text>
            </Flex>
          </Flex>
          {isLiked ? (
            <Button
              onClick={() => setIsLiked(!isLiked)}
              color="button.dark"
              px={6}
              py={8}
              bg="transparent"
              transitionDuration={'400ms'}
              _hover={{ bg: 'transparent' }}
            >
              <HeartIcon width="30" />
            </Button>
          ) : (
            <Button
              onClick={() => setIsLiked(!isLiked)}
              _hover={{ bg: 'transparent' }}
              transitionDuration={'400ms'}
              color="heds.400"
              px={6}
              py={8}
              bg="transparent"
            >
              <HeartIcon width="30" />
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem mt={'-1'} colSpan={{ base: 1, xl: 3 }}>
        <AspectRatio ratio={1}>
          <Box>
            <Image opacity={{ base: '15%', xl: '10%' }} filter={'blur(1px)'} rounded="none" src={mockTape.image} />
            <Avatar m="2" shadow="sm" borderRadius={'md'} src={songSubImage || songCover} size="xl" position="absolute" />
          </Box>
        </AspectRatio>
      </GridItem>
    </Grid>
  );
};

export default SongHeader;
