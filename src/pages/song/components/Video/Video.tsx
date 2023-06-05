import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { store } from '@/store';
import { useBreakpointValue } from '@chakra-ui/react';

export const Video = () => {
  const opacity = useBreakpointValue({ base: 0.6, lg: 0.8 });
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const song = useSelector(store.select.songModel.selectSong);
  
  return (
    <>
      <ReactPlayer
        playing={isPlaying}
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
        url={song?.video}
        volume={0}
      />
    </>
  );
};
