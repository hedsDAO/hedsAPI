import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import { ClosedBadge, OpenBadge, UpcomingBadge } from '@/common/badges';
import { Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';
import { ClosedDateBox, OpenDateBox, UpcomingDateBox } from '@/common/timeline';
import { Modals } from '@/modules/modals/store/modalModel';

// Utils
import { TimelineStatus } from '@/pages/listen/screens/hedstape/models/common';
import { DateTime } from 'luxon';
import * as gaEvents from '@/events';

const Mint = () => {
  const { tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const mint = useSelector(store.select.hedstapeModel.selectMint);
  const premint = useSelector(store.select.hedstapeModel.selectPremint);
  const premintStart = DateTime.fromMillis(premint.start);
  const start = DateTime.fromMillis(mint.start);
  const end = DateTime.fromMillis(mint.end);
  const openSeaLink = useSelector(store.select.tapesModel.selectCurrentTapeOpenseaLink);

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
      ) : premint.status === TimelineStatus.OPEN ? (
        <UpcomingDateBox start={start} />
      ) : (
        <UpcomingDateBox start={premintStart} />
      )}
      <Flex mt={4} gap={2}>
        {mint.status === TimelineStatus.OPEN || premint.status === TimelineStatus.OPEN ? (
          <Stack direction="row" spacing={4}>
            <Button
              onClick={() => {
                dispatch.modalModel.setModal(Modals.MINT_MODAL);
                dispatch.modalModel.setModalOpen(true);
                gaEvents.clickMintButton(`${tape}/${id}`);
              }}
              border={'solid 1px'}
              borderColor={premint.status === TimelineStatus.CLOSED ? 'gray.400' : 'green.200'}
              bg={premint.status === TimelineStatus.CLOSED ? 'gray.300' : 'green.100'}
              leftIcon={premint.status === TimelineStatus.OPEN ? <LockOpenIcon height="14" width="14" /> : <LockClosedIcon height="14" width="14" />}
              size={'sm'}
              pr={3}
              isDisabled={premint.status !== TimelineStatus.OPEN}
              _hover={premint.status === TimelineStatus.CLOSED ? { bg: 'gray.300' } : { bg: 'green.300' }}
            >
              Pre-Mint
            </Button>
            <Button
              onClick={() => {
                dispatch.modalModel.setModal(Modals.MINT_MODAL);
                dispatch.modalModel.setModalOpen(true);
                gaEvents.clickMintButton(`${tape}/${id}`);
              }}
              border={'solid 1px'}
              borderColor={mint.status === TimelineStatus.OPEN ? 'green.200' : 'gray.400'}
              bg={mint.status === TimelineStatus.OPEN ? 'green.100' : 'gray.300'}
              leftIcon={mint.status === TimelineStatus.OPEN ? <LockOpenIcon height="14" width="14" /> : <LockClosedIcon height="14" width="14" />}
              size={'sm'}
              pr={3}
              isDisabled={mint.status !== TimelineStatus.OPEN}
              _hover={mint.status === TimelineStatus.OPEN ? { bg: 'green.300' } : { bg: 'gray.300' }}
            >
              Mint
            </Button>
          </Stack>
        ) : (
          mint.status === TimelineStatus.CLOSED &&
          premint.status === TimelineStatus.CLOSED && (
            <Stack direction="row" spacing={4}>
              <Button rounded={'sm'} disabled leftIcon={<LockClosedIcon height="14" width="14" />} size={'sm'} pr={3}>
                Mint Closed
              </Button>
              <Button
                onClick={() => {
                  gaEvents.clickLinkToOpenseaNextToMintButton(`${tape}/${id}`);
                }}
                target="_blank"
                as={Link}
                href={openSeaLink?.length > 0 && openSeaLink}
                rounded={'sm'}
                border={'solid 1px'}
                borderColor="blue.100"
                bg="blue.50"
                leftIcon={<i className="fak fa-opensea text-xs" />}
                size={'sm'}
                pr={3}
              >
                OpenSea
              </Button>
            </Stack>
          )
        )}
      </Flex>
    </div>
  );
};

export default Mint;
