import React, { Fragment, useEffect } from 'react';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const TapeWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const { currentTape, allTapes } = useSelector((state: RootState) => state.tapesModel);
  useEffect(() => {
    dispatch.tapesModel.getAllTapes();
    if (space && tape && id) dispatch.tapesModel.setCurrentTape([space, tape, id]);
  }, []);
  useEffect(() => {
    dispatch.tapesModel.getCurrentTracks([allTapes, space, tape, id]);
  }, [space, tape, id]);

  return <Fragment>{children}</Fragment>;
};
