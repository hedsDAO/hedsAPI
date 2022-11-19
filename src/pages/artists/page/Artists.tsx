import { Fragment } from 'react';
import { store } from '@/store';
import { useSelector } from 'react-redux';
import { Divider } from '@chakra-ui/react';
import { AllArtists, SampleCurators } from '@/pages/artists/components';

export const Artists = () => {
  const allArtists = useSelector(store.select.artistModel.selectAllArtists);
  return (
    <>
      {allArtists && (
        <Fragment>
          <SampleCurators />
          <Divider my={3} />
          <AllArtists />
        </Fragment>
      )}
    </>
  );
};
