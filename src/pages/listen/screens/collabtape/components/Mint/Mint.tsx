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
  const dispatch = useDispatch<Dispatch>();
  const mint = useSelector(store.select.collabModel.selectMint);
  const start = DateTime.fromMillis(mint.start);
  const end = DateTime.fromMillis(mint.end);
  const tapeId = useSelector(store.select.tapesModel.selectCurrentTapeId);
  const isMintClosed = mint.status === TimelineStatus.CLOSED && tapeId !== 'secretgarden';
  const isMintOpenOrSgTape = mint.status === TimelineStatus.OPEN || tapeId === 'secretgarden';

  return (
    <div>
      <Flex alignItems={'center'} gap={2.5} mb={2}>
        <Text className="text-xl font-bold tracking-wide leading-6 text-gray-900">{mint.name}</Text>
        {isMintClosed ? <ClosedBadge /> : isMintOpenOrSgTape ? <OpenBadge /> : <UpcomingBadge />}
      </Flex>
      <Text className="mt-2 text-sm tracking-tight text-gray-500">{mint.description}</Text>
      {isMintClosed ? (
        <ClosedDateBox start={start} end={end} />
      ) : isMintOpenOrSgTape ? (
        tapeId !== 'secretgarden' ? <OpenDateBox end={mint.end}/> : <></>
      ) : (
        <UpcomingDateBox start={start} />
      )}
      <Flex mt={4} gap={2}>
        {isMintClosed ? (
          <Button isDisabled={true} leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
            Mint Closed
          </Button>
        ) : isMintOpenOrSgTape ? (
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
