import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Box, Center, Divider, Flex, Heading, Image, Skeleton, Text, useBoolean } from '@chakra-ui/react';
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';

// Models
export const VoteAudioTrack = () => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);

  return (
    <Box mx="auto">
      <Heading
        px={{ base: 0, lg: 2 }}
        className="animate__animated animate__fadeIn"
        fontWeight={'semibold'}
        letterSpacing={'widest'}
        size={['xs', 'sm']}
        color={'gray.900'}
      >
        NOW PLAYING
      </Heading>
      <Divider my={3} borderColor="transparent" w="full" />
      <Flex
        p={4}
        rounded="sm"
        border={'1px'}
        borderColor={'purple.800'}
        _hover={{ borderColor: 'gray.400', bg: 'gray.50' }}
        className="group"
        borderRadius="lg"
      >
        <Box>
          <Skeleton mb={2} isLoaded={isImageLoaded} minW="60px" minH="60px" maxW='60px'>
            <Center role="button" className="pointer-events-auto">
              <Image
                height="60px"
                width="60px"
                border='1px'
                onLoad={setIsImageLoaded.on}
                _hover={{ opacity: 0 }}
                className="pointer-events-auto group-hover:opacity-20 ease-in-out transition-all"
                src={currentTrack?.image}
                objectFit="cover"
                rounded="md"
              />
            </Center>
          </Skeleton>
          <Flex direction={'column'} justifyContent={'space-evenly'}>
            <Text className="font-serif" fontSize="xs" color="blue.900">
              {currentTrack.name}
            </Text>
          </Flex>
        </Box>
        <WaveformPlayer audio={currentTrack?.media} />
      </Flex>
    </Box>
  );
};
