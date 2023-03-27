import { Box, Flex, Image, Stack, IconButton, Tooltip, useBoolean, Center, Text, VStack, Skeleton } from '@chakra-ui/react';

interface SongMetadata {
  id: number;
  track_name: string;
  tapeId: number;
  cover: string;
  audio: string;
  duration: number;
  public: boolean;
  submission_data: {
    sub_id: string;
    sub_image: string;
    proposalId: string;
  };
  cyanite_id: number;
  track_no: number;
}

const mockSong = {
  id: 2,
  tapeId: 6,
  track_name: 'discreetELEPHANT',
  cover: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F4.png?alt=media&token=f1035070-2eb5-49eb-9dc8-c1ab43506399',
  audio: 'https://www.heds.cloud/ipfs/QmR8fCCkX5vWbFQ83Rag9uUe8k8a711GpWydxUz9LH63sM',
  duration: 60,
  public: true,
  submission_data: {
    sub_id: 'discreetELEPHANT',
    sub_image: 'https://www.heds.cloud/ipfs/QmUM26n7wqEzHYHJNP1d2BYQ2ZunfQWm82uGzVzYEi8NSh',
    proposalId: 'Qma11XRvUnuXBf9krvmgKV5HqrEBvtoaSs42PitgZxMtGD',
  },
  cyanite_id: 14064120,
  track_no: 2,
};

const mockArtist = {
  profilePicture: `https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x027ab54958eb2a97e233794a85737f0389d5bd38.jpeg?alt=media&token=594507da-1cd1-44db-ae10-bb2858a9a911`,
  displayName: 'elozi',
};

export const Song = () => {
  const [isLoading, setIsLoading] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();
  const song: SongMetadata = { ...mockSong };
  return (
    <Box minW="100vw" minH="100vh">
      <Box pt={10}>
        <Flex onMouseEnter={setIsHovering.on} onMouseLeave={setIsHovering.off} p={3} alignItems={'center'} justifyContent={'space-between'}>
          <Flex justifyContent={'space-between'}>
            <VStack justifyContent={'center'} pl={2} pr={4}>
              <Skeleton h={'5'} w={'3'} isLoaded={isLoading}>
                <Text>{song.track_no}</Text>
              </Skeleton>
            </VStack>
            <SongImage song={song} isHovering={isHovering} isLoading={isLoading} setHasLoaded={setIsLoading} />
            <SongDetails song={song} isLoading={isLoading} />
          </Flex>
          <SongButtons song={song} />
        </Flex>
      </Box>
    </Box>
  );
};

const SongImage = ({
  song,
  isHovering,
  isLoading,
  setHasLoaded,
}: {
  song: SongMetadata;
  isHovering: boolean;
  isLoading: boolean;
  setHasLoaded: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}) => {
  return (
    <Center rounded="sm" bg="gray.400" shadow="sm" role="button" className="pointer-events-auto">
      <Skeleton w={{ base: '14', lg: '16' }} h={{ base: '14', lg: '16' }} isLoaded={isLoading}>
        <Image
          onLoad={setHasLoaded.on}
          opacity={isHovering ? '40%' : '100%'}
          transition={'ease-in-out'}
          transitionDuration={'0.2s'}
          shadow={'md'}
          rounded={'md'}
          src={song.cover}
          w={{ base: '14', lg: '16' }}
          h={{ base: '14', lg: '16' }}
        />
        <Box
          color={'white'}
          position={'absolute'}
          zIndex="10"
          opacity={isHovering ? '100' : '0'}
          transition={'ease-in-out'}
          transitionDuration={'0.2s'}
          w={{ base: '15px', lg: '12px' }}
          children={<i className="fa-solid fa-play"></i>}
        />
      </Skeleton>
    </Center>
  );
};

const SongDetails = ({ song, isLoading }: { song: SongMetadata; isLoading: boolean }) => {
  return (
    <Stack gap={1} justifyContent={'center'} spacing={song.public ? 0 : 1} ml={5}>
      <Skeleton h={'4'} rounded="2xl" isLoaded={isLoading}>
        <Box fontSize={{ base: 'sm', lg: 'md' }}>{song.track_name}</Box>
      </Skeleton>
      <Skeleton w="75%" h={'4'} rounded="2xl" isLoaded={isLoading}>
        {song.public ? (
          <Box fontSize={{ base: 'xs', lg: 'sm' }} fontWeight={'light'} color="blackAlpha.700">
            {mockArtist.displayName}
          </Box>
        ) : (
          <Flex textColor={'gray.300'} gap={1}>
            <Box bg="gray.300" rounded="xl" w="70%" py={{ base: 1, lg: 1.5 }} />
            <Tooltip fontSize={'xs'} label="private song" aria-label="private song">
              <i className="fa-solid fa-circle-info" />
            </Tooltip>
          </Flex>
        )}
      </Skeleton>
    </Stack>
  );
};

const SongButtons = ({ song }: { song: SongMetadata }) => {
  return (
    <Flex alignItems={'center'} gap={{ base: 0, lg: 1 }}>
      <IconButton
        fontSize={{ base: 'md', lg: 'lg' }}
        bg="transparent"
        color={'blackAlpha.400'}
        _hover={{ color: 'red.500', bg: 'transparent' }}
        aria-label="like"
      >
        <i className="fa-solid fa-heart" />
      </IconButton>
      <IconButton fontSize={{ base: 'md', lg: 'lg' }} bg="transparent" color={'gray.500'} _hover={{ color: 'black', bg: 'transparent' }} aria-label="view song">
        <i className="fa-solid fa-ellipsis"></i>
      </IconButton>
    </Flex>
  );
};
