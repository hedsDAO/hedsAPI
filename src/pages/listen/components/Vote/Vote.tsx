import { Dispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Modals } from '@/modules/modals/store/modalModel';
import { TimelineStatus } from '@/pages/listen/store/hedstapeModel';
import { ClosedBadge, OpenBadge, UpcomingBadge } from '@/common/badges';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';

const Vote = () => {
  const zone = { zone: 'GMT' };
  const dispatch = useDispatch<Dispatch>();
  const { vote } = useSelector((state: RootState) => state.hedstapeModel?.timeline);
  const start = DateTime.fromMillis(vote.start, zone);
  const end = DateTime.fromMillis(vote.end, zone);
  return (
    <div>
      <Flex alignItems={'center'} gap={2.5} mb={2}>
        <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{vote.name}</Text>
        {vote.status === TimelineStatus.CLOSED ? <ClosedBadge /> : vote.status === TimelineStatus.OPEN ? <OpenBadge /> : <UpcomingBadge />}
      </Flex>
      <Text className="mt-2 text-sm tracking-tight text-gray-500">{vote.description}</Text>
      {vote.status === TimelineStatus.CLOSED ? (
        <ClosedDateBox start={start} end={end} />
      ) : vote.status === TimelineStatus.OPEN ? (
        <OpenDateBox end={vote.end} />
      ) : (
        <UpcomingDateBox start={start} />
      )}
      <Flex mt={4} gap={2}>
        {vote.status === TimelineStatus.CLOSED ? (
          <Button border={'solid 1px'} borderColor="blue.100" bg="blue.50" leftIcon={<EyeIcon height="14" width="14" />} size={'sm'} pr={3}>
            View Results
          </Button>
        ) : vote.status === TimelineStatus.OPEN ? (
          <Button
            onClick={() => {}}
            border={'solid 1px'}
            borderColor="green.200"
            bg="green.100"
            leftIcon={<i className="fa-sharp fa-solid fa-xmark-to-slot"></i>}
            size={'sm'}
            pr={3}
          >
            Vote
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default Vote;
