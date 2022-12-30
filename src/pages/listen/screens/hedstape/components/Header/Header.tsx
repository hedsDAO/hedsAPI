import { AudioTrack, TapeCard } from '@/common/media';
import { store } from '@/store';
import { Button, Flex, Stack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { space, tape, id } = useParams();
  const description = useSelector(store.select.tapesModel.selectCurrentTapeDescription);
  const name = useSelector(store.select.tapesModel.selectCurrentTapeName);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentTape);
  const opensea = useSelector(store.select.tapesModel.selectCurrentTapeOpenseaLink);
  const etherscan = useSelector(store.select.tapesModel.selectCurrentTapeEtherscanLink);

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
      <Stack maxW="lg" direction={'column'}>
        <TapeCard tape={currentTape} />
      </Stack>
      <Stack direction={'column'} width={'full'} alignItems={'start'} justifyContent="center">
        <Text fontFamily={'"Space Mono", monospace'} fontWeight={'semibold'} fontSize={'4xl'}>
          {name}
        </Text>
        <Flex  pb={{ base: 8, lg: 3 }} gap={2}>
          <Button
            as={ChakraLink}
            href={opensea}
            target="_blank"
            bg={'blue.50'}
            border={'solid 1px'}
            borderColor="blue.100"
            rounded="sm"
            size={'xs'}
            leftIcon={<i className="fak fa-opensea text-xs" />}
          >
            OpenSea
          </Button>
          <Button
            as={ChakraLink}
            href={etherscan}
            target="_blank"
            bg={'gray.50'}
            border={'solid 1px'}
            borderColor="gray.100"
            rounded="sm"
            size={'xs'}
            leftIcon={<i className="fak fa-etherscan text-xs" />}
          >
            Etherscan
          </Button>
        </Flex>
        {currentTape && (
          <Flex w={{ base: 'full', lg: 'full' }} pb={2} gap={1} direction={'column'}>
            <AudioTrack track={currentTape?.curator?.samples?.[space]?.[tape]?.[id]} />
          </Flex>
        )}
        <Flex px={1} pt={4} direction={'column'}>
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
