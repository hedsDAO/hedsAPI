import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from 'src/store';

export const Listen = () => {
  const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.tapesModel.setCurrentTape([space, tape, id]);
  }, []);
  
  return (
    <>
      <div className="bg-white my-10 pb-20"></div>
    </>
  );
};
