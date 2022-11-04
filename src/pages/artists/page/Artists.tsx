import { Fragment } from 'react';
import { RootState } from 'src/store';
import { useSelector } from 'react-redux';
import { Divider } from '@chakra-ui/react';
import { AllArtists, SampleCurators } from '@/pages/artists/components';

export const Artists = () => {
  const { allArtists } = useSelector((state: RootState) => state.artistModel);
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
