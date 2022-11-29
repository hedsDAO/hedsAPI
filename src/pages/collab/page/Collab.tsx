import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { Heading, Image, AspectRatio, Divider, Skeleton, Container, Text, Flex, Avatar } from '@chakra-ui/react';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useEffect } from 'react';

export const Collab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const collabTapes = useSelector(store.select.tapesModel.selectAllCollabTapes);
  const loading = useSelector((state: RootState) => state.loading.models.tapesModel);
  useEffect(() => {
    dispatch.tapesModel.getCollabTapes();
  }, []);
  return (
    <div className="">
      <Header />
      <div className="max-w-6xl mx-auto w-full lg:px-3 px-5 mt-5 lg:mt-10">
        <Heading fontWeight={'semibold'} size={{ base: 'lg', lg: 'xl' }} color={'blackAlpha.900'}>
          Collaborations
        </Heading>
        <Divider mt={3} mb={5} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {collabTapes &&
            Object.values(collabTapes)
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
                        {/* {tape?.tracks?.length ? getTotalDuration(tape.tracks, tape.route) : 'PENDING'} */}
                      </Text>
                    </Container>
                    <div className="flex flex-col justify-center p-2 lg:p-4">
                      <div className="flex flex-col justify-center gap-1">
                        <h3 className="text-sm sm:text-base lg:text-2xl text-gray-700 font-bold tracking-widest whitespace-nowrap w-full text-right">
                          {tape.name.split(' ')[0]}
                          <span className="text-red-500 font-light ml-2">{tape.name.split(' ')[1]}</span>
                          <span aria-hidden="true" className="absolute inset-0 truncate" />
                        </h3>
                        <Text fontWeight={'light'} fontSize={{ base: 'xs', lg: 'sm' }} textAlign={'right'} mb={{ base: 2, lg: 0 }}>
                          {DateTime.fromMillis(tape?.timeline?.mint?.end).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
                        </Text>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};
