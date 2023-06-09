import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

export const Video = () => {
  const dispatch = useDispatch<Dispatch>();
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
        style={{ opacity, zIndex: 1, position: 'relative' }}
        config={{
          file: {
            attributes: {
              poster: song?.cover,
            },
          },
        }}
        onBuffer={() => dispatch.audioModel.setIsLoading(true)}
        onBufferEnd={() => dispatch.audioModel.setIsLoading(false)}
        playsinline={true}
        controls={false}
        url={song?.song_video}
        ref={videoRef}
        volume={0}
      />
    </>
  );
};
