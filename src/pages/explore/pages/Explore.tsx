import { Dispatch, RootState, store } from '@/store';
import { Box, Container, Divider, Heading } from '@chakra-ui/react';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDollars } from '@/utils';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.exploreModel.getExploreStats();
  }, []);
  const { stats } = useSelector((state: RootState) => state.exploreModel);
  const latestTape = useSelector(store.select.tapesModel.selectLatestHedsTape);

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
                        {formatDollars(stats.earnings.primary.usd + stats.earnings.secondary.usd)}
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
      {latestTape && (
        <Container maxW="7xl">
          <div>
            <div className="mx-auto w-full px-4 lg:px-1">
              <Heading fontWeight={'bold'} letterSpacing={'tight'} size={['lg', 'xl']} color={'gray.800'} mt={{ base: 5, lg: 10 }} mb={3} p={1}>
                {latestTape.name}
              </Heading>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
};
