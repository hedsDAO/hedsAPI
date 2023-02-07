import { AudioTrack } from '@/common/media';
import { store } from '@/store';
import { Button, Flex, Stack, Text, Link as ChakraLink, IconButton, useBoolean, Skeleton, Center, Image, Box } from '@chakra-ui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import * as gaEvents from '@/events';
import { useEffect } from 'react';

const Header = () => {
  const [isPlayingVideo, setIsPlayingVideo] = useBoolean();
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const { space, tape, id } = useParams();
  const isAudioPlaying = useSelector(store.select.audioModel.selectIsTrackPlaying);
  const description = useSelector(store.select.tapesModel.selectCurrentTapeDescription);
  const name = useSelector(store.select.tapesModel.selectCurrentTapeName);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const opensea = useSelector(store.select.tapesModel.selectCurrentTapeOpenseaLink);
  const etherscan = useSelector(store.select.tapesModel.selectCurrentTapeEtherscanLink);
  const cover = useSelector(store.select.tapesModel.selectCurrentTapeCover);

  useEffect(() => {
    if (isAudioPlaying) setIsPlayingVideo.off();
  }, [isAudioPlaying]);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={{ base: 'start', md: 'center', lg: 'center' }}
      maxWidth={'6xl'}
      mx={'auto'}
      flexDirection={['column', 'column', 'column', 'row']}
      gap={8}
      px={[4, 2, 3, 1]}
      py={4}
    >
      <Stack className="group ease-in-out" direction={'column'}>
        <Skeleton
          mb={2}
          display={isPlayingVideo ? 'none' : 'inherit'}
          isLoaded={hasImageLoaded}
          minH={{ md: '22rem', lg: '20rem' }}
          minW={{ md: '22rem', lg: '20rem' }}
        >
          <Center shadow="sm" className="pointer-events-auto">
            <Image
              height={{ md: '22rem', lg: '20rem' }}
              width={{ md: '22rem', lg: '20rem' }}
              onLoad={setHasImageLoaded.on}
              _hover={{ opacity: 0 }}
              className="group-hover:opacity-50 ease-in-out transition-all outline outline-1"
              src={cover}
              objectFit="cover"
              rounded="sm"
            />
            {currentTape?.video && <PlayIcon
              role="button"
              onClick={() => {
                gaEvents.clickPlayTapeVideo(name);
                return setIsPlayingVideo.toggle();
              }}
              className="pointer-events-auto absolute w-[30px] h-[30px] md:h-[25px] md:w-[25px] z-10"
            />}
          </Center>
        </Skeleton>
        <Box height={{ md: '22rem', lg: '20rem' }} width={{ md: '22rem', lg: '20rem' }} display={isPlayingVideo ? 'inherit' : 'none'}>
          <ReactPlayer
            controls
            width="full"
            height="full"
            onEnded={setIsPlayingVideo.off}
            playing={isPlayingVideo}
            url={currentTape?.video}
            // Disable right click
            onContextMenu={(e: Event) => e.preventDefault()}
            // Disable download
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          />
        </Box>
      </Stack>
      <Stack direction={'column'} width={'full'} alignItems={{ md: 'center', lg: 'start' }} justifyContent="center">
        <Text fontWeight={'semibold'} fontSize={'4xl'}>
          {name}
        </Text>
        <Flex pb={{ base: 8, lg: 3 }} gap={2}>
          <Button
            onClick={() => {
              gaEvents.clickLinkToOpensea(name);
            }}
            as={ChakraLink}
            href={opensea}
            target="_blank"
            bg={'blue.50'}
            border={'solid 1px'}
            borderColor="blue.100"
            rounded="sm"
            size={'xs'}
            leftIcon={<i className="fak fa-opensea text-xs" />}
          >
            OpenSea
          </Button>
          <Button
            onClick={() => {
              gaEvents.clickLinkToEtherscan(name);
            }}
            as={ChakraLink}
            href={etherscan}
            target="_blank"
            bg={'gray.50'}
            border={'solid 1px'}
            borderColor="gray.100"
            rounded="sm"
            size={'xs'}
            leftIcon={<i className="fak fa-etherscan text-xs" />}
          >
            Etherscan
          </Button>
        </Flex>
        {currentTape && (
          <Flex w={{ base: 'full', md: 'md', lg: 'lg' }} pb={{ md: 8, lg: 2 }} gap={1} direction={'column'}>
            <AudioTrack track={currentTape?.curator?.samples?.[space]?.[tape]?.[id]} />
          </Flex>
        )}
        <Flex px={1} mt={4} direction={'column'}>
          <Text fontWeight={'bold'} fontSize="xs">
            About The Tape
          </Text>
          <Text textAlign={'start'} fontWeight={'light'} fontSize={'xs'} maxWidth={{ md: 'sm', lg: 'md' }}>
            {description}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Header;
