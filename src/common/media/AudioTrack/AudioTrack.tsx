import { useDispatch, useSelector } from 'react-redux';
import { TrackMetadata, TrackType } from '@/models/common';
import { Dispatch, store } from '@/store';
import { Badge, Center, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { PlayIcon } from '@heroicons/react/24/solid';
import { IconTextPlus, IconEye, IconMusic, IconEyeOff } from '@tabler/icons';
import { formatSubId, isEmpty } from '@/utils';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AudioTrack = ({ track }: { track: TrackMetadata }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const [isHeartFilled, setIsHeartFilled] = useBoolean();
  const [isConfirmingLiked, setIsConfirmingLike] = useBoolean();
  const connectedWallet = useSelector(store?.select.userModel.selectConnectedUserWallet);
  const currentWallet = useSelector(store?.select.userModel.selectCurrentUserWallet);
  const allTapes = useSelector(store?.select.tapesModel.selectAllTapes);
  const currentTape = useSelector(store?.select.tapesModel.selectCurrentTape);
  const isTapeVoteComplete = useSelector(store?.select?.tapesModel?.selectIsTapeVoteCompleteBySpaceTapeId([track?.space, track?.tape, track?.id]));
  const queue = useSelector(store?.select.audioModel.selectQueue);
  const dispatch = useDispatch<Dispatch>();
  const handlePlay = (submission: TrackMetadata) => {
    dispatch.audioModel.setIsShowingPlayer(true);
    dispatch.audioModel.setActiveTrack(submission);
  };
  const likeTrack = async () => {
    const updatedStats = {
      likes: track?.stats?.likes ? track?.stats?.likes + 1 : 1,
      likedBy: isEmpty(track?.stats?.likedBy) ? { [connectedWallet]: true } : { ...track.stats.likedBy, [connectedWallet]: true },
      plays: track?.stats?.plays || track?.stats?.likes || 1,
    };
    await dispatch.audioModel.updateTrackMetadataStats({ track: track, walletId: track.wallet, newStats: updatedStats });
    await dispatch.userModel.addUserLike([connectedWallet, currentWallet, { ...track, stats: updatedStats }]);
    if (pathname.includes('/u')) dispatch.userModel.getCurrentUserData(currentWallet);
    if (pathname.includes('/listen')) dispatch.tapesModel.getTapeArtists([allTapes[track?.tape][track?.id]]);
    await dispatch.userModel.getConnectedUserData(connectedWallet);
  };

  const unlikeTrack = async () => {
    const updatedLikedBy = { ...track?.stats?.likedBy };
    delete updatedLikedBy[connectedWallet];
    const updatedStats = {
      likes: track?.stats?.likes ? track?.stats?.likes - 1 : 0,
      likedBy: updatedLikedBy || {},
      plays: track?.stats?.plays || track?.stats?.likes || 1,
    };
    await dispatch.audioModel.updateTrackMetadataStats({ track: track, walletId: track.wallet, newStats: updatedStats });
    await dispatch.userModel.removeUserLike([connectedWallet, currentWallet, { ...track, stats: updatedStats }]);
    if (pathname.includes('/u')) dispatch.userModel.getCurrentUserData(currentWallet);
    if (pathname.includes('/listen')) dispatch.tapesModel.getTapeArtists([allTapes[track?.tape][track?.id]]);
    await dispatch.userModel.getConnectedUserData(connectedWallet);
  };

  const addToQueue = async () => {
    dispatch.audioModel.pushTrackToQueue(track);
  };

  return (
    <Flex
      p={2}
      rounded="sm"
      border={'1px'}
      borderColor={track?.public ? 'purple.800' : 'gray.300'}
      _hover={track?.public ? { borderColor: 'gray.400', bg: 'gray.50' } : {}}
      className="group"
    >
      <Skeleton opacity={track?.public ? '' : '60%'} isLoaded={isImageLoaded} minW="60px" minH="60px">
        <Center shadow="sm" role="button" onClick={() => handlePlay(track)} className="pointer-events-auto">
          <Image
            height="60px"
            width="60px"
            onLoad={setIsImageLoaded.on}
            _hover={{ opacity: 0 }}
            className="pointer-events-auto group-hover:opacity-20 ease-in-out transition-all outline outline-1"
            src={
              track.type === TrackType.SUBMISSION
                ? track.subImage
                : pathname.includes('/u')
                ? track.cover
                : track.type === TrackType.SAMPLE
                ? track.cover
                : currentTape?.tracks.filter((artist) => artist?.wallet === track?.wallet)?.[0]?.profilePicture || ''
            }
            objectFit="cover"
            rounded="sm"
          />
          <PlayIcon className="opacity-0 group-hover:opacity-100 ease-in-out transition-all absolute w-[12px] h-[12px] md:h-[15px] md:w-[15px] z-10" />
        </Center>
      </Skeleton>
      <Flex opacity={track?.public ? '' : '60%'} direction={'column'} justifyContent={'space-evenly'} ml={'12px'}>
        {track.wallet === currentWallet ? (
          <Heading fontWeight={'semibold'} fontSize="sm" color={'gray.800'}>
            <>{track.artist}</>
          </Heading>
        ) : (
          <Link className="text-base" to={`/u/${track.wallet}`}>
            <Heading mb={0.5} className="hover-underline-animation" fontWeight={'medium'} pointerEvents={'auto'} fontSize="xs" color={'gray.800'}>
              {track.artist}
            </Heading>
          </Link>
        )}
        {pathname.includes('/listen') ? (
          <Text className="font-serif" fontSize="xs" color="blue.900">
            {track.album}
          </Text>
        ) : (
          <Link className="text-xs" to={`/listen/${track.space}/${track.tape}/${track.id}`}>
            <Text className="font-serif hover-underline-animation" fontSize="xs" color="blue.900">
              {track.album}
            </Text>
          </Link>
        )}
        <Flex gap={1} alignItems={'baseline'}>
          {(track?.type === TrackType.TRACK || track?.type >= TrackType.COLLAB) && (
            <Text className="font-sans" whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'xs'}>
              {track.no}.
            </Text>
          )}
          <Text className="truncate md:max-w-[30ch] font-sans max-w-[20ch]" fontSize={'xs'}>
            {track.type === TrackType.COLLAB
              ? track.track
              : track.type === TrackType.SUBMISSION
              ? track.subId
              : track.type === TrackType.SAMPLE
              ? track.track
              : formatSubId(track.track)}
          </Text>
        </Flex>
      </Flex>
      {connectedWallet && (isTapeVoteComplete || track.type === TrackType.COLLAB) && (
        <Stack alignItems={'end'} ml="auto">
          {!isConfirmingLiked ? (
            <IconButton
              size="xs"
              aria-label="play"
              textColor={track.stats.likedBy[connectedWallet] || isHeartFilled ? 'white' : 'gray.300'}
              bg={track.stats.likedBy[connectedWallet] || isHeartFilled ? 'red.500' : 'gray.50'}
              icon={<i className="fa-solid fa-heart"></i>}
              onClick={
                track.stats.likedBy[connectedWallet]
                  ? () => setIsConfirmingLike.on()
                  : () => {
                      setIsHeartFilled.on();
                      likeTrack();
                    }
              }
              _hover={{
                bg: track.stats.likedBy[connectedWallet] || isHeartFilled ? 'gray.200' : 'gray.50',
                textColor: track.stats.likedBy[connectedWallet] || isHeartFilled ? 'white' : 'red.300',
              }}
              borderColor={track.stats.likedBy[connectedWallet] || isHeartFilled ? 'red.500' : 'gray.300'}
              className="flex-shrink-0"
              border={'1px'}
            />
          ) : (
            <Flex gap={1} alignItems={'center'}>
              <IconButton
                onClick={() => {
                  setIsHeartFilled.on();
                  setIsConfirmingLike.off();
                }}
                size="xs"
                aria-label="like"
                textColor={'white'}
                bg={'gray.200'}
                _hover={{ bg: 'gray.300' }}
                icon={<i className="fa-solid fa-rotate-left"></i>}
              />
              <IconButton
                onClick={() => {
                  unlikeTrack();
                  setIsHeartFilled.off();
                  setIsConfirmingLike.off();
                }}
                size="xs"
                aria-label="like"
                textColor={'white'}
                bg={'red.500'}
                icon={<i className="fa-solid fa-xmark"></i>}
              />
            </Flex>
          )}
        </Stack>
      )}
      {pathname !== `/listen/${track.space}/${track.tape}/${track.id}` && isTapeVoteComplete && (
        <Menu direction="rtl">
          <MenuButton
            ml={1}
            border={'1px'}
            borderColor={'gray.500'}
            bg={'gray.50'}
            _hover={{ bg: 'gray.100' }}
            size="xs"
            as={IconButton}
            aria-label="Options"
            icon={<i className="fa-solid fa-ellipsis"></i>}
            width={'20px'}
          />
          <MenuList>
            {queue?.length && queue?.includes(track) ? (
              <></>
            ) : (
              <MenuItem isDisabled fontSize={'sm'} icon={<IconTextPlus height="20px" />}>
                <Flex gap={2} alignItems={'center'}>
                  Add to Queue
                  <Badge variant={'outline'} fontSize="2xs">
                    beta
                  </Badge>
                </Flex>
              </MenuItem>
            )}
            {track?.wallet === connectedWallet && track.type === TrackType.SUBMISSION && (
              <MenuItem
                onClick={() => dispatch.userModel.updateConnectedUserSubmissionStatus([track, connectedWallet])}
                fontSize={'sm'}
                icon={track?.public ? <IconEyeOff height={'20px'} /> : <IconEye height="20px" />}
              >
                {track?.public ? 'Hide Track' : 'Make Public'}
              </MenuItem>
            )}
            <MenuItem onClick={() => navigate(`/listen/${track.space}/${track.tape}/${track.id}`)} fontSize={'sm'} icon={<IconMusic height="20px" />}>
              View Tape
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default AudioTrack;
