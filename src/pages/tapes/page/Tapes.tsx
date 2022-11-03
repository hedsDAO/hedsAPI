import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Heading, Image, AspectRatio, Skeleton, Divider, Text, Flex, Avatar, Container } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Fragment } from 'react';
import { formatTime } from '@/utils';

export const Tapes = () => {
  const navigate = useNavigate();
  const { hedsTapes } = useSelector((state: RootState) => state.tapesModel);
  const { artistMapping } = useSelector((state: RootState) => state.artistModel);
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);

  const getTotalDuration = (addresses: string[], route: string): string => {
    const id: string = route.split('/hedstape/')[1];
    let total = 0;
    addresses.map((address: string) => {
      const duration = artistMapping[address].tracks.heds.hedstape[id].duration;
      total += duration;
    });
    return formatTime(total);
  };
  return (
    <div className="">
      <div className="mx-auto w-full px-5 lg:px-10">
        <Heading
          className="animate__animated animate__fadeInUp"
          fontWeight={'bold'}
          letterSpacing={'tight'}
          size={['xl', '2xl']}
          color={'gray.800'}
          mt={{ base: 5, lg: 10 }}
          mb={3}
          p={1}
        >
          Releases
        </Heading>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {hedsTapes && (
            <Fragment>
              {Object.values(hedsTapes)
                ?.reverse()
                ?.map((tape, index) => {
                  return (
                    <div
                      role="button"
                      onClick={() => navigate(tape.route, { replace: true })}
                      key={tape.contract + index}
                      className="group bg-gray-50 relative border border-gray-200 col-span-1 rounded-sm bs-preset-1"
                    >
                      <Skeleton fadeDuration={3} className="col-span-1" isLoaded={!loading}>
                        <AspectRatio className="m-2 lg:m-4" ratio={1}>
                          <Image
                            w="full"
                            src={tape.image}
                            alt={tape.name}
                            objectFit="cover"
                            rounded="sm"
                            className="group-hover:saturate-0 group-hover:rounded-sm ease-in-out transition-all duration-300"
                          />
                        </AspectRatio>
                      </Skeleton>
                      <Container textColor="white" className="font-bold relative bottom-8 lg:bottom-10 lg:left-1 -mb-5">
                        <Text fontSize={{ base: 'xs', lg: 'sm' }} px={1} w="fit-content" rounded="sm" bg={'black'}>
                          {getTotalDuration(tape.tracks, tape.route)}
                        </Text>
                      </Container>
                      <Divider />
                      <div className="flex flex-col justify-center p-2 lg:p-4 duration-500 group-hover:bg-gray-500/20">
                        <div className="flex flex-col justify-center gap-1">
                          <h3 className="text-sm sm:text-base lg:text-2xl text-gray-700 font-bold tracking-widest whitespace-nowrap w-full text-right">
                            {tape.name.split(' ')[0]}
                            <span className="text-red-500 font-light ml-2">{tape.name.split(' ')[1]}</span>
                            <span aria-hidden="true" className="absolute inset-0 truncate" />
                          </h3>
                          <Text fontWeight={'light'} fontSize={{ base: 'xs', lg: 'sm' }} textAlign={'right'} mb={{ base: 2, lg: 0 }}>
                            {DateTime.fromMillis(tape?.timeline?.mint?.end).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
                          </Text>
                          <Divider my={2} />
                          <Flex className="" gap={2} alignItems="center">
                            <Avatar src={artistMapping[tape?.curator].profilePicture} size="2xs" />
                            <Text textColor={'gray.800'} fontWeight={'semibold'} letterSpacing={'widest'} fontSize={{ base: '2xs', lg: 'xs' }}>
                              {artistMapping[tape?.curator].displayName}
                            </Text>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
