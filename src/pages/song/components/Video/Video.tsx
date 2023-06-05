import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export const Video = () => {
  const videoRef = useRef(null);
  const opacity = useBreakpointValue({ base: 0.6, lg: 0.8 });
  const song = useSelector(store.select.songModel.selectSong);
  const progress = useSelector(store.select.audioModel.selectProgress);
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);

  useEffect(() => {
    if (videoRef?.current) {
      if (Math.abs(progress - videoRef.current.getCurrentTime()) > 0.5) {
        videoRef.current.seekTo(progress, 'seconds');
      }
    }
  }, [progress]);
  return (
    <>
      <ReactPlayer
        playing={isPlaying}
        width="100%"
        height="100%"
        style={{ opacity, zIndex: 1 }}
        config={{
          file: {
            attributes: {
              poster: song?.cover,
            },
          },
        }}
        playsinline={true}
        controls={false}
        url={song?.video}
        ref={videoRef}
        volume={0}
      />
    </>
  );
};
