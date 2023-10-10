import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { storage } from '@/App';

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
  const [externalLinkRef] = useState(useRef<HTMLAnchorElement>(null));
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);
  const sample = useSelector(store.select.tapeModel.selectCurrentTapeSample);
  const tapeBpm = useSelector(store.select.tapeModel.selectBpm);

  useEffect(() => {
    onOpen();
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (sampleArtists[0].display_name === 'kas rizvi') {
        externalLinkRef.current.href = 'https://www.dropbox.com/scl/fo/wlu1aycqnrouchwatz3vy/h?dl=0&rlkey=2ai20ltddvyc8vvzbhnrujorc';
        externalLinkRef.current.click();
        setIsDownloading(false);
        dispatch.modalModel.clearState();
        return;
      } else if (sampleArtists[0].display_name === 'ThysMusic') {
        externalLinkRef.current.href = 'https://www.dropbox.com/scl/fo/i7rz7005upzzk1qhj0ns6/h?rlkey=bhdx4ex689fu3bl4qvld2rakp&dl=0';
        externalLinkRef.current.click();
        setIsDownloading(false);
        dispatch.modalModel.clearState();
        return;
      } else if (sampleArtists[0].display_name === 'LNRZ') {
        const zip: StorageReference = ref(storage, `samples/ht15.zip`);
        await getDownloadURL(zip).then(async (url: string) => {
          fetch(url)
            .then((resp) => resp.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'ht15.zip';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              setIsDownloading(false);
            })
            .catch((err) => console.log(err));
        });
        return;
      }

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
      isCentered
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
            <>
              <Box {...styles.$downloadBoxStyles}>
                <Text fontFamily="poppins" fontWeight="700" fontSize="lg" pt={8}>
                  BEFORE YOU DOWNLOAD
                </Text>
                <Text {...styles.$generalTextStyles}>All submissions must be</Text>
                <Text {...styles.$redTextStyles}> original </Text>
                <Text {...styles.$generalTextStyles}>and </Text>
                <Text {...styles.$redTextStyles}>not contain any copyrighted content. </Text>
                <Text {...styles.$generalTextStyles}>The track {tapeBpm === 0 ? "can" : "must"} be</Text>
                <Text {...styles.$redTextStyles}> {tapeBpm === 0 ? "ANY" : tapeBpm} BPM </Text>
                <Text {...styles.$generalTextStyles}>and have a length between </Text>
                <Text {...styles.$redTextStyles}>60 to 90 seconds.</Text>
              </Box>
              <Box {...styles.$downloadBoxStyles}>
                <Checkbox {...styles.$downloadCheckboxStyles} isChecked={isChecked} onChange={() => setIsChecked(!isChecked)}>
                  I UNDERSTAND AND AGREE
                </Checkbox>
              </Box>
            </>
        </ModalBody>
        <ModalFooter>
          <a target="_blank" ref={externalLinkRef} />
          <Button
          size={'sm'}
            mt={2}
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
