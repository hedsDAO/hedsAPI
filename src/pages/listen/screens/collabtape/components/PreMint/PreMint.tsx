import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import { Button, Flex, Text } from '@chakra-ui/react';
import { TimelineStatus } from '../../models/common';
import { ClosedBadge, OpenBadge, UpcomingBadge } from '@/common/badges';
import { DateTime } from 'luxon';
import { Modals } from '@/modules/modals/store/modalModel';

const PreMint = () => {
  const dispatch = useDispatch<Dispatch>();
  const premint = useSelector(store.select.collabModel.selectPremint);
  const start = DateTime.fromMillis(premint.start);
  const end = DateTime.fromMillis(premint.end);
  const tapeId = useSelector(store.select.tapesModel.selectCurrentTapeId);
  return (
    <div>
      <Flex alignItems={'center'} gap={2.5} mb={2}>
        <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{premint.name}</Text>
        {premint.status === TimelineStatus.CLOSED ? <ClosedBadge /> : premint.status === TimelineStatus.OPEN ? <OpenBadge /> : <UpcomingBadge />}
      </Flex>
      <Text className="mt-2 text-sm tracking-tight text-gray-500">{premint.description}</Text>
      {premint.status === TimelineStatus.CLOSED ? (
        <ClosedDateBox start={start} end={end} />
      ) : premint.status === TimelineStatus.OPEN ? (
        <OpenDateBox end={premint.end} />
      ) : (
        <UpcomingDateBox start={start} />
      )}
      <Flex mt={4} gap={2}>
        {premint.status === TimelineStatus.CLOSED ? (
          <Button isDisabled={true} leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
            Pre Mint Closed
          </Button>
        ) : premint.status === TimelineStatus.OPEN ? (
          <Button
            onClick={() => {
              if (tapeId === 'secretgarden') window.open('https://www.secretgarden.fm/', '_blank', 'noreferrer');
              else {
                dispatch.modalModel.setModal(Modals.MINT_MODAL);
                dispatch.modalModel.setModalOpen(true);
              }
            }}
            border={'solid 1px'}
            borderColor="green.200"
            bg="green.100"
            leftIcon={<LockOpenIcon height="14" width="14" />}
            size={'sm'}
            pr={3}
          >
            Pre Mint
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </div>
  );
};

export default PreMint;
