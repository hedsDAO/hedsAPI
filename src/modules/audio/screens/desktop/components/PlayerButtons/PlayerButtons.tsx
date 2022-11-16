import { Dispatch, store } from '@/store';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { selectUserWallet } from '@/pages/user/store/selectors';

const PlayerButtons = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useSelector(store.select.audioModel.selectIsLoading);
  const isTrackPlaying = useSelector(store.select.audioModel.selectIsTrackPlaying);
  const isQueueEmpty = useSelector(store.select.audioModel.selectIsQueueEmpty);
  const timerSeconds = useSelector(store.select.audioModel.selectTimerSeconds);
  const countPlayThreshold = useSelector(store.select.audioModel.selectCountPlayThreshold);
  const activeTrack = useSelector(store.select.audioModel.selectActiveTrack);
  const activeTrackStats = useSelector(store.select.audioModel.selectActiveTrackStats);
  const userWallet = useSelector(store.select.userModel.selectConnectedUserWallet);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isTrackPlaying) {
      interval = setInterval(() => {
        if (timerSeconds === countPlayThreshold) {
          dispatch.audioModel.updateTrackMetadataStats({track: activeTrack, walletId: activeTrack.wallet, newStats: {...activeTrackStats, plays: activeTrackStats ? activeTrackStats.plays + 1 : 1}})
          setTimeout(() => dispatch.audioModel.updaterUserListeningHistory({track: activeTrack, walletId: userWallet}),500)
        }
        dispatch.audioModel.setTimerSeconds(timerSeconds + 1);
      }, 1000);
    }
    return () => {
      return clearInterval(interval);
    };
  }, [isTrackPlaying]);


  const resetTrack = () => {
    dispatch.audioModel.setIsPlaying(false);
    wavesurfer?.current?.stop();
    wavesurfer?.current?.play(0);
    wavesurfer?.current?.playPause();
  }
  
  return (
    <Flex height="100%" gap={2} justifyContent="center" alignItems={'center'}>
      <IconButton _hover={{ bg: 'gray.200' }} onClick={() => { resetTrack()}} aria-label="previous track" icon={<i className="fa-solid fa-backward-step"></i>} />
      {isLoading ? (
        <IconButton _hover={{ bg: 'gray.200' }} aria-label="loading" isLoading={true} />
      ) : isTrackPlaying && wavesurfer?.current?.isPlaying() ? (
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

        !isQueueEmpty ?
        dispatch.audioModel.skipToNextTrack() :
        resetTrack();
        }}
        aria-label="next track" icon={<i className="fa-solid fa-forward-step"></i>} />
    </Flex>
  );
};

export default PlayerButtons;
