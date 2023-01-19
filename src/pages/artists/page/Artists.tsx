import { Fragment, useEffect } from 'react';
import { store } from '@/store';
import { useSelector } from 'react-redux';
import { Divider } from '@chakra-ui/react';
import { AllArtists, SampleCurators } from '@/pages/artists/components';

export const Artists = () => {
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      {allArtists && (
        <Fragment>
          <SampleCurators />
          <Divider maxW="8xl" mx="auto" borderColor="gray.600" mt={{ base: 2, lg: 7 }} mb={{ base: 4, lg: 7 }} />
          <AllArtists />
        </Fragment>
      )}
    </>
  );
};
