import { Dispatch, RootState } from '@/store';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';

const PlayerButtons = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Flex height="100%" bg="gray.200" w="full" gap={2} justifyContent="center" alignItems={'center'}>
      <IconButton onClick={() => {}} aria-label="previous track" icon={<i className="fa-sharp fa-solid fa-backward-step"></i>} />
      {audioData?.isLoading ? (
        <IconButton aria-label="loading" isLoading={true} />
      ) : audioData?.isPlaying ? (
        <IconButton
          onClick={() => {
            dispatch.audioModel.setIsPlaying(false);
            wavesurfer.current?.playPause();
          }}
          aria-label="pause"
          icon={<i className="fa-sharp fa-solid fa-pause"></i>}
        />
      ) : (
        <IconButton
          onClick={() => {
            dispatch.audioModel.setIsPlaying(true);
            wavesurfer.current?.playPause();
          }}
          aria-label="play"
          icon={<i className="fa-sharp fa-solid fa-play"></i>}
        />
      )}
      <IconButton onClick={() => {}} aria-label="next track" icon={<i className="fa-sharp fa-solid fa-forward-step"></i>} />
    </Flex>
  );
};

export default PlayerButtons;
