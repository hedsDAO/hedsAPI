import React, { Fragment, useEffect } from 'react';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

export const TapeWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
    dispatch.tapesModel.getAllTapes();
  }, []);

  return <Fragment>{children}</Fragment>;
};
