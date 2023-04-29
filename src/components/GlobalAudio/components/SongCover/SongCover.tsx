import { store } from '@/store';
import { AspectRatio, Image, Skeleton, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const SongCover = () => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  const currentSong = useSelector(store.select.globalAudioModel.selectCurrentSong);

  return (
    <AspectRatio h="80px" width={'80px'} ratio={1}>
      <Skeleton startColor="heds.bg2" endColor="heds.400" isLoaded={!!currentSong && hasImageLoaded} fitContent rounded={'md'}>
        <Image onLoad={setHasImageLoaded.on} h="80px" rounded="md" objectFit={'cover'} src={currentSong?.cover} />
      </Skeleton>
    </AspectRatio>
  );
};
