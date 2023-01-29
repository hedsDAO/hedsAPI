import { Dispatch, store } from '@/store';
import { Fade, Switch as ChakraSwitch } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Switch = () => {
  const dispatch = useDispatch<Dispatch>();
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  const isClosingPlayer = useSelector(store.select.audioModel.selectIsClosingPlayer);
  const audio = useSelector(store.select.audioModel.selectActiveTrackAudio);
  return (
    <Fade in={!!audio} unmountOnExit>
      <ChakraSwitch
        size="sm"
        isDisabled={isClosingPlayer || !audio}
        isChecked={isShowingPlayer && !isClosingPlayer}
        onChange={() =>
          isShowingPlayer ? dispatch.audioModel.updateIsClosingPlayer() : !!audio ? dispatch.audioModel.setIsShowingPlayer(!isShowingPlayer) : {}
        }
      />
    </Fade>
  );
};

export default Switch;
