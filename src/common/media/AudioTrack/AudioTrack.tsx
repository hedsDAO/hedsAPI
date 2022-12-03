import { TrackMetadata } from '@/models/common';
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { Center, Flex, IconButton, Image, Skeleton, Text } from '@chakra-ui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AudioTrack = ({ track }: { track: TrackMetadata }) => {
  const connectedWallet = useSelector(store?.select.userModel.selectConnectedUserWallet);
  const hasConnectedUserLikedTrack = connectedWallet ? useSelector(store?.select?.userModel?.selectHasConnectedUserLikedTrack(track)) : false;
  const dispatch = useDispatch<Dispatch>();

  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };
  const likeTrack = () => {
    const updatedStats = {
      likes: track?.stats?.likes ? track?.stats?.likes + 1 : 1,
      likedBy: isEmpty(track?.stats?.likedBy) ? { [connectedWallet]: true } : { ...track?.stats?.likedBy, [connectedWallet]: true },
      plays: track?.stats?.plays || track?.stats?.likes || 1,
    };
    dispatch.audioModel.updateTrackMetadataStats({
      track: track,
      walletId: track.wallet,
      newStats: updatedStats,
    });
  };

  const unlikeTrack = () => {
    const updatedLikedBy = { ...track?.stats?.likedBy };
    delete updatedLikedBy[connectedWallet];
    console.log(updatedLikedBy)
    const updatedStats = {
      likes: track?.stats?.likes ? track?.stats?.likes - 1 : 0,
      likedBy: updatedLikedBy || {},
      plays: track?.stats?.plays || track?.stats?.likes || 1,
    };
    dispatch.audioModel.updateTrackMetadataStats({
      track: track,
      walletId: track.wallet,
      newStats: updatedStats,
    });
  };

  return (
    <div className="flex justify-between items-center gap-x-2 w-full hover:bg-gray-50 border border-neutral-300 px-2 py-2 rounded-md group">
      <Flex h="full" alignItems={'center'} justifyContent={'start'}>
        <Center role="button" onClick={() => handlePlay(track)} className="pointer-events-auto" w={{ base: '70px', md: '80px' }}>
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
          <Text as={Link} to={`${track.space + track.tape + track.id}`} whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={{ base: 'xs', md: 'sm' }} fontWeight={'semibold'}>
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
          disabled={!connectedWallet}
          size="xs"
          variant={hasConnectedUserLikedTrack ? 'solid' : 'outline'}
          aria-label="play"
          colorScheme={hasConnectedUserLikedTrack ? 'red' : 'gray'}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={hasConnectedUserLikedTrack ? () => unlikeTrack() : () => likeTrack()}
          className="flex-shrink-0"
        />
        {/* <span className="mx-1 sm:mx-2 whitespace-nowrap text-sm">{formatTime(track.duration)}</span> */}
      </Flex>
    </div>
  );
};
export default AudioTrack;
