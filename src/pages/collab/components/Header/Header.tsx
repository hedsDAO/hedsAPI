import { RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { Box, Button, Flex, Heading, Image, Skeleton, Stack } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';

const Header = () => {
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);
  const tape = useSelector(store.select.tapesModel.selectLatestCollabTape);
  return (
    <Fragment>
      {!isEmpty(tape) ? (
        <Box className="animate__animated animate__fadeIn" key={tape?.etherscan} position="relative">
          <Skeleton isLoaded={!loading} height={'8rem'}>
            <Image className="grayscale" src={tape?.image} alt={tape?.name} objectFit="cover" width="100%" height={'8rem'} />
          </Skeleton>
          <Box position="absolute" boxSize="full" inset="0" zIndex="1">
            <Flex
              gap={3}
              direction={{ base: 'column', lg: 'row' }}
              justifyContent={{ base: 'center', lg: 'space-between' }}
              alignItems={'center'}
              height="full"
              maxW={'7xl'}
              mx="auto"
            >
              <Heading
                className="animate__animated animate__fadeIn"
                fontWeight={'semibold'}
                letterSpacing={'tight'}
                size={{ base: 'xl', lg: '2xl' }}
                color={'white'}
                mb={2}
              >
                {tape?.name}
              </Heading>
              <Button
                as={ReactLink}
                to={tape?.route}
                shadow={'sm'}
                _hover={{ bg: 'gray.100', color: 'gray.700' }}
                rightIcon={<IconArrowRight height={'16'} width={'16'} />}
                bg="green.100"
                rounded="sm"
                size={{ base: 'sm', lg: 'md' }}
                border={'solid 1px'}
                borderColor={'green.200'}
                fontSize={'sm'}
                fontWeight="semibold"
              >
                View Tape
              </Button>
            </Flex>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Header;
