import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { store } from '@/store';
import { AspectRatio, useBreakpointValue } from '@chakra-ui/react';

export const Video = () => {
  const videoRef = useRef(null);
  const opacity = useBreakpointValue({ base: 0.1, lg: 0.8 });
  const { isOnOwnSongPage } = useAudio();
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const song = useSelector(store.select.songModel.selectSong);

  return (
    <AspectRatio height="100%" w="100%" ratio={1}>
      <ReactPlayer
        key={song?.cover}
        playing={isPlaying && isOnOwnSongPage}
        width="100%"
        height="100%"
        style={{ opacity }}
        config={{
          file: {
            attributes: {
              poster: song?.cover,
            },
          },
        }}
        controls={false}
        ref={videoRef}
        url={song?.video}
        volume={0}
      />
    </AspectRatio>
  );
};
