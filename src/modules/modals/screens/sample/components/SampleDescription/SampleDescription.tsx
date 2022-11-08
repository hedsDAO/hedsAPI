import { DateCountdown } from '@/common/tape';
import { selectCurrentTapeBpm, selectCurrentTapeTimeline } from '@/pages/tapes/store/selectors';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const SampleDescription = () => {
  const now = DateTime.now().setZone('utc').toMillis();
  const timeline = useSelector(selectCurrentTapeTimeline);
  const bpm = useSelector(selectCurrentTapeBpm);
  return (
    <Fragment>
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
                <DateCountdown deadline={timeline.submit.end} />
              </Flex>
            </Box>
          </Flex>
          <Text mt={4} as={Dialog.Description} fontSize={'sm'} p={2}>
            To prevent your submission from being disqualified, <span className="font-semibold">your track must be {bpm} bpm </span> and{' '}
            <span className="font-semibold">between 60 to 90 seconds</span> in length.
          </Text>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SampleDescription;
