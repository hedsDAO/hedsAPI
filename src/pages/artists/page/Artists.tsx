import { Fragment, useEffect } from 'react';
import { store } from '@/store';
import { useSelector } from 'react-redux';
import { Divider } from '@chakra-ui/react';
import { AllArtists, SampleCurators, FeaturedArtist } from '@/pages/artists/components';

export const Artists = () => {
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      {allArtists && (
        <Fragment>
          <FeaturedArtist />
          <SampleCurators />
          <Divider maxW="6xl" mx="auto" borderColor="gray.300" mt={{ base: 2, lg: 7 }} mb={{ base: 4, lg: 7 }} />
          <AllArtists />
        </Fragment>
      )}
    </>
  );
};
