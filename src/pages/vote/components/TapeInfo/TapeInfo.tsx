import { useSelector } from 'react-redux';

import { Avatar, Box, Flex, Stack, Text } from '@chakra-ui/react';
import * as styles from '@pages/vote/components/TapeInfo/styles';
import { store } from '@/store';

export const TapeInfo = () => {
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  return (
    <Flex direction="row" justifyContent="space-around" p={16}>
      <Flex w="70%" gap={2}>
        <Stack w="35%">
          <Text fontSize="5xl" letterSpacing="wider" fontFamily="monospace" color="#9293FF">
            {tape.name}
          </Text>
          {tape.sampleArtists.map((artist) => (
            <Stack key={artist.id} {...styles.$artistStackStyles}>
              <Avatar src={artist.profile_picture} name={artist.display_name} />
              <Text {...styles.$artistNameTextStyles}>{artist.display_name}</Text>
            </Stack>
          ))}
        </Stack>
        <Stack w="45%">
          <Text color="white" fontFamily="inter" fontWeight="600" fontSize="lg">
            Description
          </Text>
          <Text color="white" fontFamily="inter" fontWeight="300" fontSize="sm">
            {tape.description}
          </Text>
        </Stack>
      </Flex>
      <Flex w="20%">
        <Stack>
          <Box border="1px" bgColor="#4F4F4F" color="#745CBA" p={8} borderRadius="md">
            <Text color="white" fontFamily="poppins">
              SAMPLE
            </Text>
            <Text color="white" fontSize="xs">
              Listen to the sample provided by the artist
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};
