import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
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

// Utils
import { DateTime } from 'luxon';
import axios from 'axios';

export const Download = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);
  const timeline = useSelector(store.select.tapeModel.selectTimeline);
  const currentCycle = useSelector(store.select.tapeModel.selectCurrentCycle);
  const sample = useSelector(store.select.tapeModel.selectCurrentTapeSample);

  useEffect(() => {
    if (currentCycle !== 'submit') setIsChecked(true);
  }, [currentCycle]);

  useEffect(() => {
    onOpen();
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(sample.audio, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const audioType = response.data.type.split('/')[1];
      link.href = url;
      link.setAttribute('download', `${sample.track_name}.${audioType}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    } catch (error) {
      console.error('Error occurred while downloading the audio file:', error);
      setIsDownloading(false);
    }
  };

  const formatTime = (time: number) => {
    if (time !== 0) {
      const dateObj = DateTime.fromMillis(time);
      const date = dateObj.toLocaleString({
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      return date;
    }
  };

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
          {currentCycle === 'submit' ? (
            <>
              <Box {...styles.$downloadBoxStyles}>
                <Text {...styles.$submissionTextStyles}>SUBMISSIONS CLOSE IN</Text>
                <Countdown epochTime={1689793200000} />
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
            </>
          ) : (
            <Flex justifyContent="center" gap={3} pt={6}>
              <Text {...styles.$submissionTextStyles}>SUBMISSIONS CLOSE </Text>
              <Text {...styles.$cycleTimeTextStyles}>{formatTime(timeline?.submit?.end)}</Text>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<i className="fa-solid fa-arrow-down-to-line" />}
            {...styles.$downloadButtonStyles}
            isDisabled={!isChecked}
            isLoading={isDownloading}
            onClick={handleDownload}
          >
            DOWNLOAD
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
