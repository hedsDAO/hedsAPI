import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { AspectRatio, Box, Button, Divider, Flex, GridItem, Image, SimpleGrid, Skeleton, Stack, Text, Tooltip, useBoolean } from '@chakra-ui/react';
import { User } from '@/models/common';
import { ARTIST_HEADER_TEXT, PRIVATE_TRACK_LABEL } from '@pages/song/models/constants';
import * as styles from '@pages/song/components/Header/styles';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { Video } from '../Video/Video';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';

/**
 * @function Header
 * @description Renders a component displaying the song header, including the song cover, play/pause button, artist information, and like button.
 * @returns {JSX.Element} - Rendered component.
 **/

const MotionBox = motion.div;
const VideoBox = motion.div;

export const Header = () => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const { handlePlayPause, isOnOwnSongPage } = useAudio();
  const [hasLargeCoverLoaded, setHasLargeCoverLoaded] = useBoolean();
  const song = useSelector(store.select.songModel.selectSong);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const cover = useSelector(store.select.songModel.selectSongCover);
  const songArtists = useSelector(store.select.songModel.selectSongArtists);
  const songName = useSelector(store.select.songModel.selectSongTrackName);
  const songId = useSelector(store.select.songModel.selectSongId);
  const connectedUserId = useSelector(store.select.authModel.selectUserId);
  const songHash = useSelector(store.select.songModel.selectSongHash);
  const songLikes = useSelector(store.select.songModel.selectSongLikes);
  const isLoading = useSelector(store.select.songModel.selectIsLoading);
  const isSongPublic = useSelector(store.select.songModel.selectIsSongPublic);
  const songVideo = useSelector(store.select.songModel.selectSongVideo);
  const handleNavigate = (user: User) => () => navigate(`/u/${user?.wallet}`);
  const handleLikeAndUnlike = () => {
    songLikes?.map((like: any) => like.user_id).includes(connectedUserId)
      ? dispatch.songModel.handleUnlikeSong([songId, connectedUserId, songHash])
      : dispatch.songModel.handleLikeSong([songId, connectedUserId, songHash]);
  };
  const boxControls = useAnimation();
  const videoControls = useAnimation();

  useEffect(() => {
    boxControls.set({
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      zIndex: '0',
    });

    boxControls.start({
      height: isPlaying && isOnOwnSongPage && songVideo ? '85vh' : 'initial',
    });
    videoControls.start({
      height: isPlaying && isOnOwnSongPage && songVideo ? '85vh' : 'initial',
    });

    return () => {
      boxControls.stop();
      videoControls.stop();
    };
  }, [isPlaying, boxControls, videoControls, MotionBox, VideoBox, songVideo, isOnOwnSongPage]);

  return (
    <MotionBox
      animate={boxControls}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      <Box
        position="absolute"
        top={0}
        bottom={0}
        right={0}
        left={0}
        backgroundImage={`url(${cover})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        filter="blur(40px)"
        opacity={0.55}
        zIndex="-1"
      />
      <Box {...styles.$innerBoxStyles}>
        {songVideo ? (
          <VideoBox animate={videoControls} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
            <Video />
          </VideoBox>
        ) : (
          <Skeleton {...styles.$skeletonStyles(hasLargeCoverLoaded, isLoading)}>
            <AspectRatio ratio={1}>
              <Image {...styles.$imageStyles(cover, setHasLargeCoverLoaded.on)} />
            </AspectRatio>
          </Skeleton>
        )}
      </Box>
      <SimpleGrid {...styles.$simpleGridStyles}>
        <GridItem {...styles.$gridItemStyles} colSpan={isPlaying && songVideo && isOnOwnSongPage ? 6 : 7}>
          <Button {...styles.$playPauseButtonStyles(isLoading, () => handlePlayPause(song))}>
            <Text {...styles.$playButtonIconStyles(isLoading, isPlaying && isOnOwnSongPage)} />
          </Button>
          <Stack {...styles.$stackWrapperStyles}>
            <Stack {...styles.$stackStyles}>
              <Flex {...styles.$flexStyles}>
                <Text {...styles.$artistLabelTextStyles}>{ARTIST_HEADER_TEXT}</Text>
                {isSongPublic ? (
                  songArtists?.map((artist) => (
                    <Text key={songHash + artist.wallet} {...styles.$artistNameTextStyles} onClick={handleNavigate(artist)}>
                      {artist?.display_name}
                    </Text>
                  ))
                ) : (
                  <Tooltip {...styles.$privateTooltipStyles} label={PRIVATE_TRACK_LABEL} hasArrow>
                    <Box {...styles.$privateLabelStyles} />
                  </Tooltip>
                )}
              </Flex>
              <Divider {...styles.$dividerStyles} />
            </Stack>
            <Text {...styles.$songNameTextStyles}>{songName}</Text>
          </Stack>
          <Flex alignItems={'center'}>
            <Button {...styles.$likeButtonStyles(connectedUserId)} onClick={handleLikeAndUnlike}>
              <Text {...styles.$likeIconStyles(songLikes, connectedUserId)} />
            </Button>
          </Flex>
        </GridItem>
        {songVideo ? (
          <GridItem {...styles.$gridItemImageStyles}>
            <VideoBox animate={videoControls} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
              <Video />
            </VideoBox>
          </GridItem>
        ) : (
          <GridItem {...styles.$gridItemImageStyles}>
            <AspectRatio ratio={1}>
              <Box p={4}>
                <Skeleton {...styles.$skeletonStyles} isLoaded={!isLoading || hasLargeCoverLoaded}>
                  <Image onLoad={setHasLargeCoverLoaded.on} {...styles.$coverImageStyles} src={cover} />
                </Skeleton>
              </Box>
            </AspectRatio>
          </GridItem>
        )}
      </SimpleGrid>
    </MotionBox>
  );
};
