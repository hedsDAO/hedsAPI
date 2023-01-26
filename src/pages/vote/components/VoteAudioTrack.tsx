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
          <Skeleton isLoaded={isImageLoaded} minW="60px" minH="60px">
            <Center shadow="sm" role="button" className="pointer-events-auto">
              <Image
                height="60px"
                width="60px"
                onLoad={setIsImageLoaded.on}
                _hover={{ opacity: 0 }}
                className="pointer-events-auto group-hover:opacity-20 ease-in-out transition-all outline outline-1"
                src={currentTrack?.image}
                objectFit="cover"
                rounded="sm"
              />
              {/* <PlayIcon className="opacity-0 group-hover:opacity-100 ease-in-out transition-all absolute w-[12px] h-[12px] md:h-[15px] md:w-[15px] z-10" /> */}
            </Center>
          </Skeleton>
          <Flex direction={'column'} justifyContent={'space-evenly'} ml={'12px'}>
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
