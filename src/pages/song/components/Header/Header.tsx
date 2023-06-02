import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { AspectRatio, Box, Button, Divider, Flex, GridItem, Image, SimpleGrid, Skeleton, Stack, Text, Tooltip, useBoolean } from '@chakra-ui/react';
import { User } from '@/models/common';
import { ARTIST_HEADER_TEXT, PRIVATE_TRACK_LABEL } from '@pages/song/models/constants';
import * as styles from '@pages/song/components/Header/styles';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { Video } from '../Video/Video';

/**
 * @function Header
 * @description Renders a component displaying the song header, including the song cover, play/pause button, artist information, and like button.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Header = () => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const { handlePlayPause, isOnOwnSongPage } = useAudio();
  const [hasLargeCoverLoaded, setHasLargeCoverLoaded] = useBoolean();
  // const [hasSmallCoverLoaded, setHasSmallCoverLoaded] = useBoolean();
  const song = useSelector(store.select.songModel.selectSong);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const cover = useSelector(store.select.songModel.selectSongCover);
  // const subCover = useSelector(store.select.songModel.selectSongSubmissionCover);
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

  return (
    <Box {...styles.$outerBoxStyles}>
      <Box {...styles.$innerBoxStyles}>
        {songVideo ? (
          <Video />
        ) : (
          <Skeleton {...styles.$skeletonStyles(hasLargeCoverLoaded, isLoading)}>
            <AspectRatio ratio={1}>
              <Image {...styles.$imageStyles(cover, setHasLargeCoverLoaded.on)} />
            </AspectRatio>
          </Skeleton>
        )}
        {/* 
        <Box {...styles.$absoluteBoxStyles}>
          <Skeleton {...styles.$smallSkeletonStyles(hasSmallCoverLoaded)}>
            <Avatar {...styles.$avatarStyles(subCover, setHasSmallCoverLoaded.on)} />
          </Skeleton>
        </Box> */}
      </Box>
      <SimpleGrid {...styles.$simpleGridStyles}>
        <GridItem {...styles.$gridItemStyles}>
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
          <Button {...styles.$likeButtonStyles(connectedUserId)} onClick={handleLikeAndUnlike}>
            <Text {...styles.$likeIconStyles(songLikes, connectedUserId)} />
          </Button>
        </GridItem>
        <GridItem {...styles.$gridItemImageStyles}>
          {songVideo ? (
            <Video />
          ) : (
            <AspectRatio ratio={1}>
              <Box>
                <Skeleton {...styles.$skeletonStyles} isLoaded={!isLoading || hasLargeCoverLoaded}>
                  <Image onLoad={setHasLargeCoverLoaded.on} {...styles.$coverImageStyles} src={cover} />
                </Skeleton>
                {/* <Avatar {...styles.$avatarStyles(subCover, setHasSmallCoverLoaded.on)} /> */}
              </Box>
            </AspectRatio>
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};
