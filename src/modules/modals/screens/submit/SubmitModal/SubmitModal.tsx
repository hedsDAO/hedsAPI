import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/modules/modals/components';
import { Dialog } from '@headlessui/react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { DateCountdown } from '@/common/tape';
import { formatTime } from '@/utils';
import { DateTime } from 'luxon';
import {
  selectCurrentTapeBpm,
  selectCurrentTapeCover,
  selectCurrentTapeCurator,
  selectCurrentTapeName,
  selectCurrentTapeTimeline,
  selectSpaceTapeId,
} from '@/pages/tapes/store/selectors';
import { IconUpload } from '@tabler/icons';

const SubmitModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const now = DateTime.now().setZone('utc').toMillis();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const timeline = useSelector(selectCurrentTapeTimeline);3
  const tapeBpm = useSelector(selectCurrentTapeBpm);
  const tapeName = useSelector(selectCurrentTapeName);
  const curator = useSelector(selectCurrentTapeCurator);
  const tapeCover = useSelector(selectCurrentTapeCover);
  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          <i className="fa-sharp fa-solid fa-arrow-up-from-bracket text-xl mr-1"></i> Submit
        </Dialog.Title>
        <Flex direction={'row'} alignItems={'center'} w={{ base: 'full', lg: 'unset' }} gap={3}>
          <AvatarGroup size={{ base: 'md', lg: 'md' }} max={2}>
            <Avatar name={tapeName} src={tapeCover} />
            <Avatar name={curator?.displayName} src={curator?.profilePicture} />
          </AvatarGroup>
          <Flex alignItems={'start'} gap={1}>
            <Text fontWeight={'semibold'} fontSize={{ base: 'sm', lg: 'md' }}>
              {tapeName}
            </Text>
            <Text fontWeight={'normal'} fontSize={{ base: 'sm', lg: 'md' }}>
              x
            </Text>
            <Text fontWeight={'semibold'} fontSize={{ base: 'sm', lg: 'md' }}>
              {curator?.displayName}
            </Text>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Fragment>
          <Flex>
            <Box w="full" as={Flex} alignItems={'center'} bgColor={'green.100'} py={2} px={3} rounded="lg">
              <i className="fa-sharp fa-solid fa-circle-info mr-2"></i>
              <Flex gap={2} alignItems={'baseline'}>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'gray.700'} fontWeight={'light'}>
                  Submissions end in:
                </Text>
                <DateCountdown deadline={timeline.submit.end} />
              </Flex>
            </Box>
          </Flex>
          <Text mt={4} as={Dialog.Description} fontSize={'sm'} p={2}>
            To prevent your submission from being disqualified, <span className="font-semibold">your track must be {tapeBpm} bpm </span> and{' '}
            <span className="font-semibold">between 60 to 90 seconds</span> in length.
          </Text>
        </Fragment>
        <Divider my={3} />
        <Flex px={1} direction={'column'}>
          <Text mb={1} textColor={'red.400'} fontWeight={'bold'}>
            Disclaimer
          </Text>
          {now > timeline?.submit?.end ? (
            <Text textColor={'gray.700'} fontSize="xs">
              Using this sample outside of the heds platform must be expressly cleared by the sample curator {`(${curator.displayName})`}.
            </Text>
          ) : (
            <Text textColor={'gray.700'} fontSize="xs">
              My submissions will not contain copyrighted material and I will adhere to the bpm and length requirements when submitting for the tape.
            </Text>
          )}
          <Checkbox mt={3} onChange={(e) => setIsChecked(!isChecked)}>
            <Text fontSize={'xs'}>I agree</Text>
          </Checkbox>
        </Flex>
        <Flex>
          <Box as="section" bg="bg-surface" py={{ base: '4', md: '8' }}>
            <Container maxW="lg">
              <FormControl id="file">
                <FormLabel>Dropzone</FormLabel>
                <Center borderWidth="1px" borderRadius="lg" px="6" py="4" bg={'white'}>
                  <VStack spacing="3">
                    <Square size="10" bg="bg-subtle" borderRadius="lg">
                      <Icon as={IconUpload} boxSize="5" color="muted" />
                    </Square>
                    <VStack spacing="1">
                      <HStack spacing="1" whiteSpace="nowrap">
                        <Button variant="link" colorScheme="blue" size="sm">
                          Click to upload
                        </Button>
                        <Text fontSize="sm" color="muted">
                          or drag and drop
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="muted">
                        PNG, JPG or GIF up to 2MB
                      </Text>
                    </VStack>
                  </VStack>
                </Center>
              </FormControl>
            </Container>
          </Box>
        </Flex>
        <Divider my={5} />
        <Flex gap={1}>
          <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
            Back
          </Button>
          <Button isLoading={isLoading} onClick={() => {}} disabled={!isChecked} bg="green.100">
            Submit
          </Button>
        </Flex>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SubmitModal;
