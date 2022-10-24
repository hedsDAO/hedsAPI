import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Image, Stack, AspectRatio, Skeleton, Button } from '@chakra-ui/react';
import { IconArrowRight } from '@tabler/icons';

export const Tapes = () => {
  const navigate = useNavigate();
  const { hedsTapes } = useSelector((state: RootState) => state.tapesModel);
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);
  return (
    <div className="bg-[#f5f5f5]">
      <div className="">
        {hedsTapes &&
          Object.values(hedsTapes)?.map((tape, index) => {
            if (tape.timeline.status === 0)
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
                      px={{ base: '4', md: '8', lg: '12' }}
                      py={{ base: '6', md: '8', lg: '12' }}
                    >
                      <Box
                        className="bs-preset-1 bg-gray-100"
                        shadow={'lg'}
                        rounded="lg"
                        alignSelf={{ md: 'start' }}
                        p={{ base: '5', md: '8' }}
                        minW={{ md: 'sm' }}
                      >
                        <Stack spacing="5">
                          <Stack spacing="2">
                            <Heading fontWeight={'semibold'} size="lg" color={'black'} mb={2}>
                              {tape.name}
                            </Heading>
                            <Heading fontWeight={'light'} fontSize={{ base: 'xs', lg: 'sm' }} color={'black'}>
                              {tape.description}
                            </Heading>
                          </Stack>
                          <Button
                            as={ReactLink}
                            to={tape.route}
                            shadow={'sm'}
                            _hover={{ bg: 'gray.100', color: 'gray.700' }}
                            rightIcon={<IconArrowRight height={'16'} width={'16'} />}
                            bg="gray.200"
                            border={'solid 1px gray.300'}
                            fontSize={'xs'}
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
          <div className="max-w-5xl mx-auto w-full px-3">
            <Heading fontWeight={'semibold'} size="2xl" color={'black'} my={{ base: 5, lg: 10 }}>
              Releases
            </Heading>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {hedsTapes &&
                Object.values(hedsTapes)
                  .filter((tape) => tape.timeline.status === 5)
                  ?.reverse()
                  ?.map((tape, index) => {
                    return (
                      <div
                        role="button"
                        onClick={() => navigate(tape.route, { replace: true })}
                        key={tape.contract + index}
                        className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-md shadow-sm"
                      >
                        <AspectRatio ratio={1}>
                          <Image
                            w="full"
                            src={tape.image}
                            alt={tape.name}
                            objectFit="cover"
                            roundedTop={'md'}
                            className="group-hover:opacity-60 ease-in-out transition-all"
                          />
                        </AspectRatio>
                        <div className="flex flex-col justify-center">
                          <div className="flex flex-col justify-center">
                            <h3 className="text-sm text-gray-900 font-semibold tracking-widest p-4 w-full">
                              {tape.name}
                              <span aria-hidden="true" className="absolute inset-0 truncate" />
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
    </div>
  );
};
