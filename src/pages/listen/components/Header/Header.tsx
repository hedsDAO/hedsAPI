import { EtherscanButton, OpenSeaButton } from '@/common/buttons';
import { selectCurrentTapeCover, selectCurrentTapeDescription, selectCurrentTapeName } from '@/pages/tapes/store/selectors';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cover = useSelector(selectCurrentTapeCover);
  const description = useSelector(selectCurrentTapeDescription);
  const name = useSelector(selectCurrentTapeName);
  return (
    <Flex
      justifyContent={'center'}
      alignItems={{ base: 'start', lg: 'center' }}
      maxWidth={'7xl'}
      mx={'auto'}
      flexDirection={['column', 'column', 'column', 'row']}
      gap={8}
      px={[10, 6, 4, 2]}
      py={4}
    >
      <Stack direction={'column'}>
        <Image
          className="bs-preset-1"
          maxH={{ base: 'full', lg: '18rem' }}
          maxW={{ base: 'full', lg: '18rem' }}
          minH={{ base: 'full', lg: '18rem' }}
          minW={{ base: 'full', lg: '18rem' }}
          rounded="sm"
          src={cover}
        />
      </Stack>
      <Stack direction={'column'} spacing="2" width={'full'} alignItems={'start'} justifyContent="center">
        <Text fontWeight={'semibold'} fontSize={'4xl'}>
          {name}
        </Text>
        <Flex pb={3} gap={2}>
          <OpenSeaButton />
          <EtherscanButton />
        </Flex>
        <Text textAlign={'start'} fontWeight={'light'} fontSize={'xs'} maxWidth={'md'}>
          {description}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Header;
