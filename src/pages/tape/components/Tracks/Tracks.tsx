import { useSelector } from 'react-redux';
import { Box, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';
import { store } from '@/store';

export const Tracks = () => {
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  return (
    <Flex gap={3} flexWrap="wrap" mx={{ base: 2, lg: 8 }} px={['20px', '60px', '100px', '120px']} pt={8}>
      {tracks.map((song) => (
        <Box key={song.id} border="1px" borderColor="#745CBA" bgColor="#4F4F4F" borderRadius="md" p={2} w={{ sm: '100%', md: '32%', lg: '19%' }}>
          <HStack>
            <Image src={song.cover} alt="song-over" boxSize="4rem" border="1px" borderColor="#DC89FF" />
            <Stack>
              <Text color="white" fontSize="xs" fontWeight={500} letterSpacing="wider">
                {song.track_name}
              </Text>
              <Text color="white" fontSize="xs" fontWeight={200} letterSpacing="wider">
                {song.artist_display_name}
              </Text>
            </Stack>
          </HStack>
        </Box>
      ))}
    </Flex>
  );
};
