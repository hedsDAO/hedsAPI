import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Flex, Text } from '@chakra-ui/react';

export const PlayerButtons = ({ handlePlayPause }: { handlePlayPause: () => void }) => {
  const isPlaying = useSelector(store.select.globalAudioModel.selectIsPlaying);
  return (
    <Flex gap={3} alignItems={'center'}>
      <Text color="white" as={'i'} className="fa-solid fa-backward"></Text>
      <Text
        w="16px"
        onClick={handlePlayPause}
        role="button"
        pointerEvents={'auto'}
        color="white"
        fontSize="2xl"
        as={'i'}
        className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'}
      />
      <Text color="white" as={'i'} className="fa-solid fa-forward"></Text>
    </Flex>
  );
};
