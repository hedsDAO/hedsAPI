import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Countdown } from './components/Countdown/Countdown';

// Constants
import { Dispatch, store } from '@/store';
import * as styles from '@/modals/screens/download/styles';

export const Download = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setTimeout(() => {
          dispatch.modalModel.setModal(null);
        }, 500);
      }}
      size="sm"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="white" />
        <ModalBody color="white">
          <Text {...styles.$downloadTextStyles}>CURATED BY:</Text>
          <Box {...styles.$downloadBoxStyles}>
            {sampleArtists.map((artist) => (
              <Stack key={artist.display_name} {...styles.$downloadStackStyles}>
                <Avatar src={artist.profile_picture} {...styles.$downloadAvatarStyles} />
                <Text>{artist.display_name}</Text>
              </Stack>
            ))}
          </Box>
          <Box {...styles.$downloadBoxStyles}>
            <Text {...styles.$submissionTextStyles}>SUBMISSIONS CLOSE IN</Text>
            <Countdown epochTime={1754896800000} />
            <Text fontFamily="poppins" fontWeight="700" fontSize="lg" pt={8}>
              BEFORE YOU DOWNLOAD
            </Text>
            <Text {...styles.$generalTextStyles}>All submissions must be</Text>
            <Text {...styles.$redTextStyles}> original </Text>
            <Text {...styles.$generalTextStyles}>and </Text>
            <Text {...styles.$redTextStyles}>not contain any copyrighted content. </Text>
            <Text {...styles.$generalTextStyles}>The track must be</Text>
            <Text {...styles.$redTextStyles}> 135 BPM </Text>
            <Text {...styles.$generalTextStyles}>and have a length between </Text>
            <Text {...styles.$redTextStyles}>60 to 90 seconds.</Text>
          </Box>
          <Box {...styles.$downloadBoxStyles}>
            <Checkbox {...styles.$downloadCheckboxStyles} isChecked={isChecked} onChange={() => setIsChecked(!isChecked)}>
              I UNDERSTAND AND AGREE
            </Checkbox>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button leftIcon={<i className="fa-solid fa-arrow-down-to-line" />} {...styles.$downloadButtonStyles} isDisabled={!isChecked}>
            DOWNLOAD
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
