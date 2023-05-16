import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Image,
  Select,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { Dispatch, store } from '@/store';

export const Mint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cover = useSelector(store.select.tapeModel.selectTapeCover);
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={true} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <Text color="#DC89FF">MINT</Text>
            <Stack direction="row" spacing={4} justifyContent="space-around">
              <Stack direction="column" spacing={3} w="40%">
                {sampleArtists.map((artist) => (
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar size="md" src={artist.profile_picture} />
                    <Text color="white" size="xs" letterSpacing="widest">
                      {artist.display_name}
                    </Text>
                  </Box>
                ))}
                <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                  <Text color="white">PRICE</Text>
                  <Text color="#DC89FF">0.005</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                  <Text color="white">MINTED</Text>
                  <Text color="#DC89FF">100</Text>
                </Box>
                <Select bgColor="#26232D" variant="filled" color="white" placeholder="Quantity">
                  <option value="option1">1</option>
                  <option value="option2">2</option>
                  <option value="option3">3</option>
                </Select>
                <Button bgColor="#745CBA" color="white">
                  Mint
                </Button>
              </Stack>
              <Center>
                <Image src={cover} alt="tape-cover" boxSize="xs" border="1px" borderColor="heds.400" borderRadius="md" />
              </Center>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
