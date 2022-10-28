import { Button, Divider, Flex, Heading, Text, Avatar, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { useParams } from 'react-router-dom';
import { Header, Timeline } from '@/pages/listen/components';
import { formatTime, formatWallet } from '@/utils';
import { Modals } from '@/modules/modals/store/modalModel';

export const HedsTape = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);

  return (
    <div className="">
      <Header />
      <Divider my={5} />
      <Grid maxW="7xl" mx="auto" templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={2}>
        <GridItem px={{ base: '5', md: '3' }} colSpan={2}>
          <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} shadow="md" rounded="lg" w={'full'} h={'full'} bg="gray.200">
            <Text py={2} color="gray.700">
              Current Step
            </Text>
            <Text color="gray.400" fontSize={'xs'}>
              Info on the current step ...
            </Text>
            <Flex py={3} gap={2}>
              <Button
                onClick={() => {
                  dispatch.modalModel.setModal(Modals.SAMPLE_MODAL);
                  dispatch.modalModel.setModalOpen(true);
                }}
                size={'sm'}
              >
                Sample
              </Button>
              <Button
                onClick={() => {
                  dispatch.modalModel.setModal(Modals.SUBMIT_MODAL);
                  dispatch.modalModel.setModalOpen(true);
                }}
                size={'sm'}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  dispatch.modalModel.setModal(Modals.MINT_MODAL);
                  dispatch.modalModel.setModalOpen(true);
                }}
                size={'sm'}
              >
                Mint
              </Button>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Timeline />
        </GridItem>
      </Grid>
      <Divider my={5} />
      <Heading fontSize={{ base: 'xl', md: '2xl' }} mx="auto" maxWidth={'7xl'} textAlign={['center', 'center', 'center', 'start']}>
        Tracks
      </Heading>
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={'column'} gap={2} px={[10, 6, 4, 0]} py={4}>
        {currentTape?.tracks?.map((track) => {
          return (
            <Flex
              as={Button}
              key={track.wallet + space + tape + id}
              onClick={() => {
                dispatch.audioModel.setIsShowingPlayer(true);
                dispatch.audioModel.setCurrentTrack(track?.tracks?.[space]?.[tape]?.[id]);
              }}
              justify={'space-between'}
            >
              <Flex gap={2} alignItems={'center'}>
                <Avatar src={track.profilePicture} size={'sm'} />
                <Flex direction={'column'} alignItems="start">
                  <Text fontSize={'xs'}>{track.displayName}</Text>
                  <Text fontSize={'2xs'}>{formatWallet(track.wallet)}</Text>
                </Flex>
              </Flex>
              <Flex>
                <Text fontSize={'2xs'}>{formatTime(track.tracks?.[space]?.[tape]?.[id]?.duration)}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};
