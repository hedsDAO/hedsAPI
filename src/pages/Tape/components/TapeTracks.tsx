import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react';
import { mockTapeTracks, mockTapeArtists } from '../models/constant';
import { Song } from '@/common/song/Song';

const TapeTracks = () => {
  return (
    <Stack>
      {mockTapeTracks.map((track, index) => {
        return <Song key={track.audio} index={index + 1} song={track} artist={mockTapeArtists[index]} />;
      })}
    </Stack>
  );
};

export default TapeTracks;
