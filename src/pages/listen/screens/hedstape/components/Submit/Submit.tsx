import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Modals } from '@/modules/modals/store/modalModel';
import { TimelineStatus } from '@/pages/listen/screens/hedstape/models/common';
import { ClosedBadge, OpenBadge, UpcomingBadge } from '@/common/badges';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';
import { IconDownload } from '@tabler/icons';

const Submit = () => {
  const zone = { zone: 'GMT' };
  const dispatch = useDispatch<Dispatch>();
  const submit = useSelector(store.select.hedstapeModel.selectSubmit);
  const start = DateTime.fromMillis(submit.start, zone);
  const end = DateTime.fromMillis(submit.end, zone);
  return (
    <div>
      <Flex alignItems={'center'} gap={2.5} mb={2}>
        <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{submit.name}</Text>
        {submit.status === TimelineStatus.CLOSED ? <ClosedBadge /> : submit.status === TimelineStatus.OPEN ? <OpenBadge /> : <UpcomingBadge />}
      </Flex>
      <Text className="mt-2 text-sm tracking-tight text-gray-500">{submit.description}</Text>
      {submit.status === TimelineStatus.CLOSED ? (
        <ClosedDateBox start={start} end={end} />
      ) : submit.status === TimelineStatus.OPEN ? (
        <OpenDateBox end={submit.end} />
      ) : (
        <UpcomingDateBox start={start} />
      )}
      <Flex mt={4} gap={2}>
        <Button
          onClick={() => {
            dispatch.modalModel.setModal(Modals.SAMPLE_MODAL);
            dispatch.modalModel.setModalOpen(true);
          }}
          border={'solid 1px'}
          borderColor="blue.100"
          bg="blue.50"
          rounded="sm"
          leftIcon={<IconDownload height="14" width="14" />}
          size={'sm'}
          pr={3}
        >
          Download Sample
        </Button>
        {submit.status === TimelineStatus.OPEN ? (
          <Button
            onClick={() => {
              dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }}
            border={'solid 1px'}
            borderColor="green.200"
            bg="green.100"
            rounded="sm"
            leftIcon={<i className="fa-sharp fa-solid fa-arrow-up-from-bracket text-xs"></i>}
            size={'sm'}
            pr={3}
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default Submit;
