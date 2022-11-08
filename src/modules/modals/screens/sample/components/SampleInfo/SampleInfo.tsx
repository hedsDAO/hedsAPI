import { selectCurrentTapeBpm, selectCurrentTapeCurator, selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { formatTime } from '@/utils';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const SampleInfo = () => {
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const bpm = useSelector(selectCurrentTapeBpm);
  const curator = useSelector(selectCurrentTapeCurator);
  return (
    <Fragment>
      <Divider my={5} />
      <Flex justify={'start'} gap={2}>
        <Flex textColor="gray.800" fontSize={'xs'} fontWeight="semibold" alignItems={'center'} px={2} py={1} rounded="sm" gap={2} bg={'gray.200'}>
          BPM:
          <Text textColor="green.600" fontWeight="semibold">
            {bpm}
          </Text>
        </Flex>
        <Flex textColor="gray.800" fontSize={'xs'} fontWeight="semibold" alignItems={'center'} px={2} py={1} rounded="sm" gap={2} bg={'gray.200'}>
          Duration:
          <Text fontWeight="semibold" textColor="orange.600" fontSize={'xs'}>
            {formatTime(curator?.samples?.[space]?.[tape]?.[id].duration)}
          </Text>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default SampleInfo;
