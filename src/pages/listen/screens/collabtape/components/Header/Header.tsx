import { EtherscanButton, OpenSeaButton } from '../';
import { store } from '@/store';
import { Flex, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const cover = useSelector(store.select.tapesModel.selectCurrentTapeCover);
  const description = useSelector(store.select.tapesModel.selectCurrentTapeDescription);
  const name = useSelector(store.select.tapesModel.selectCurrentTapeName);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  return (
    <Flex
      justifyContent={'center'}
      alignItems={{ base: 'start', lg: 'center' }}
      maxWidth={'6xl'}
      mx={'auto'}
      flexDirection={['column', 'column', 'column', 'row']}
      gap={8}
      px={[4, 2, 3, 1]}
      py={4}
    >
      <Stack direction={'column'}>
        <Skeleton
          startColor="gray.100"
          endColor="gray.500"
          w="full"
          minW={{ base: 'full', lg: '20rem' }}
          minH={{ base: 'full', lg: '20rem' }}
          rounded="lg"
          isLoaded={isImageLoaded}
        >
          <Image
            onLoad={setIsImageLoaded.on}
            className="bs-preset-1"
            maxH={{ base: 'full', lg: '20rem' }}
            maxW={{ base: 'full', lg: '20rem' }}
            minH={{ base: 'full', lg: '20rem' }}
            minW={{ base: 'full', lg: '20rem' }}
            rounded="lg"
            src={currentTape?.image}
          />
        </Skeleton>
      </Stack>
      <Stack direction={'column'} width={'full'} alignItems={'start'} justifyContent="center">
        <Text fontWeight={'semibold'} fontSize={'4xl'}>
          {name}
        </Text>
        <Flex pb={3} gap={2}>
          {currentTape?.opensea && <OpenSeaButton />}
          {currentTape?.etherscan && <EtherscanButton />}
        </Flex>
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
