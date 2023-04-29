import { useSelector } from 'react-redux';
import { store } from '@/store';
import { SkeletonText, Stack, Text } from '@chakra-ui/react';

export const SongDetails = () => {
  const isLoading = useSelector(store.select.globalAudioModel.selectIsLoading);
  const songName = useSelector(store.select.globalAudioModel.selectCurrentSongName);
  const songArtists = useSelector(store.select.globalAudioModel.selectCurrentSongArtists);
  return (
    <Stack>
      <Text fontSize={{ base: '2xs', lg: 'sm' }} letterSpacing={'widest'} fontFamily={'inter'} fontWeight={'medium'} color="white" mt={'0 !important'}>
        {songName}
      </Text>
      <Text fontSize={{ base: '2xs', lg: 'sm' }} fontFamily={'inter'} fontWeight={'hairline'} color="white" opacity="60%" mt={'0 !important'}>
        {songArtists?.length && songArtists?.map((artist) => artist)?.join(', ')}
      </Text>
    </Stack>
  );
};
