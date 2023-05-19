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
  const songName = useSelector(store.select.audioModel.selectTrackName);
  const artists = useSelector(store.select.audioModel.selectArtists);
  return (
    <Stack {...styles.$songDetailsStackStyles}>
      <Text {...styles.$songNameTextStyles}>{songName}</Text>
      <Text {...styles.$songArtistsTextStyles}>{artists}</Text>
    </Stack>
  );
};
