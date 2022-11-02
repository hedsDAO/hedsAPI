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
      <Flex className="group" px={2} maxW={'7xl'} mx={'auto'}>
        <Text to={'/tapes'} as={ReactLink} fontSize={'xs'}>
          <i className="fa-solid fa-arrow-left group-hover:mr-4 mr-2 ease-in-out transition-all" />
          view all tapes
        </Text>
      </Flex>
      <Flex
        justifyContent={'center'}
        alignItems="center"
        maxWidth={'7xl'}
        mx={'auto'}
        flexDirection={['column', 'column', 'column', 'row']}
        gap={8}
        px={[10, 6, 4, 2]}
        py={4}
      >
        <Stack direction={'column'}>
          <Image className="bs-preset-1" maxH={'18rem'} maxW={'18rem'} minH={'18rem'} minW={'18rem'} rounded="sm" src={hedsTapes?.[id]?.image} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'} alignItems={['center', 'center', 'center', 'start']} justifyContent="center">
          <Text fontWeight={'semibold'} fontSize={'4xl'}>
            {hedsTapes?.[id]?.name}
          </Text>
          <Flex pb={3} gap={2}>
            <Button
              as={Link}
              to={{ pathname: hedsTapes?.[id]?.opensea }}
              bg={'blue.200'}
              rounded="md"
              size={'xs'}
              leftIcon={<i className="fak fa-opensea text-xs" />}
            >
              OpenSea
            </Button>
            <Button
              as={Link}
              to={{ pathname: hedsTapes?.[id]?.etherscan }}
              bg={'gray.200'}
              rounded="md"
              size={'xs'}
              leftIcon={<i className="fak fa-etherscan text-xs" />}
            >
              Etherscan
            </Button>
          </Flex>
          <Text textAlign={['center', 'center', 'center', 'start']} fontWeight={'light'} fontSize={'xs'} maxWidth={'md'}>
            {hedsTapes?.[id]?.description}
          </Text>
        </Stack>
      </Flex>
    </Fragment>
  );
};

export default Header;
