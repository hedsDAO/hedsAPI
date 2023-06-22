import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { AspectRatio, Flex, Box, Divider, Image, IconButton, Skeleton, Stack } from '@chakra-ui/react';
import { TimelineButtons } from '../components/TimelineButtons/TimelineButtons';
import { TapeDetails } from '../components/TapeDetails/TapeDetails';
import { Tracks } from '../components/Tracks/Tracks';
import { Video } from '../components/Video/Video';

// Constants
import { Dispatch, store } from '@/store';

// Styles
import * as styles from '@/pages/tape/screens/styles';
import { Metatags, MetatagTypes } from '@/common/utilities/Metatags';

export const Tape = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<Dispatch>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const cover = useSelector(store.select.tapeModel.selectTapeCover);
  const isLoading = useSelector(store.select.tapeModel.selectIsLoading);
  const tapeVideo = useSelector(store.select.tapeModel.selectTapeVideo);
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  useEffect(() => {
    dispatch.tapeModel.getTape(id);
  }, [id]);

  return (
    <>
      {tape ? (
        <Metatags tape={tape} type={MetatagTypes.TAPE}>
          <Box>
            <Stack {...styles.$tapeStackStyles}>
              {isPlaying ? (
                <Skeleton width={{ sm: '100%', md: '50%', lg: '30%' }} height="100%" isLoaded={!isLoading}>
                  <Video url={tapeVideo} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                </Skeleton>
              ) : (
                <Skeleton width={{ sm: '100%', md: '50%', lg: '30%' }} height="100%" isLoaded={!isLoading}>
                  <AspectRatio maxW="450px" ratio={1}>
                    <Box>
                      <Image src={cover} alt="tape-cover" />
                      {tapeVideo && (
                        <IconButton
                          onClick={() => setIsPlaying(true)}
                          size="lg"
                          aria-label="play-button"
                          isRound
                          position="absolute"
                          bg="gray"
                          opacity="70%"
                          _hover={{ opacity: '100%' }}
                          icon={<i className="fa-solid fa-play" style={{ color: 'white' }} />}
                        />
                      )}
                    </Box>
                  </AspectRatio>
                </Skeleton>
              )}
              <TapeDetails />
              <TimelineButtons />
            </Stack>
            {tracks.length > 0 && (
              <>
                <Divider {...styles.$tapeDividerStyles} />
                <Tracks />
              </>
            )}
          </Box>
        </Metatags>
      ) : (
        <></>
      )}
    </>
  );
};
