import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { Avatar, Box, Button, Divider, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react';

// Constants
import { Dispatch, store } from '@/store';

export const Tape = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const currentTape = useSelector(store.select.tapeModel.selectCurrentTape);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  useEffect(() => {
    console.log('currentTape', currentTape);
  }, [currentTape]);

  return (
    <Box>
      <HStack mx={8} px="120px" spacing="80px">
        <Image src={currentTape.image} alt="tape-cover" boxSize="xl" border="1px" borderColor="#DC89FF" />
        <Stack gap={3}>
          <Text color="#D3D3FF" letterSpacing="widest" fontSize="3xl" fontWeight="bold">
            {currentTape.name}
          </Text>
          {currentTape.sampleArtists.map((artist) => (
            <Stack key={artist.id} direction="row" alignItems="center">
              <Avatar src={artist.profile_picture} name={artist.display_name} />
              <Text color="white" fontSize="sm">
                {artist.display_name}
              </Text>
            </Stack>
          ))}
          <Button
            color="white"
            width="50%"
            bgColor="black"
            border="1px"
            borderColor="#745CBA"
            fontFamily="sans-serif"
            fontWeight="light"
            leftIcon={<i className="fa-solid fa-arrow-down-to-line" style={{ color: '#745CBA' }} />}
            fontSize="xs"
          >
            DOWNLOAD SAMPLE
          </Button>
          <Text color="white" fontSize="lg" fontWeight="bold">
            About The Tape
          </Text>
          <Text color="white" fontSize="xs">
            {currentTape.description}
          </Text>
        </Stack>
        <Stack>
          <HStack>
            <Text color="#9293FF" fontFamily="sans-serif">
              Submit
            </Text>
            <i className="fa-solid fa-lock-keyhole" style={{ color: '#F02A2A' }} />
            <Text color="white" fontFamily="sans-serif" fontSize="xs">
              {currentTape?.timeline?.submit?.start}
            </Text>
          </HStack>
          <Button
            bgColor="#745CBA"
            color="white"
            fontFamily="sans-serif"
            fontWeight="light"
            leftIcon={<i className="fa-solid fa-arrow-down-to-line" />}
            fontSize="xs"
          >
            UPLOAD SUBMISSION
          </Button>
          <HStack>
            <Text color="#9293FF" fontFamily="sans-serif">
              Vote
            </Text>
            <i className="fa-solid fa-lock-keyhole-open" style={{ color: '#05FF00' }} />
            <Text color="white" fontFamily="sans-serif" fontSize="xs">
              {currentTape?.timeline?.submit?.start}
            </Text>
          </HStack>
          <Button bgColor="#745CBA" color="white" fontFamily="sans-serif" fontWeight="light" fontSize="xs">
            VOTE NOW
          </Button>
          <HStack>
            <Text color="#9293FF" fontFamily="sans-serif">
              Mint
            </Text>
            <Text color="white" fontFamily="sans-serif" fontSize="xs">
              {currentTape?.timeline?.submit?.start}
            </Text>
          </HStack>
          <Button bgColor="#745CBA" color="white" fontFamily="sans-serif" fontWeight="light" leftIcon={<i className="fa-solid fa-bell" />} fontSize="xs">
            GET NOTIFIED
          </Button>
        </Stack>
      </HStack>
      <Divider orientation="horizontal" colorScheme="#9293FF" py={8} />
      <Flex gap={3} flexWrap="wrap" mx={8} p={8}>
        {currentTape.tracks.map((song) => (
          <Box key={song.id} border="1px" borderColor="#745CBA" bgColor="#4F4F4F" borderRadius="md" p={2} w="250px">
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
    </Box>
  );
};
