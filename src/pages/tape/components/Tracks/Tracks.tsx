import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AspectRatio, Box, Flex, HStack, Image, Stack, Skeleton, Text } from '@chakra-ui/react';
import { store } from '@/store';
import * as styles from '@/pages/tape/components/Tracks/styles';

export const Tracks = () => {
  const navigate = useNavigate();
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const isLoading = useSelector(store.select.tapeModel.selectIsLoading);
  return (
    <>
      <Text {...styles.$tracksheadingStyles}>TRACKS</Text>
      <Flex {...styles.$tracksFlexStyles}>
        {tracks.map((song) => {
          const ipfsHash = song.audio.split('/ipfs/')[1];
          return (
            <Box key={song.id} {...styles.$trackBoxStyles} data-testid="track-box" onClick={() => navigate(`/song/${ipfsHash}`)}>
              <HStack>
                <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={!isLoading} fitContent rounded={'lg'} height="100%" width="4rem">
                  <AspectRatio ratio={1}>
                    <Image src={song.artists[0].artist_profile_picture} alt="song-cover" {...styles.$trackImageStyles} />
                  </AspectRatio>
                </Skeleton>
                <Stack>
                  <Text {...styles.$trackNameTextStyles}>{song.track_name}</Text>
                  <Text {...styles.$artistNameTextStyles}>{song.artists[0].artist_display_name}</Text>
                </Stack>
              </HStack>
            </Box>
          );
        })}
      </Flex>
    </>
  );
};
