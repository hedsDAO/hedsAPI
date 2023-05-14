import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Box, Button, Checkbox, Stack, Text, Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { store } from '@/store';
import { Countdown } from './Countdown';

export const Download = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);
  return (
    <Modal isOpen={true} onClose={() => console.log('closed')} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody color="white">
          <Text color="#AC8FFF" fontFamily={'inter'} fontSize="xl" fontWeight="700">
            CURATED BY:
          </Text>
          <Box textAlign="center" pt={6}>
            {sampleArtists.map((artist) => (
              <Stack direction="row" key={artist.display_name} alignItems="center" justifyContent="center">
                <Avatar src={artist.profile_picture} size="lg" border="1px" borderColor="#AC8FFF" />
                <Text>{artist.display_name}</Text>
              </Stack>
            ))}
            <Text fontFamily="inter" fontWeight="400" color="#848484" pt={8} fontSize="sm">
              SUBMISSIONS CLOSE IN
            </Text>
            <Countdown epochTime={1754896800000} />
            <Text fontFamily="poppins" fontWeight="700" fontSize="lg" pt={8}>
              BEFORE YOU DOWNLOAD
            </Text>
            <Text fontFamily="inter" fontWeight="500" fontSize="sm">
              All submissions must be original and not contain any copyrighted content. The track must be 135 BPM and have a length between 60 to 90 seconds.
            </Text>
            <Checkbox pt={6} size="sm" isChecked={isChecked} onChange={() => setIsChecked(!isChecked)}>
              I UNDERSTAND AND AGREE
            </Checkbox>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button leftIcon={<i className="fa-solid fa-arrow-down-to-line" />} bgColor="#7563BE" color="white" mr={3} w="100%" isDisabled={!isChecked}>
            DOWNLOAD
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
