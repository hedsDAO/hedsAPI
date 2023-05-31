import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Stack, Text, Tooltip } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/SongDetails/styles';
import * as constants from '@/pages/song/models/constants';
import { Link } from 'react-router-dom';

/**
 * @function SongDetails
 * @description A component that displays the song name and artists for the current song.
 * @returns {JSX.Element} - Rendered SongDetails component.
 */

export const SongDetails = () => {
  const songName = useSelector(store.select.audioModel.selectTrackName);
  const songHash = useSelector(store.select.audioModel.selectSongHash);
  const artists = useSelector(store.select.audioModel.selectArtists);
  const artistWallets = useSelector(store.select.audioModel.selectArtistWallets);
  const isSongPublic = useSelector(store.select.audioModel.selectIsSongPublic);
  return (
    <Stack {...styles.$songDetailsStackStyles}>
      <Link style={{ marginTop: '0' }} to={`/song/${songHash}`}>
        <Text title={songName} {...styles.$songNameTextStyles}>{songName}</Text>
      </Link>
      {isSongPublic ? (
        <Link style={{ marginTop: '0' }} to={`/u/${artistWallets[0]}`}>
          <Text {...styles.$songArtistsTextStyles}>{artists}</Text>
        </Link>
      ) : (
        <Tooltip label={constants.PRIVATE_TRACK_LABEL} hasArrow {...styles.$privateTooltipStyles}>
          <Box {...styles.$privateLabelStyles} />
        </Tooltip>
      )}
    </Stack>
  );
};
