import { RootState, store } from '@/store';
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
      {tape ? (
        <Box className="animate__animated animate__fadeIn" key={tape.etherscan} position="relative">
          <Skeleton isLoaded={!loading} height={{ base: 'sm', md: 'lg' }}>
            <Image className="" src={tape.image} alt={tape.name} objectFit="cover" width="100%" height={{ base: 'sm', md: 'lg' }} />
          </Skeleton>
          <Box position="absolute" boxSize="full" inset="0" zIndex="1">
            <Flex direction="column-reverse" height="full" maxW={'3xl'} mx="auto" px={{ base: '4', md: '8', lg: '10' }} py={{ base: '6', md: '8', lg: '10' }}>
              <Box className="bs-preset-1 bg-gray-100" shadow={'lg'} rounded="sm" alignSelf={{ md: 'start' }} p={{ base: '5', md: '8' }} minW={{ md: 'sm' }}>
                <Stack spacing="5">
                  <Stack spacing="2">
                    <Heading
                      className="animate__animated animate__fadeIn"
                      fontWeight={'semibold'}
                      letterSpacing={'tight'}
                      size={{ base: 'lg', lg: '2xl' }}
                      color={'black'}
                      mb={2}
                    >
                      {tape.name}
                    </Heading>
                    <Heading fontWeight={'light'} fontSize={{ base: 'xs', lg: 'xs' }} color={'black'}>
                      {tape.description}
                    </Heading>
                  </Stack>
                  <Button
                    as={ReactLink}
                    to={tape.route}
                    shadow={'sm'}
                    _hover={{ bg: 'gray.100', color: 'gray.700' }}
                    rightIcon={<IconArrowRight height={'16'} width={'16'} />}
                    bg="green.100"
                    rounded="sm"
                    border={'solid 1px'}
                    borderColor={'green.200'}
                    fontSize={'sm'}
                    fontWeight="semibold"
                  >
                    View Tape
                  </Button>
                </Stack>
              </Box>
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
