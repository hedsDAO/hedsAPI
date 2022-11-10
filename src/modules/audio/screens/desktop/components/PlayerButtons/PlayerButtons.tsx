import { Dispatch, RootState } from '@/store';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';

const PlayerButtons = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  const userData = useSelector((state: RootState) => state.userModel);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (audioData.isPlaying === true) {
      interval = setInterval(() => {
        if (audioData.timerSeconds === audioData.countPlayThreshold) {
          dispatch.audioModel.updateTrackMetadataStats({track: audioData.activeTrack, walletId: audioData.activeTrack.wallet, newStats: {...audioData.activeTrack.stats, plays: audioData.activeTrack.stats ? audioData.activeTrack.stats.plays++ : 1}})
          setTimeout(() => dispatch.audioModel.updaterUserListeningHistory({track: audioData.activeTrack, walletId: userData?.wallet}),500)
        }
        dispatch.audioModel.setTimerSeconds(++audioData.timerSeconds);
      }, 1000);
    }
    return () => {
      return clearInterval(interval);
    };
  }, [audioData.isPlaying]);


  const resetTrack = () => {
    dispatch.audioModel.setIsPlaying(false);
    wavesurfer?.current?.stop();
    wavesurfer?.current?.play(0);
    wavesurfer?.current?.playPause();
  }
  
  return (
    <Flex height="100%" gap={2} justifyContent="center" alignItems={'center'}>
      <IconButton _hover={{ bg: 'gray.200' }} onClick={() => { resetTrack()}} aria-label="previous track" icon={<i className="fa-solid fa-backward-step"></i>} />
      {audioData?.isLoading ? (
        <IconButton _hover={{ bg: 'gray.200' }} aria-label="loading" isLoading={true} />
      ) : audioData?.isPlaying && wavesurfer?.current?.isPlaying() ? (
        <IconButton
          _hover={{ bg: 'gray.200' }}
          onClick={() => {
            dispatch.audioModel.setIsPlaying(false);
            wavesurfer?.current?.playPause();
          }}
          aria-label="pause"
          icon={<i className="fa-solid fa-pause"></i>}
        />
      ) : (
        <IconButton
          _hover={{ bg: 'gray.200' }}
          onClick={() => {
            dispatch.audioModel.setIsPlaying(true);
            wavesurfer?.current?.playPause();
          }}
          aria-label="play"
          icon={<i className="fa-solid fa-play"></i>}
        />
      )}
      <IconButton 
        _hover={{ bg: 'gray.200' }}
        onClick={() => {
        dispatch.audioModel.setIsPlaying(false);
        wavesurfer?.current?.playPause();

        audioData.queue.length ?
        dispatch.audioModel.skipToNextTrack() :
        resetTrack();
        }}
        aria-label="next track" icon={<i className="fa-solid fa-forward-step"></i>} />
    </Flex>
  );
};

export default PlayerButtons;
