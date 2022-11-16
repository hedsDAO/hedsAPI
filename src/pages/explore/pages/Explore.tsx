import { Dispatch, RootState } from '@/store';
import { Box, Container, Divider } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Explore = ({ wallet }: { wallet?: string }) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.exploreModel.getExploreStats();
  }, []);
  const { stats } = useSelector((state: RootState) => state.exploreModel);
  return (
    <Fragment>
      {stats && (
        <Box display={{ base: 'none', lg: 'block' }} bgColor={'blackAlpha.900'} pt={{ base: '8', sm: '12' }}>
          <div className="bg-white">
            <div className="relative">
              <Box inset={0} h={'50%'} pos={'absolute'} bgColor={'blackAlpha.900'} />
              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                  <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                    <div className="flex flex-col border-b border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Value Generated</dt>
                      <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">
                        {/* {formatDollars(stats.earnings.primary.usd + stats.earnings.secondary.usd)} */}
                      </dd>
                    </div>
                    <div className="flex flex-col border-t border-b border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-l sm:border-r">
                      <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Total Submissions</dt>
                      <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">{stats.submissions.total}</dd>
                    </div>
                    <div className="flex flex-col border-t border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-l">
                      <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Tapes Minted</dt>
                      <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">{stats.tapes.total}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Box>
      )}
      {/* {latestTape && (
        <Container maxW="7xl">
          <div>
            <div className="mx-auto w-full px-4 lg:px-1">
              <Heading fontWeight={'bold'} letterSpacing={'tight'} size={['lg', 'xl']} color={'gray.800'} mt={{ base: 5, lg: 10 }} mb={3} p={1}>
                Live Tapes
              </Heading>
            </div>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-lg bg-white px-3 shadow pb-12 lg:px-6">
                <div className="font-semibold text-lg w-full py-4">{latestTape.name}</div>
                <dt>
                  <div className="absolute rounded-md">
                    <Avatar borderRadius={'md'} size="lg" className="aspect-square" src={latestTape.image} />
                  </div>
                </dt>
                <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
                  {timeline &&
                    Object.entries(timeline).map(([string, stepData]) => {
                      if (string === 'submit' && stepData.status === TimelineStatus.OPEN) return <Submit />;
                      if (string === 'vote' && stepData.status === TimelineStatus.OPEN) return <Vote />;
                      if (string === 'mint' && stepData.status === TimelineStatus.OPEN) return <Mint />;
                    })}
                  <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-blue-400 hover:text-blue-400">
                        View tape
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      )} */}
      <Container maxW={'7xl'}>
        <Divider mt={10} />
        {/* <TopArtists /> */}
      </Container>
    </Fragment>
  );
};
