import { Dispatch, store } from '@/store';
import { Switch as ChakraSwitch } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const Switch = () => {
  const dispatch = useDispatch<Dispatch>();
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  const isClosingPlayer = useSelector(store.select.audioModel.selectIsClosingPlayer);
  return (
    <ChakraSwitch
      disabled={isClosingPlayer}
      colorScheme={'twitter'}
      isChecked={isShowingPlayer && !isClosingPlayer}
      onChange={() => (isShowingPlayer ? dispatch.audioModel.updateIsClosingPlayer() : dispatch.audioModel.setIsShowingPlayer(!isShowingPlayer))}
    />
  );
};

export default Switch;
