import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useAudio } from '@/hooks/useAudio/useAudio';
import * as styles from '@pages/vote/components/TapeInfo/styles';
import { Dispatch, store } from '@/store';
import { Link } from 'react-router-dom';

export const TapeInfo = () => {
  const dispatch = useDispatch<Dispatch>();
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  const sample = useSelector(store.select.tapeModel.selectCurrentTapeSample);
  const { handlePlayPause } = useAudio();

  return (
    <Flex direction={['column', 'row']} justifyContent="space-around" p={{ base: 12, lg: 16 }}>
      <Flex direction={['column', 'row']} w={['100', '70%']} gap={[6, 2]}>
        <Stack w={['100%', '35%']}>
          <Text fontSize={['3xl', '5xl']} letterSpacing={['wide', 'wider']} fontFamily="space" color="#9293FF">
            {tape.name}
          </Text>
          {tape.sampleArtists.map((artist) => (
            <Stack key={artist.id} {...styles.$artistStackStyles}>
              <Avatar as={Link} to={`/u/${artist.wallet}`} src={artist.profile_picture} name={artist.display_name} />
              <Text {...styles.$artistNameTextStyles}>{artist.display_name}</Text>
            </Stack>
          ))}
        </Stack>
        <Stack w={['100%', '45%']}>
          <Text mt={[0, '16px']} mb={['4px', 0]} color="white" fontFamily="inter" fontWeight="600" fontSize="lg">
            About The Tape
          </Text>
          <Text color="white" fontFamily="inter" fontWeight="300" fontSize="sm">
            {tape.description}
          </Text>
        </Stack>
      </Flex>
      <Flex w={['100%', '20%']} mt={{ base: 6 }}>
        <Stack>
          <Box
            border="1px"
            bgColor="#4F4F4F"
            color="#745CBA"
            p={[2, 4]}
            borderRadius="md"
            _hover={{ cursor: 'pointer' }}
            onClick={() => {
              handlePlayPause(sample);
              dispatch.songModel.setSong(sample);
            }}
          >
            <Stack direction="row">
              <Stack justifyContent="center">
                <Text color="white" fontFamily="poppins" fontWeight="bold">
                  SAMPLE
                </Text>
                <Text color="white" fontSize="xs">
                  Listen to the sample provided by the curator
                </Text>
              </Stack>
              <Image src={tape.image} alt="tape-cover" boxSize="100px" borderRadius="md" />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};
