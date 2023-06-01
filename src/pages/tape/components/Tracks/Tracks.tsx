import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';
import * as styles from '@/pages/tape/components/Tracks/styles';

export const Tracks = () => {
  const navigate = useNavigate();
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  return (
    <Flex {...styles.$tracksFlexStyles}>
      {tracks.map((song) => {
        const ipfsHash = song.audio.split('/ipfs/')[1];
        return (
          <Box key={song.id} {...styles.$trackBoxStyles} data-testid="track-box" onClick={() => navigate(`/song/${ipfsHash}`)}>
            <HStack>
              <Image src={song.cover} alt="song-over" {...styles.$trackImageStyles} />
              <Stack>
                <Text {...styles.$trackNameTextStyles}>{song.track_name}</Text>
                <Text {...styles.$artistNameTextStyles}>{song.artist_display_name}</Text>
              </Stack>
            </HStack>
          </Box>
        );
      })}
    </Flex>
  );
};
