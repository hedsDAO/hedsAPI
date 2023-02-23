import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import { Button, Flex, Text } from '@chakra-ui/react';
import { TimelineStatus } from '../../models/common';
import { ClosedBadge, OpenBadge, UpcomingBadge } from '@/common/badges';
import { DateTime } from 'luxon';
import { Modals } from '@/modules/modals/store/modalModel';

const Mint = () => {
  const zone = { zone: 'GMT' };
  const dispatch = useDispatch<Dispatch>();
  const mint = useSelector(store.select.collabModel.selectMint);
  const premint = useSelector(store.select.collabModel.selectPremint);
  const premintStart = DateTime.fromMillis(premint.start, zone);
  const start = DateTime.fromMillis(mint.start, zone);
  const end = DateTime.fromMillis(mint.end, zone);

  return (
    <div>
      <Flex alignItems={'center'} gap={2.5} mb={2}>
        <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{mint.name}</Text>
        {mint.status === TimelineStatus.CLOSED ? <ClosedBadge /> : mint.status === TimelineStatus.OPEN ? <OpenBadge /> : <UpcomingBadge />}
      </Flex>
      <Text className="mt-2 text-sm tracking-tight text-gray-500">{mint.description}</Text>
      {mint.status === TimelineStatus.CLOSED ? (
        <ClosedDateBox start={start} end={end} />
      ) : mint.status === TimelineStatus.OPEN ? (
        <OpenDateBox end={mint.end} />
      ) : (
        <UpcomingDateBox start={premintStart ? premintStart : start} />
      )}
      <Flex mt={4} gap={2}>
        {mint.status === TimelineStatus.CLOSED ? (
          <>
            <Button disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
              Mint Closed
            </Button>
          </>
        ) : mint.status === TimelineStatus.OPEN ? (
          <Button
            onClick={() => {
              dispatch.modalModel.setModal(Modals.MINT_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }}
            border={'solid 1px'}
            borderColor="green.200"
            bg="green.100"
            leftIcon={<LockOpenIcon height="14" width="14" />}
            size={'sm'}
            pr={3}
          >
            Mint
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default Mint;