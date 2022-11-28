import { TrackMetadata } from '@/models/common';
import { Dispatch } from '@/store';
import { formatTime } from '@/utils';
import { Button, Center, Flex, Grid, IconButton, Image, Text } from '@chakra-ui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';

const AudioTrack = ({ track }: { track: TrackMetadata }) => {
  const dispatch = useDispatch<Dispatch>();
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };
  return (
    <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 border border-neutral-300 px-2 py-2 rounded-md">
      <Flex h="full" alignItems={'center'} justifyContent={'start'}>
        <Center role="button" onClick={() => handlePlay(track)} className="group pointer-events-auto" w={{ base: '70px', md: '80px' }}>
          <Image
            shadow="lg"
            my="auto"
            maxW={{ base: '50px', md: '60px' }}
            minH={{ base: '50px', md: '60px' }}
            maxH={{ base: '50px', md: '60px' }}
            minW={{ base: '50px', md: '60px' }}
            rounded="md"
            src={track.cover}
            objectFit="cover"
            className="group-hover:opacity-40 ease-in-out transition-all"
          />
          <PlayIcon className="opacity-0 group-hover:opacity-100 ease-in-out transition-all text-gray-800 absolute w-[15px] h-[15px] md:h-[20px] md:w-[20px] z-10" />
        </Center>
        <Flex w="full" justifySelf={'start'} className="-space-y-1" px={3} direction={'column'} gap={0.5}>
          <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{ base: 'sm', md: 'md' }} fontWeight={'bold'}>
            {track.track}
          </Text>
          <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{ base: 'xs', md: 'sm' }} fontWeight={'semibold'}>
            {track.tape}
          </Text>
          <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{ base: 'xs', md: 'xs' }} fontWeight="light">
            {track.artist}
          </Text>
        </Flex>
      </Flex>
      <Flex px={2} gap={2} alignItems={'center'}>
        <IconButton
          size="xs"
          variant="outline"
          aria-label="add to queue"
          icon={<i className="fa-solid fa-layer-plus"></i>}
          // onClick={}
          className="flex-shrink-0"
        />
        <IconButton
          size="xs"
          variant="outline"
          aria-label="play"
          icon={<i className="fa-solid fa-heart"></i>}
          // onClick={() => handlePlay(track)}
          className="flex-shrink-0"
        />
        {/* <span className="mx-1 sm:mx-2 whitespace-nowrap text-sm">{formatTime(track.duration)}</span> */}
      </Flex>
    </div>
  );
};
export default AudioTrack;
