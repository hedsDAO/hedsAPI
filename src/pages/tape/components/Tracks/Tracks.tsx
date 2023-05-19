import { useSelector } from 'react-redux';
import { Box, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';
import * as styles from '@/pages/tape/components/Tracks/styles';

export const Tracks = () => {
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  return (
    <Flex {...styles.$tracksFlexStyles}>
      {tracks.map((song) => (
        <Box key={song.id} {...styles.$trackBoxStyles} data-testid="track-box">
          <HStack>
            <Image src={song.cover} alt="song-over" {...styles.$trackImageStyles} />
            <Stack>
              <Text {...styles.$trackNameTextStyles}>{song.track_name}</Text>
              <Text {...styles.$artistNameTextStyles}>{song.artist_display_name}</Text>
            </Stack>
          </HStack>
        </Box>
      ))}
    </Flex>
  );
};
