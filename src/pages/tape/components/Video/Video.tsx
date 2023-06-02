import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { AspectRatio, useBreakpointValue } from '@chakra-ui/react';

interface OwnProps {
  url: string;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const Video = ({ url, isPlaying, setIsPlaying }: OwnProps) => {
  const videoRef = useRef(null);
  const opacity = useBreakpointValue({ base: 0.1, lg: 0.8 });
  return (
    <AspectRatio maxW="450px" ratio={1}>
      <ReactPlayer
        playing={isPlaying}
        width="100%"
        height="100%"
        style={{ opacity }}
        controls
        ref={videoRef}
        url={url}
        volume={0}
        onEnded={() => setIsPlaying(false)}
      />
    </AspectRatio>
  );
};
