import { EtherscanButton, OpenSeaButton } from '@/common/buttons';
import { Modals } from '@/modules/modals/store/modalModel';
import { selectCurrentTapeCover, selectCurrentTapeDescription, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Dispatch, RootState } from '@/store';
import { Avatar, Button, Flex, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { IconDownload } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const cover = useSelector(selectCurrentTapeCover);
  const description = useSelector(selectCurrentTapeDescription);
  const name = useSelector(selectCurrentTapeName);
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  return (
    <Flex
      justifyContent={'center'}
      alignItems={{ base: 'start', lg: 'center' }}
      maxWidth={'7xl'}
      mx={'auto'}
      flexDirection={['column', 'column', 'column', 'row']}
      gap={8}
      px={[4, 2, 3, 1]}
      py={4}
    >
      <Stack direction={'column'}>
        <Image
          className="bs-preset-1"
          maxH={{ base: 'full', lg: '20rem' }}
          maxW={{ base: 'full', lg: '20rem' }}
          minH={{ base: 'full', lg: '20rem' }}
          minW={{ base: 'full', lg: '20rem' }}
          rounded="sm"
          src={cover}
        />
        <Button
          rounded="sm"
          textColor={'gray.700'}
          border={'solid 1px'}
          borderColor={'green.200'}
          bg="green.100"
          leftIcon={<i className="fa-solid fa-layer-plus"></i>}
          size={'xs'}
        >
          Add to Queue
        </Button>
      </Stack>
      <Stack direction={'column'} width={'full'} alignItems={'start'} justifyContent="center">
        <Text fontWeight={'semibold'} fontSize={'4xl'}>
          {name}
        </Text>
        <Flex pb={3} gap={2}>
          <OpenSeaButton />
          <EtherscanButton />
        </Flex>
        {currentTape && (
          <Flex w={{ base: 'full', lg: 'unset' }} pb={2} gap={1} direction={'column'}>
            <Text px={1} fontWeight={'bold'} fontSize="sm">
              The Sample
            </Text>
            <Flex justify={'space-between'} className={`text-sm text-gray-600 rounded-md border-green-200/60 border`} px={2} py={2} gap={2}>
              <Flex minW={{ lg: 'sm' }} alignItems={'center'} gap={2}>
                <Avatar to={`/u/${currentTape.curator.wallet}`} as={Link} borderRadius="full" boxSize="25px" src={currentTape.curator?.profilePicture} />
                <div className="text-xs text-neutral-800 -mr-1">{currentTape.curator?.samples?.[space][tape][id]?.track}.</div>
                <span className="text-xs font-medium whitespace-nowrap">{currentTape.curator?.displayName}</span>
              </Flex>
              <Flex pl={{ base: 12, lg: 0 }} alignItems={'center'} gap={2}>
                <IconButton bg="blue.200" size="xs" aria-label="play" icon={<i className="fa-solid fa-play"></i>} className="flex-shrink-0" />
                <IconButton
                  onClick={() => {
                    dispatch.modalModel.setModal(Modals.SAMPLE_MODAL);
                    dispatch.modalModel.setModalOpen(true);
                  }}
                  bg="green.200"
                  size="xs"
                  aria-label="play"
                  icon={<IconDownload height="14" width="14" />}
                  className="flex-shrink-0"
                />
              </Flex>
            </Flex>
          </Flex>
        )}
        <Flex px={1} mt={4} direction={'column'}>
          <Text fontWeight={'bold'} fontSize="xs">
            About The Tape
          </Text>
          <Text textAlign={'start'} fontWeight={'light'} fontSize={'xs'} maxWidth={'md'}>
            {description}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Header;
