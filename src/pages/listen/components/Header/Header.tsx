import { RootState } from '@/store';
import { Button, Flex, Image, Link, Stack, Text } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { id } = useParams<{ space?: string; tape: string; id: string }>();
  const { hedsTapes } = useSelector((state: RootState) => state.tapesModel);
  return (
    <Fragment>
      <Flex maxW={'7xl'} mx={'auto'} px={[10, 6, 4, 2]} mb={2}>
        <Flex className="group" width={'fit-content'} alignItems={'center'}>
          <i className="fa-regular fa-arrow-left group-hover:mr-3 mr-2 ease-in-out transition-all text-sm" />
          <Text className="relative bottom-[1px]" to={'/tapes'} as={ReactLink} fontSize={'xs'}>
            view all tapes
          </Text>
        </Flex>
      </Flex>
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
            src={hedsTapes?.[id]?.image}
          />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'} alignItems={'start'} justifyContent="center">
          <Text fontWeight={'semibold'} fontSize={'4xl'}>
            {hedsTapes?.[id]?.name}
          </Text>
          <Flex pb={3} gap={2}>
            <Button
              as={Link}
              to={{ pathname: hedsTapes?.[id]?.opensea }}
              bg={'blue.50'}
              border={'solid 1px'}
              borderColor="blue.100"
              rounded="lg"
              size={'xs'}
              leftIcon={<i className="fak fa-opensea text-xs" />}
            >
              OpenSea
            </Button>
            <Button
              as={Link}
              to={{ pathname: hedsTapes?.[id]?.etherscan }}
              bg={'gray.50'}
              border={'solid 1px'}
              borderColor="gray.100"
              rounded="lg"
              size={'xs'}
              leftIcon={<i className="fak fa-etherscan text-xs" />}
            >
              Etherscan
            </Button>
          </Flex>
          <Text textAlign={'start'} fontWeight={'light'} fontSize={'xs'} maxWidth={'md'}>
            {hedsTapes?.[id]?.description}
          </Text>
        </Stack>
      </Flex>
    </Fragment>
  );
};

export default Header;
