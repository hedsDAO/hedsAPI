import { Fragment, useEffect } from 'react';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

const TapeWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.tapesModel.getAllTapes();
    dispatch.artistModel.getAllArtists();
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default TapeWrapper;
