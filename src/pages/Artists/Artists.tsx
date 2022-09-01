import React, { useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';

export const Artists = () => {
  const dispatch = useDispatch<Dispatch>();
  const artistData = useSelector((state: RootState) => state.artistModel);
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
  }, []);

  return <></>;
};
