import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Link as ReactLink } from 'react-router-dom';
import { Link, Box, Flex, Heading, Image, Stack, AspectRatio, Skeleton, Button, Divider } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';

export const Collab = () => {
  const { collabTapes } = useSelector((state: RootState) => state.tapesModel);
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);
  return (
    <div className="">
      {collabTapes &&
        Object.values(collabTapes)?.map((tape, index) => {
          return (
            <Box className="animate__animated animate__fadeIn" key={tape.etherscan + index} position="relative">
              <Skeleton isLoaded={!loading} height={{ base: 'sm', md: 'lg' }}>
                <Image className="" src={tape.image} alt={tape.name} objectFit="cover" width="100%" height={{ base: 'sm', md: 'lg' }} />
              </Skeleton>
              <Box position="absolute" boxSize="full" inset="0" zIndex="1">
                <Flex
                  direction="column-reverse"
                  height="full"
                  maxW={'3xl'}
                  mx="auto"
                  px={{ base: '4', md: '8', lg: '10' }}
                  py={{ base: '6', md: '8', lg: '10' }}
                >
                  <Box
                    className="bs-preset-1 bg-gray-100"
                    shadow={'lg'}
                    rounded="sm"
                    alignSelf={{ md: 'start' }}
                    p={{ base: '5', md: '8' }}
                    minW={{ md: 'sm' }}
                  >
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
          );
        })}
      <>
        <div className="max-w-5xl mx-auto w-full lg:px-3 px-5 mt-5 lg:mt-10">
          <Heading fontWeight={'bold'} letterSpacing={'tight'} size={{ base: 'lg', lg: 'xl' }} color={'blackAlpha.900'}>
            Collaborations
          </Heading>
          <Divider mt={3} mb={5} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {collabTapes &&
              Object.values(collabTapes)
                ?.reverse()
                ?.map((tape, index) => {
                  return (
                    <div key={tape.contract + index} className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-md shadow-sm">
                      <AspectRatio ratio={1}>
                        <Image w="full" src={tape.image} alt={tape.name} objectFit="cover" roundedTop={'md'} />
                      </AspectRatio>
                      <div className="flex flex-col justify-center">
                        <div className="flex flex-col justify-center">
                          <h3 className="text-sm text-gray-900 font-semibold tracking-widest p-4 w-full">
                            <Link href={tape.route}>
                              {tape.name}
                              <span aria-hidden="true" className="absolute inset-0 truncate" />
                            </Link>
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </>
    </div>
  );
};
