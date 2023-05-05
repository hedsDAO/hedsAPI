import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Stack, Text } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/SongDetails/styles';

/**
 * @function SongDetails
 * @description A component that displays the song name and artists for the current song.
 * @returns {JSX.Element} - Rendered SongDetails component.
 */

export const SongDetails = () => {
  const songName = useSelector(store.select.globalAudioModel.selectCurrentSongName);
  const song = useSelector(store.select.globalAudioModel.selectCurrentSong);
  console.log(song?.artists[0], 'artist');
  return (
    <Stack {...styles.$songDetailsStackStyles}>
      <Text {...styles.$songNameTextStyles}>{songName}</Text>
      <Text {...styles.$songArtistsTextStyles}>{song?.artists?.map((artist: any) => artist?.display_name)}</Text>
    </Stack>
  );
};
