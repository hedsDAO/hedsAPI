import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Stack, Text, Tooltip } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/SongDetails/styles';
import * as constants from '@/pages/song/models/constants';

/**
 * @function SongDetails
 * @description A component that displays the song name and artists for the current song.
 * @returns {JSX.Element} - Rendered SongDetails component.
 */

export const SongDetails = () => {
  const songName = useSelector(store.select.audioModel.selectTrackName);
  const artists = useSelector(store.select.audioModel.selectArtists);
  const isSongPublic = useSelector(store.select.audioModel.selectIsSongPublic);
  return (
    <Stack {...styles.$songDetailsStackStyles}>
      <Text {...styles.$songNameTextStyles}>{songName}</Text>
      {isSongPublic ? (
        <Text {...styles.$songArtistsTextStyles}>{artists}</Text>
      ) : (
        <Tooltip label={constants.PRIVATE_TRACK_LABEL} hasArrow {...styles.$privateTooltipStyles}>
          <Box {...styles.$privateLabelStyles} />
        </Tooltip>
      )}
    </Stack>
  );
};
