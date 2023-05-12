import { Button, Center, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

export const Download = () => {
  return (
    <Modal isOpen={true} onClose={() => console.log('closed')}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#AC8FFF" fontFamily={'inter'}>
          CURATED BY:
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color="white">
          <Text>BEFORE YOU DOWNLOAD</Text>
          <Text>
            All submissions must be original and not contain any copyrighted content. The track must be 135 BPM and have a length between 60 to 90 seconds.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} w="100%">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
