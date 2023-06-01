import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { store } from '@/store';
import { AspectRatio, useBreakpointValue } from '@chakra-ui/react';

export const Video = () => {
  const videoRef = useRef(null);
  const opacity = useBreakpointValue({ base: 0.1, lg: 0.8 });
  const songVideo = useSelector(store.select.songModel.selectSongVideo);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const cover = useSelector(store.select.songModel.selectSongCover);
  const { isOnOwnSongPage, getProgress } = useAudio();
  return (
    <AspectRatio h="100%" w="100%" ratio={1}>
      <ReactPlayer
        playing={isPlaying && isOnOwnSongPage && getProgress() > 0.005}
        width="100%"
        height="100%"
        style={{ opacity }}
        config={{
          file: {
            attributes: {
              poster: cover,
            },
          },
        }}
        controls={false}
        ref={videoRef}
        url={songVideo}
        volume={0}
      />
    </AspectRatio>
  );
};
