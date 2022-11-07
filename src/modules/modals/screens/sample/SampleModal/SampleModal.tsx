import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/modules/modals/components';
import { Dialog } from '@headlessui/react';
import { Avatar, AvatarGroup, Box, Button, Checkbox, Divider, Flex, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { formatTime, handleDownloadFile, generateSampleLink } from '@/utils';
import DateCountdown from '@/common/countdown/DateCountdown';
import { storage } from '@/App';
import { getDownloadURL, ref } from 'firebase/storage';
import {
  selectCurrentTapeBpm,
  selectCurrentTapeCover,
  selectCurrentTapeCurator,
  selectCurrentTapeName,
  selectCurrentTapeTimeline,
  selectSpaceTapeId,
} from '@/pages/tapes/store/selectors';

const SampleModal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<Dispatch>();
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const sampleRef = ref(storage, generateSampleLink(id));
  const now = DateTime.now().setZone('utc').toMillis();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const curator = useSelector(selectCurrentTapeCurator);
  const timeline = useSelector(selectCurrentTapeTimeline);
  const tapeName = useSelector(selectCurrentTapeName);
  const tapeCover = useSelector(selectCurrentTapeCover);
  const tapeBpm = useSelector(selectCurrentTapeBpm);

  const handleGetSample = async () => {
    setIsLoading(true);
    await getDownloadURL(sampleRef).then(async (url: string) => {
      setIsLoading(false);
      await handleDownloadFile(url, `HT${id}`);
      setIsLoading(false);
      setTimeout(() => {
        dispatch.modalModel.setModalOpen(false);
      }, 500);
    });
  };

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          <i className="fa-light fa-waveform-lines mr-1 text-xl"></i> Sample
        </Dialog.Title>
        <Divider my={5} />
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
        <Flex justify={'start'} gap={2}>
          <Flex alignItems={'center'} px={2} py={1} rounded="sm" gap={2} bg={'gray.200'}>
            <Text textColor="gray.800" fontSize={'xs'} fontWeight="semibold">
              BPM:
            </Text>
            <Text textColor="green.600" fontWeight="semibold" fontSize={'xs'}>
              {tapeBpm}
            </Text>
          </Flex>
          <Flex alignItems={'center'} px={2} py={1} rounded="sm" gap={2} bg={'gray.200'}>
            <Text fontSize={'xs'} fontWeight="semibold">
              Duration:
            </Text>
            <Text fontWeight="semibold" textColor="orange.600" fontSize={'xs'}>
              {formatTime(curator?.samples?.[space]?.[tape]?.[id].duration)}
            </Text>
          </Flex>
        </Flex>
        <Divider my={5} />
        {now > timeline?.submit?.end ? (
          <Fragment>
            <Flex>
              <Box w="full" as={Flex} alignItems={'center'} bgColor={'red.100'} py={2} px={3} rounded="lg">
                <i className="fa-sharp fa-solid fa-circle-exclamation mr-2"></i>
                <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'gray.700'} fontWeight={'medium'}>
                  Public submissions have ended.
                </Text>
              </Box>
            </Flex>
            <Text mt={4} as={Dialog.Description} fontSize={'sm'} p={2}>
              You're still welcome to download the sample, however <span className="font-semibold">there will be no place on heds to submit your tracks.</span>
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <Flex>
              <Box w="full" as={Flex} alignItems={'center'} bgColor={'green.100'} py={2} px={3} rounded="lg">
                <i className="fa-sharp fa-solid fa-circle-info mr-2"></i>
                <Flex gap={2} alignItems={'baseline'}>
                  <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'gray.700'} fontWeight={'light'}>
                    Submissions end in:
                  </Text>
                  <DateCountdown deadline={timeline.submit.end + 75000000} />
                </Flex>
              </Box>
            </Flex>
            <Text mt={4} as={Dialog.Description} fontSize={'sm'} p={2}>
              To prevent your submission from being disqualified, <span className="font-semibold">your track must be {tapeBpm} bpm </span> and{' '}
              <span className="font-semibold">between 60 to 90 seconds</span> in length.
            </Text>
          </Fragment>
        )}
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
        <Divider my={5} />
        <Flex gap={1}>
          <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
            Back
          </Button>
          <Button isLoading={isLoading} onClick={() => handleGetSample()} disabled={!isChecked} bg="green.100">
            Download
          </Button>
        </Flex>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SampleModal;
