import { useDispatch, useSelector } from 'react-redux';

// Components
import { Avatar, Button, Stack, Text } from '@chakra-ui/react';
import { Modals } from '@/modals/models/modalModel';

// Constants
import { Dispatch, store } from '@/store';
import * as styles from '@pages/tape/components/TapeDetails/styles';

export const TapeDetails = () => {
  const dispatch = useDispatch<Dispatch>();
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);

  return (
    <Stack {...styles.$mainStackStyles}>
      <Text {...styles.$tapeNameTextStyles}>{tape.name}</Text>
      {tape.sampleArtists.map((artist) => (
        <Stack key={artist.id} {...styles.$artistStackStyles}>
          <Avatar src={artist.profile_picture} name={artist.display_name} />
          <Text {...styles.$artistNameTextStyles}>{artist.display_name}</Text>
        </Stack>
      ))}
      <Button
        {...styles.$downloadButtonStyles}
        leftIcon={<i className="fa-solid fa-arrow-down-to-line" style={{ color: '#745CBA' }} />}
        onClick={() => dispatch.modalModel.setModal(Modals.DOWNLOAD)}
      >
        DOWNLOAD SAMPLE
      </Button>
      <Text {...styles.$aboutTheTapeTextStyles}>About The Tape</Text>
      <Text {...styles.$tapeDescriptionTextStyles}>{tape.description}</Text>
    </Stack>
  );
};
