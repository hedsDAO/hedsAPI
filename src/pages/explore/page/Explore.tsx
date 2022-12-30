import { Dispatch, store } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryListings } from '@/pages/explore/components';
import { Box, Container } from '@chakra-ui/react';
import MostFeaturedArtists from '../components/MostFeaturedArtists/MostFeaturedArtists';

export const Explore = () => {
  const dispatch = useDispatch<Dispatch>();
  const latestHedsTape = useSelector(store.select.tapesModel.selectLatestHedsTape);
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  //   console.log(latestHedsTape);
  useEffect(() => {
    if (allArtists?.length) dispatch.artistModel.getMostFeaturedArtists([allArtists, 5]);
    if (latestHedsTape) dispatch.exploreModel.getLatestSecondaryListings();
  }, [allArtists, latestHedsTape]);
  return (
    <Box minH="100vh">
      <Box display={{ base: 'none', lg: 'block' }} bgColor={'blackAlpha.900'} pt={{ base: '8', sm: '12' }}>
        <div className="bg-[#FAF9F6]">
          <div className="relative">
            <Box inset={0} h={'50%'} pos={'absolute'} bgColor={'blackAlpha.900'} />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl">
                <dl className="rounded-lg bg-white shadow-md sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Value Generated</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">${'132,324.20'}</dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Total Submissions</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">{400}</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 px-2 py-3 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-sm font-medium leading-6 text-gray-500">Tapes Minted</dt>
                    <dd className="order-1 text-2xl font-bold tracking-tight text-neutral-800">{300}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Container maxW="7xl" w="full" mx="auto">
        {/* <SecondaryListings /> */}
        <MostFeaturedArtists />
      </Container>
    </Box>
  );
};
